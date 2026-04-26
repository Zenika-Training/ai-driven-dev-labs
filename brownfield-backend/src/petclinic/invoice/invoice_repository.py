from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from .invoice import Invoice
from ..visit.visit import Visit


class InvoiceRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def find_all(self) -> list[Invoice]:
        result = await self.session.execute(
            select(Invoice).options(
                selectinload(Invoice.visit).options(
                    selectinload(Visit.pet),
                    selectinload(Visit.vet),
                )
            )
        )
        return list(result.scalars().all())

    async def find_by_id(self, invoice_id: int) -> Invoice | None:
        result = await self.session.execute(
            select(Invoice)
            .where(Invoice.id == invoice_id)
            .options(
                selectinload(Invoice.visit).options(
                    selectinload(Visit.pet),
                    selectinload(Visit.vet),
                )
            )
        )
        return result.scalar_one_or_none()

    async def save(self, invoice: Invoice) -> Invoice:
        self.session.add(invoice)
        await self.session.flush()
        await self.session.refresh(invoice, ["visit"])
        return invoice
