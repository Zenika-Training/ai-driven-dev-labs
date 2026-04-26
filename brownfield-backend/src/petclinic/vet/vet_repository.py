from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from .vet import Vet


class VetRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def find_all(self) -> list[Vet]:
        result = await self.session.execute(select(Vet))
        return list(result.scalars().all())

    async def find_by_id(self, vet_id: int) -> Vet | None:
        result = await self.session.execute(select(Vet).where(Vet.id == vet_id))
        return result.scalar_one_or_none()

    async def find_by_name(self, name: str) -> Vet | None:
        result = await self.session.execute(select(Vet).where(Vet.name == name))
        return result.scalar_one_or_none()

    async def save(self, vet: Vet) -> Vet:
        self.session.add(vet)
        await self.session.flush()
        await self.session.refresh(vet)
        return vet
