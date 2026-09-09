from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from petclinic.database import get_db
from petclinic.pet.repository import PetRepository
from petclinic.pet.schemas import PetRead
from petclinic.pet.service import PetService

router = APIRouter(prefix="/api/v1/pets", tags=["pets"])


def get_pet_service(db: Session = Depends(get_db)) -> PetService:
    return PetService(PetRepository(db))


@router.get("/{pet_id}", response_model=PetRead | None)
def find_by_id(pet_id: int, pet_service: PetService = Depends(get_pet_service)):
    return pet_service.find_by_id(pet_id)


@router.get("", response_model=list[PetRead])
def find_by_name(name: str, pet_service: PetService = Depends(get_pet_service)):
    return pet_service.find_by_name(name)
