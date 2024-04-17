from fastapi import APIRouter, Depends
from typing import List, Optional
from models.pets import PetIn, PetInUpdate, PetOut
from queries.pet_queries import PetQueries

router = APIRouter(tags=["Pets"], prefix="/api/pets")

@router.get("/api/pets", response_model=List(PetOut))
def get_all_pets(
    repo: PetQueries = Depends(),
) -> PetOut:
    return repo.get_all()
