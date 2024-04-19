from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from queries.service_queries import ServiceRepository
from utils.authentication import JWTUserData, try_get_jwt_user_data
from models.services import ServiceIn, ServiceInUpdate, ServiceOut

router = APIRouter()


@router.post("/services", response_model=ServiceOut)
def create_service(
    service: ServiceIn,
    repo: ServiceRepository = Depends(),
):
    return repo.create(service)


@router.get("/services", response_model=List[ServiceOut])
def get_all_services(
    repo: ServiceRepository = Depends()
):
    return repo.get_all()

@router.get("/services/{service_id}", response_model=ServiceOut)
def get_service_by_id(
    service_id: int,
    repo: ServiceRepository = Depends()
):
    return repo.get_one(service_id)

@router.put("/services/{service_id}", response_model=ServiceOut)
def update_service_by_id(
    service_id: int,
    service_update: ServiceInUpdate,
    repo: ServiceRepository = Depends()
):
    return repo.update(service_id, service_update)


@router.delete("/services/{service_id}")
def delete_service_by_id(
    service_id: int,
    repo: ServiceRepository = Depends()
):
    return repo.delete(service_id)