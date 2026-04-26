from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database import Base


class Visit(Base):
    __tablename__ = "visits"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date_time: Mapped[datetime] = mapped_column(DateTime)
    clinic: Mapped[str] = mapped_column(String(255))
    summary: Mapped[str] = mapped_column(String)
    pet_id: Mapped[int] = mapped_column(ForeignKey("pets.id"))
    vet_id: Mapped[int] = mapped_column(ForeignKey("vets.id"))

    pet: Mapped["Pet"] = relationship("Pet")
    vet: Mapped["Vet"] = relationship("Vet")
