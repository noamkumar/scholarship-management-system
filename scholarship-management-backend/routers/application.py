from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime
import os

from dependencies import (
    get_current_user,
    get_db,
    get_current_admin
)

from models.application import Application
from models.scholarship import Scholarship

from fastapi.responses import FileResponse
from reportlab.pdfgen import canvas

from schemas.application import (
    ApplicationCreate,
    ApplicationStatusUpdate
)


router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


# ==========================================
# APPLY FOR SCHOLARSHIP
# ==========================================

@router.post("/")
def apply_scholarship(
    application: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    scholarship = db.query(Scholarship).filter(
        Scholarship.id == application.scholarship_id
    ).first()

    if not scholarship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship id not found"
        )

    # Current user is already the database User object
    user = current_user

    # Check whether user already applied
    existing_application = db.query(Application).filter(
        Application.user_id == user.id,
        Application.scholarship_id == application.scholarship_id
    ).first()

    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already applied for this scholarship"
        )

    new_application = Application(
        scholarship_id=application.scholarship_id,
        user_id=user.id,
        statement=application.statement,
        applied_at=datetime.utcnow()
    )

    db.add(new_application)

    db.commit()

    db.refresh(new_application)

    return {
        "message": "Application submitted successfully",
        "application_id": new_application.id
    }


# ==========================================
# GET CURRENT USER APPLICATIONS
# ==========================================

@router.get("/me")
def my_application(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    applications = db.query(Application).filter(
        Application.user_id == current_user.id
    ).all()

    return applications


# ==========================================
# GET ALL APPLICATIONS - ADMIN
# ==========================================

@router.get("/")
def get_all_applications(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    applications = db.query(Application).all()

    return applications


# ==========================================
# UPDATE APPLICATION STATUS - ADMIN
# ==========================================

@router.put("/{application_id}/status")
def update_application_status(
    application_id: int,
    data: ApplicationStatusUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )

    application.status = data.status

    db.commit()

    db.refresh(application)

    return {
        "message": "Application status updated",
        "status": application.status
    }


# ==========================================
# DOWNLOAD APPLICATION PDF
# ==========================================

@router.get("/pdf/{application_id}")
def download_application_pdf(
    application_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )

    # Normal users can download only their own application
    if (
        current_user.role != "admin"
        and application.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only download your own application"
        )

    # Create uploads folder if it does not exist
    upload_folder = "uploads"

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    file_name = (
        f"application_{application_id}.pdf"
    )

    file_path = os.path.join(
        upload_folder,
        file_name
    )

    # Create PDF
    c = canvas.Canvas(file_path)

    c.setFont(
        "Helvetica-Bold",
        16
    )

    c.drawString(
        100,
        800,
        "Scholarship Application Report"
    )

    c.setFont(
        "Helvetica",
        12
    )

    c.drawString(
        100,
        760,
        f"Application ID: {application.id}"
    )

    c.drawString(
        100,
        730,
        f"Scholarship ID: {application.scholarship_id}"
    )

    c.drawString(
        100,
        700,
        f"User ID: {application.user_id}"
    )

    c.drawString(
        100,
        670,
        f"Status: {application.status}"
    )

    # Statement may be long, so put it on a separate line
    c.drawString(
        100,
        630,
        "Statement:"
    )

    statement = application.statement or ""

    # Split long statement into lines
    max_length = 80

    lines = [
        statement[i:i + max_length]
        for i in range(
            0,
            len(statement),
            max_length
        )
    ]

    y_position = 600

    for line in lines:

        c.drawString(
            100,
            y_position,
            line
        )

        y_position -= 20

        # Start a new page if necessary
        if y_position < 50:

            c.showPage()

            c.setFont(
                "Helvetica",
                12
            )

            y_position = 800

    c.save()

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=file_name
    )