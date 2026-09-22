from pydantic import BaseModel


# ==========================================
# USER CREATE
# ==========================================

class UserCreate(BaseModel):
    username: str
    password: str


# ==========================================
# USER LOGIN
# ==========================================

class UserLogin(BaseModel):
    username: str
    password: str


# ==========================================
# USER RESPONSE
# ==========================================

class UserResponse(BaseModel):
    username: str
    id: int
    role: str
    profile_image: str | None = None

    class Config:
        from_attributes = True


# ==========================================
# PROMOTE / DEMOTE USER
# ==========================================

class PromoteUser(BaseModel):
    username: str