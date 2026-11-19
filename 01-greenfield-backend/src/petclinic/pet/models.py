from sqlalchemy.orm import Mapped, mapped_column

from petclinic.database import Base


class Pet(Base):
    __tablename__ = "pet"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    owner_name: Mapped[str]
