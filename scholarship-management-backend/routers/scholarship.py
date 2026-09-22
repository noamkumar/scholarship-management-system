from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from dependencies import get_db, get_current_admin
from models.scholarship import Scholarship
from schemas.scholarship import (
    ScholarshipCreate,
    ScholarshipResponse
)


router = APIRouter(
    prefix="/scholarship",
    tags=["Scholarship"]
)


# GET ALL SCHOLARSHIPS
@router.get(
    "/",
    response_model=list[ScholarshipResponse]
)
def get_scholarships(
    db: Session = Depends(get_db)
):
    scholarships = db.query(
        Scholarship
    ).all()

    return scholarships


# GET SINGLE SCHOLARSHIP
@router.get(
    "/{scholarship_id}",
    response_model=ScholarshipResponse
)
def get_scholarship(
    scholarship_id: int,
    db: Session = Depends(get_db)
):

    scholarship = db.query(
        Scholarship
    ).filter(
        Scholarship.id == scholarship_id
    ).first()

    if not scholarship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship not found"
        )

    return scholarship


# CREATE SCHOLARSHIP - ADMIN
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED
)
def create_scholarship(
    scholarship: ScholarshipCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    new_scholarship = Scholarship(
        name=scholarship.name,
        description=scholarship.description,
        amount=scholarship.amount,
        deadline=scholarship.deadline,
        eligibility=scholarship.eligibility
    )

    db.add(new_scholarship)
    db.commit()
    db.refresh(new_scholarship)

    return {
        "message": "Scholarship created successfully",
        "scholarship_id": new_scholarship.id
    }


# UPDATE SCHOLARSHIP - ADMIN
@router.put(
    "/{scholarship_id}"
)
def update_scholarship(
    scholarship_id: int,
    scholarship: ScholarshipCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    existing_scholarship = db.query(
        Scholarship
    ).filter(
        Scholarship.id == scholarship_id
    ).first()

    if not existing_scholarship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship not found"
        )

    existing_scholarship.name = scholarship.name
    existing_scholarship.description = scholarship.description
    existing_scholarship.amount = scholarship.amount
    existing_scholarship.deadline = scholarship.deadline
    existing_scholarship.eligibility = scholarship.eligibility

    db.commit()
    db.refresh(existing_scholarship)

    return {
        "message": "Scholarship updated successfully"
    }


# DELETE SCHOLARSHIP - ADMIN
@router.delete(
    "/{scholarship_id}"
)
def delete_scholarship(
    scholarship_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    existing_scholarship = db.query(
        Scholarship
    ).filter(
        Scholarship.id == scholarship_id
    ).first()

    if not existing_scholarship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scholarship not found"
        )

    db.delete(existing_scholarship)
    db.commit()

    return {
        "message": "Scholarship deleted successfully"
    }