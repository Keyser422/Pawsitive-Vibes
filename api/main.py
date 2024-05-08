"""
Entry point for the FastAPI Application
"""
from fastapi import FastAPI, Form, UploadFile, HTTPException
import httpx
from typing import Optional
from fastapi.responses import FileResponse
from keys import CALENDLY_API_KEY
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
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


UPLOAD_DIR = Path('static/profile_images')


@app.post('/upload/')
async def upload_file(file_upload: UploadFile, filename: str = Form(...)):
    data = await file_upload.read()
    save_to = UPLOAD_DIR / filename
    # delete old pic if it exists
    if save_to.is_file():
        os.remove(save_to)
    # add new profile pic with format user_id.png
    with open(save_to, 'wb') as f:
        f.write(data)

    return {'filename': filename}


@app.get('/profile_image/{id}')
async def get_profile_image(id: int):
    image_path = UPLOAD_DIR / f"{id}.png"
    if not image_path.is_file():
        return {"error": "Profile image not found"}

    return FileResponse(str(image_path), media_type='image/png')

@app.get('/service_image/{id}')
async def get_service_image(id: int):
    image_path = UPLOAD_DIR / f"{id}.png"
    if not image_path.is_file():
        return {"error": "Service image not found"}

    return FileResponse(str(image_path), media_type='image/png')


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
