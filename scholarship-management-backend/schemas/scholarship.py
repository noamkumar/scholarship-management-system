from pydantic import BaseModel


class ScholarshipCreate(BaseModel):

    name: str

    description: str

    amount: float

    deadline: str

    eligibility: str


class ScholarshipResponse(BaseModel):

    id: int

    name: str

    description: str

    amount: float

    deadline: str

    eligibility: str

    class Config:

        from_attributes = True