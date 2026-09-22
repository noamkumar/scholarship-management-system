from sqlalchemy import Column, String, Integer, Float, Text
from sqlalchemy.orm import relationship

from database import Base


class Scholarship(Base):

    __tablename__ = "scholarships"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
        nullable=False
    )

    name = Column(
        String(150),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    amount = Column(
        Float,
        nullable=False
    )

    deadline = Column(
        String(20),
        nullable=False
    )

    eligibility = Column(
        Text,
        nullable=False
    )

    applications = relationship(
        "Application",
        back_populates="scholarship"
    )