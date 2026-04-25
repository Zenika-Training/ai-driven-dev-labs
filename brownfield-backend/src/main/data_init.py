from datetime import datetime
from decimal import Decimal
from sqlalchemy.ext.asyncio import AsyncSession
from .vet.vet import Vet
from .pet.pet import Pet
from .visit.visit import Visit
from .invoice.invoice import Invoice


async def seed_data(session: AsyncSession) -> None:
    async with session.begin():
        vet1 = Vet(name="James Carter", specialty="General Practice")
        vet2 = Vet(name="Helen Leary", specialty="Radiology")
        session.add_all([vet1, vet2])
        await session.flush()

        pet1 = Pet(name="Leo", owner_name="George Franklin")
        pet2 = Pet(name="Basil", owner_name="Betty Davis")
        session.add_all([pet1, pet2])
        await session.flush()

        visit1 = Visit(
            date_time=datetime(2024, 1, 15, 10, 0),
            clinic="Main Clinic",
            summary="Annual checkup",
            pet_id=pet1.id,
            vet_id=vet1.id,
        )
        visit2 = Visit(
            date_time=datetime(2024, 2, 20, 14, 30),
            clinic="Main Clinic",
            summary="X-ray examination",
            pet_id=pet2.id,
            vet_id=vet2.id,
        )
        session.add_all([visit1, visit2])
        await session.flush()

        invoice1 = Invoice(
            invoice_number="INV-001",
            invoice_date=datetime(2024, 1, 15),
            amount=Decimal("75.00"),
            visit_id=visit1.id,
        )
        invoice2 = Invoice(
            invoice_number="INV-002",
            invoice_date=datetime(2024, 2, 20),
            amount=Decimal("120.00"),
            visit_id=visit2.id,
        )
        session.add_all([invoice1, invoice2])
