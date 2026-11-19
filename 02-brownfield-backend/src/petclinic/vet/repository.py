from sqlalchemy import select
from sqlalchemy.orm import Session

from petclinic.vet.models import Vet


class VetRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_all(self) -> list[Vet]:
        return list(self.db.scalars(select(Vet).order_by(Vet.id)))

    def find_by_id(self, vet_id: int) -> Vet | None:
        return self.db.get(Vet, vet_id)

    def find_by_name(self, name: str) -> Vet | None:
        return self.db.scalars(select(Vet).where(Vet.name == name)).one_or_none()
