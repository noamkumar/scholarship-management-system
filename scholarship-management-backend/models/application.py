from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship

from database import Base


class Application(Base):

    __tablename__ = "applications"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    scholarship_id = Column(
        Integer,
        ForeignKey("scholarships.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    statement = Column(
        Text,
        nullable=False
    )

    applied_at = Column(
        DateTime,
        nullable=False
    )

    status = Column(
        String(20),
        default="Under Review"
    )

    user = relationship(
        "User",
        back_populates="applications"
    )

    scholarship = relationship(
        "Scholarship",
        back_populates="applications"
    )