from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base


class Vet(Base):
    __tablename__ = "vets"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
    specialty: Mapped[str] = mapped_column(String(255))
