from pydantic import BaseModel


class ApplicationCreate(BaseModel):

    scholarship_id: int

    statement: str


class ApplicationResponse(BaseModel):

    id: int

    scholarship_id: int

    user_id: int

    statement: str

    status: str

    class Config:

        from_attributes = True


class ApplicationStatusUpdate(BaseModel):

    status: str