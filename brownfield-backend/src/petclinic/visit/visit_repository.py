from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from .visit import Visit


class VisitRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def find_all(self) -> list[Visit]:
        result = await self.session.execute(
            select(Visit).options(selectinload(Visit.pet), selectinload(Visit.vet))
        )
        return list(result.scalars().all())

    async def find_by_id(self, visit_id: int) -> Visit | None:
        result = await self.session.execute(
            select(Visit)
            .where(Visit.id == visit_id)
            .options(selectinload(Visit.pet), selectinload(Visit.vet))
        )
        return result.scalar_one_or_none()

    async def find_by_pet_id(self, pet_id: int) -> list[Visit]:
        result = await self.session.execute(
            select(Visit)
            .where(Visit.pet_id == pet_id)
            .options(selectinload(Visit.pet), selectinload(Visit.vet))
        )
        return list(result.scalars().all())

    async def save(self, visit: Visit) -> Visit:
        self.session.add(visit)
        await self.session.flush()
        await self.session.refresh(visit, ["pet", "vet"])
        return visit
