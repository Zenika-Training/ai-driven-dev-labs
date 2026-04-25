from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_session
from .vet_schema import VetResponse
from .vet_service import VetService

router = APIRouter(prefix="/api/v1/vet", tags=["vet"])


@router.get("", response_model=list[VetResponse])
async def find_all(session: AsyncSession = Depends(get_session)):
    return await VetService(session).find_all()


@router.get("/{vet_id}", response_model=VetResponse)
async def find_by_id(vet_id: int, session: AsyncSession = Depends(get_session)):
    vet = await VetService(session).find_by_id(vet_id)
    if not vet:
        raise HTTPException(status_code=404, detail="Vet not found")
    return vet


@router.get("/name/{name}", response_model=VetResponse)
async def find_by_name(name: str, session: AsyncSession = Depends(get_session)):
    vet = await VetService(session).find_by_name(name)
    if not vet:
        raise HTTPException(status_code=404, detail="Vet not found")
    return vet
