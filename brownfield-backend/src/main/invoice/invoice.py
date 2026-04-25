from datetime import datetime
from decimal import Decimal
from sqlalchemy import String, ForeignKey, DateTime, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    invoice_number: Mapped[str] = mapped_column(String(255))
    invoice_date: Mapped[datetime] = mapped_column(DateTime)
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    visit_id: Mapped[int] = mapped_column(ForeignKey("visits.id"))

    visit: Mapped["Visit"] = relationship("Visit")
