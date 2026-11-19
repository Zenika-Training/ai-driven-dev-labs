from datetime import datetime
from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from petclinic.database import Base
from petclinic.visit.models import Visit


class Invoice(Base):
    __tablename__ = "invoice"

    id: Mapped[int] = mapped_column(primary_key=True)
    invoice_number: Mapped[str]
    invoice_date: Mapped[datetime]
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    visit_id: Mapped[int] = mapped_column(ForeignKey("visit.id"))

    visit: Mapped[Visit] = relationship()
