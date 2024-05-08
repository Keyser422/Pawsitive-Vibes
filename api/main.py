"""
Entry point for the FastAPI Application
"""
from fastapi import FastAPI, HTTPException
from typing import Optional
import httpx
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


CALDENDLY_API_BASE_URL = "https://api.calendly.com"

@app.get("/events")
async def get_events(user_uri: Optional[str] = None):
    try:
        headers = {
            "Authorization": f"Bearer {CALENDLY_API_KEY}",
            "Content-Type": "application/json"
        }

        params = {}
        if user_uri:
            params["user"] = user_uri

        async with httpx.AsyncClient() as client:
            response = await client.get(f"{CALDENDLY_API_BASE_URL}/scheduled_events", headers=headers, params=params)
            response.raise_for_status()
            events = response.json()
            return events
    except httpx.HTTPError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Failed to retrieve events from Calendly")
    
@app.get("/user-uri")
async def get_user_uri():
    try:
        headers = {
            "Authorization": f"Bearer {CALENDLY_API_KEY}"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{CALDENDLY_API_BASE_URL}/users/me", headers=headers)
            response.raise_for_status()
            user_data = response.json()
            user_uri = user_data["uri"]
            return {"user_uri": user_uri}
    except httpx.HTTPError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Failed to retrieve user URI from Calendly")
