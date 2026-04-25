from sqlalchemy.ext.asyncio import AsyncSession
from .pet import Pet
from .pet_repository import PetRepository
from .pet_schema import PetRequest, PetResponse


class PetService:
    def __init__(self, session: AsyncSession):
        self.repository = PetRepository(session)
        self.session = session

    async def find_all(self) -> list[PetResponse]:
        pets = await self.repository.find_all()
        return [PetResponse.model_validate(p) for p in pets]

    async def find_by_id(self, pet_id: int) -> PetResponse | None:
        pet = await self.repository.find_by_id(pet_id)
        return PetResponse.model_validate(pet) if pet else None

    async def find_by_name(self, name: str) -> PetResponse | None:
        pet = await self.repository.find_by_name(name)
        return PetResponse.model_validate(pet) if pet else None

    async def save(self, data: PetRequest) -> PetResponse:
        async with self.session.begin():
            existing = await self.repository.find_by_name_and_owner_name(data.name, data.owner_name)
            if existing:
                raise ValueError(f"Owner '{data.owner_name}' already has a pet named '{data.name}'")
            pet = Pet(name=data.name, owner_name=data.owner_name)
            saved = await self.repository.save(pet)
            return PetResponse.model_validate(saved)

    async def delete(self, pet_id: int) -> None:
        async with self.session.begin():
            await self.repository.delete(pet_id)
