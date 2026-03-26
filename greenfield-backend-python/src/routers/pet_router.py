from fastapi import APIRouter, HTTPException

from src.schemas.pet_response import PetCreate, PetResponse
from src.services import pet_service
from src.services.pet_service import DuplicatePetError, PetNotFoundError

router = APIRouter(prefix="/api/v1/pet", tags=["pet"])


@router.get("", response_model=list[PetResponse])
async def get_all_pets():
    return await pet_service.get_all_pets()


@router.get("/{name}", response_model=PetResponse)
async def get_pet_by_name(name: str):
    try:
        return await pet_service.get_pet_by_name(name)
    except PetNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("", response_model=PetResponse, status_code=201)
async def save_pet(pet_create: PetCreate):
    try:
        return await pet_service.save_pet(pet_create)
    except DuplicatePetError as e:
        raise HTTPException(status_code=409, detail=str(e))
