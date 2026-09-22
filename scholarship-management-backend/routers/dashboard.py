from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import get_db

from models.user import User
from models.scholarship import Scholarship
from models.application import Application

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db)
):

    total_users = db.query(
        User
    ).count()

    total_scholarships = db.query(
        Scholarship
    ).count()

    total_applications = db.query(
        Application
    ).count()

    approved = db.query(
        Application
    ).filter(
        Application.status == "Approved"
    ).count()

    rejected = db.query(
        Application
    ).filter(
        Application.status == "Rejected"
    ).count()

    pending = db.query(
        Application
    ).filter(
        Application.status == "Under Review"
    ).count()

    return {
        "users": total_users,
        "scholarships": total_scholarships,
        "applications": total_applications,
        "approved": approved,
        "rejected": rejected,
        "pending": pending
    }