from sqlalchemy.ext.asyncio import AsyncSession
from .visit_repository import VisitRepository
from .visit_schema import VisitResponse


class VisitService:
    def __init__(self, session: AsyncSession):
        self.repository = VisitRepository(session)

    async def find_all(self) -> list[VisitResponse]:
        visits = await self.repository.find_all()
        return [VisitResponse.model_validate(v) for v in visits]

    async def find_by_id(self, visit_id: int) -> VisitResponse | None:
        visit = await self.repository.find_by_id(visit_id)
        return VisitResponse.model_validate(visit) if visit else None

    async def find_by_pet_id(self, pet_id: int) -> list[VisitResponse]:
        visits = await self.repository.find_by_pet_id(pet_id)
        return [VisitResponse.model_validate(v) for v in visits]
