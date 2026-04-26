from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base


class Pet(Base):
    __tablename__ = "pets"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255))
    owner_name: Mapped[str] = mapped_column(String(255))
