from sqlalchemy.orm import Mapped, mapped_column

from petclinic.database import Base


class Vet(Base):
    __tablename__ = "vet"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    specialty: Mapped[str]
