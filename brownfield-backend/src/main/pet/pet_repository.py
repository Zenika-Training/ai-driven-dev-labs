from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from .pet import Pet


class PetRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def find_all(self) -> list[Pet]:
        result = await self.session.execute(select(Pet))
        return list(result.scalars().all())

    async def find_by_id(self, pet_id: int) -> Pet | None:
        result = await self.session.execute(select(Pet).where(Pet.id == pet_id))
        return result.scalar_one_or_none()

    async def find_by_name(self, name: str) -> Pet | None:
        result = await self.session.execute(select(Pet).where(Pet.name == name))
        return result.scalar_one_or_none()

    async def find_by_name_and_owner_name(self, name: str, owner_name: str) -> Pet | None:
        result = await self.session.execute(
            select(Pet).where(Pet.name == name, Pet.owner_name == owner_name)
        )
        return result.scalar_one_or_none()

    async def save(self, pet: Pet) -> Pet:
        self.session.add(pet)
        await self.session.flush()
        await self.session.refresh(pet)
        return pet

    async def delete(self, pet_id: int) -> None:
        pet = await self.find_by_id(pet_id)
        if pet:
            await self.session.delete(pet)
            await self.session.flush()
