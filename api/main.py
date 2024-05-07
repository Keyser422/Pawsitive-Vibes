"""
Entry point for the FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from keys import CALENDLY_API_KEY
from routers import (
    auth_router,
    pets_router,
    users_router,
    services_router,
    testimonials_router,
    appointment_router,
    meetups_router,
)
import os

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router.router)
app.include_router(users_router.router)
app.include_router(pets_router.router)
app.include_router(services_router.router)
app.include_router(appointment_router.router)
app.include_router(testimonials_router.router)
app.include_router(meetups_router.router)



@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }


