from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from petclinic.database import Base
from petclinic.pet.models import Pet
from petclinic.vet.models import Vet


class Visit(Base):
    __tablename__ = "visit"

    id: Mapped[int] = mapped_column(primary_key=True)
    date_time: Mapped[datetime]
    clinic: Mapped[str]
    summary: Mapped[str]
    pet_id: Mapped[int] = mapped_column(ForeignKey("pet.id"))
    vet_id: Mapped[int | None] = mapped_column(ForeignKey("vet.id"))

    pet: Mapped[Pet] = relationship()
    vet: Mapped[Vet | None] = relationship()
