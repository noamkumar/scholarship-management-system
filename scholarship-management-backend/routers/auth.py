from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    UploadFile,
    File
)

from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from dependencies import (
    get_db,
    get_current_user,
    get_current_admin
)

from models.user import User

from schemas.user import (
    UserCreate,
    UserResponse,
    PromoteUser
)

from utils.hashing import (
    hashed,
    verifypassword
)

from utils.jwt import generate_token

import os
import shutil


# ==========================================
# ROUTER
# ==========================================

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================================
# REGISTER
# ==========================================

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )

    role = "user"

    # Make noamkumar admin
    if user.username == "noamkumar":
        role = "admin"

    new_user = User(
        username=user.username,
        hashed_password=hashed(user.password),
        role=role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


# ==========================================
# LOGIN
# ==========================================

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.username == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    valid_password = verifypassword(
        form_data.password,
        db_user.hashed_password
    )

    if not valid_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    access_token = generate_token(
        {
            "username": db_user.username
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": db_user.role
    }


# ==========================================
# CURRENT USER / PROFILE
# ==========================================

@router.get(
    "/me",
    response_model=UserResponse
)
def me(
    current_user=Depends(get_current_user)
):

    return current_user


# ==========================================
# PROMOTE USER TO ADMIN
# ==========================================

@router.put("/promote")
def promote_user(
    data: PromoteUser,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    user = db.query(User).filter(
        User.username == data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user.role = "admin"

    db.commit()
    db.refresh(user)

    return {
        "message": f"{user.username} promoted to admin"
    }


# ==========================================
# GET ALL USERS - ADMIN
# ==========================================

@router.get("/users")
def get_users(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    users = db.query(User).all()

    return users


# ==========================================
# DEMOTE ADMIN TO USER
# ==========================================

@router.put("/demote")
def demote_user(
    data: PromoteUser,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    # Prevent the main admin from being demoted
    if data.username == "noamkumar":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Main admin cannot be demoted"
        )

    user = db.query(User).filter(
        User.username == data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user.role = "user"

    db.commit()
    db.refresh(user)

    return {
        "message": f"{user.username} demoted to user"
    }


# ==========================================
# UPLOAD PROFILE PICTURE
# ==========================================

@router.post("/upload-profile")
def upload_profile(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file selected"
        )

    # Create uploads folder if it doesn't exist
    os.makedirs(
        "uploads",
        exist_ok=True
    )

    filename = file.filename

    filepath = os.path.join(
        "uploads",
        filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    current_user.profile_image = filename

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile uploaded successfully",
        "filename": filename
    }