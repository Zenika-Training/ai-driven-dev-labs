from sqlalchemy.ext.asyncio import AsyncSession
from .vet_repository import VetRepository
from .vet_schema import VetResponse


class VetService:
    def __init__(self, session: AsyncSession):
        self.repository = VetRepository(session)

    async def find_all(self) -> list[VetResponse]:
        vets = await self.repository.find_all()
        return [VetResponse.model_validate(v) for v in vets]

    async def find_by_id(self, vet_id: int) -> VetResponse | None:
        vet = await self.repository.find_by_id(vet_id)
        return VetResponse.model_validate(vet) if vet else None

    async def find_by_name(self, name: str) -> VetResponse | None:
        vet = await self.repository.find_by_name(name)
        return VetResponse.model_validate(vet) if vet else None
