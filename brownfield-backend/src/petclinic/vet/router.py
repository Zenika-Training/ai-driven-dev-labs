from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from petclinic.database import get_db
from petclinic.responses import entity_response
from petclinic.vet.repository import VetRepository
from petclinic.vet.schemas import VetRead
from petclinic.vet.service import VetService

router = APIRouter(prefix="/api/v1/vet", tags=["vet"])


def get_vet_service(db: Session = Depends(get_db)) -> VetService:
    return VetService(VetRepository(db))


@router.get("", response_model=list[VetRead])
def find_all(vet_service: VetService = Depends(get_vet_service)):
    return vet_service.find_all()


@router.get("/{vet_id}")
def find_by_id(vet_id: int, vet_service: VetService = Depends(get_vet_service)) -> Response:
    return entity_response(vet_service.find_by_id(vet_id), VetRead)


@router.get("/name/{name}")
def find_by_name(name: str, vet_service: VetService = Depends(get_vet_service)) -> Response:
    return entity_response(vet_service.find_by_name(name), VetRead)
