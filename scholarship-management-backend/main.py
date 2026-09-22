from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import Base, engine

from models.user import User
from models.scholarship import Scholarship
from models.application import Application

from routers.auth import router as auth_router
from routers.application import router as application_router
from routers.scholarship import router as scholarship_router
from routers.dashboard import router as dashboard_router

import os


# ==========================================
# CREATE UPLOADS FOLDER
# ==========================================

if not os.path.exists("uploads"):
    os.makedirs("uploads")


# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI(
    title="Scholarship Management System API",
    description="Backend API for Scholarship Management System",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ==========================================
# CREATE DATABASE TABLES
# ==========================================

Base.metadata.create_all(
    bind=engine
)


# ==========================================
# INCLUDE ROUTERS
# ==========================================

app.include_router(auth_router)
app.include_router(application_router)
app.include_router(scholarship_router)
app.include_router(dashboard_router)


# ==========================================
# SERVE UPLOADED FILES
# ==========================================

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# ==========================================
# HOME / ROOT ENDPOINT
# ==========================================

@app.get("/")
def home():
    return {
        "message": "Scholarship API running"
    }