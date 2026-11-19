from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from petclinic.database import get_db
from petclinic.pet.models import Pet
from petclinic.pet.repository import PetRepository
from petclinic.pet.schemas import PetCreate, PetRead
from petclinic.pet.service import PetService
from petclinic.responses import entity_response

router = APIRouter(prefix="/api/v1/pet", tags=["pet"])


def get_pet_service(db: Session = Depends(get_db)) -> PetService:
    return PetService(PetRepository(db))


@router.get("", response_model=list[PetRead])
def find_all(pet_service: PetService = Depends(get_pet_service)):
    return pet_service.find_all()


@router.get("/{pet_id}")
def find_by_id(pet_id: int, pet_service: PetService = Depends(get_pet_service)) -> Response:
    return entity_response(pet_service.find_by_id(pet_id), PetRead)


@router.get("/name/{name}")
def find_by_name(name: str, pet_service: PetService = Depends(get_pet_service)) -> Response:
    return entity_response(pet_service.find_by_name(name), PetRead)


@router.post("", response_model=PetRead)
def save(pet: PetCreate, pet_service: PetService = Depends(get_pet_service)):
    return pet_service.save(Pet(id=pet.id, name=pet.name, owner_name=pet.owner_name))


@router.delete("/{pet_id}")
def delete(pet_id: int, pet_service: PetService = Depends(get_pet_service)) -> Response:
    pet_service.delete(pet_id)
    return Response(status_code=200)
