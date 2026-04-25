from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_session
from .pet_schema import PetRequest, PetResponse
from .pet_service import PetService

router = APIRouter(prefix="/api/v1/pet", tags=["pet"])


@router.get("", response_model=list[PetResponse])
async def find_all(session: AsyncSession = Depends(get_session)):
    return await PetService(session).find_all()


@router.get("/{pet_id}", response_model=PetResponse)
async def find_by_id(pet_id: int, session: AsyncSession = Depends(get_session)):
    pet = await PetService(session).find_by_id(pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet


@router.get("/name/{name}", response_model=PetResponse)
async def find_by_name(name: str, session: AsyncSession = Depends(get_session)):
    pet = await PetService(session).find_by_name(name)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet


@router.post("", response_model=PetResponse, status_code=201)
async def save(data: PetRequest, session: AsyncSession = Depends(get_session)):
    try:
        return await PetService(session).save(data)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))


@router.delete("/{pet_id}", status_code=204)
async def delete(pet_id: int, session: AsyncSession = Depends(get_session)):
    await PetService(session).delete(pet_id)
