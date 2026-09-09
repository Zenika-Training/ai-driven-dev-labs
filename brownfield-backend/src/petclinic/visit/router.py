from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from petclinic.database import get_db
from petclinic.responses import entity_response
from petclinic.visit.repository import VisitRepository
from petclinic.visit.schemas import VisitRead
from petclinic.visit.service import VisitService

router = APIRouter(prefix="/api/v1/visit", tags=["visit"])


def get_visit_service(db: Session = Depends(get_db)) -> VisitService:
    return VisitService(VisitRepository(db))


@router.get("", response_model=list[VisitRead])
def find_all(visit_service: VisitService = Depends(get_visit_service)):
    return visit_service.find_all()


@router.get("/{visit_id}")
def find_by_id(visit_id: int, visit_service: VisitService = Depends(get_visit_service)) -> Response:
    return entity_response(visit_service.find_by_id(visit_id), VisitRead)


@router.get("/pet/{pet_id}", response_model=list[VisitRead])
def find_by_pet_id(pet_id: int, visit_service: VisitService = Depends(get_visit_service)):
    return visit_service.find_by_pet_id(pet_id)
