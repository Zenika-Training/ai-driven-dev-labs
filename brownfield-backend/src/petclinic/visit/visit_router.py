from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_session
from .visit_schema import VisitResponse
from .visit_service import VisitService

router = APIRouter(prefix="/api/v1/visit", tags=["visit"])


@router.get("", response_model=list[VisitResponse])
async def find_all(session: AsyncSession = Depends(get_session)):
    return await VisitService(session).find_all()


@router.get("/{visit_id}", response_model=VisitResponse)
async def find_by_id(visit_id: int, session: AsyncSession = Depends(get_session)):
    visit = await VisitService(session).find_by_id(visit_id)
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    return visit


@router.get("/pet/{pet_id}", response_model=list[VisitResponse])
async def find_by_pet_id(pet_id: int, session: AsyncSession = Depends(get_session)):
    return await VisitService(session).find_by_pet_id(pet_id)
