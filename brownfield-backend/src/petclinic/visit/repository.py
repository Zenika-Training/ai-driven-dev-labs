from sqlalchemy import Select, select
from sqlalchemy.orm import Session, joinedload

from petclinic.visit.models import Visit


class VisitRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_all(self) -> list[Visit]:
        return list(self.db.scalars(self._base_query().order_by(Visit.id)))

    def find_by_id(self, visit_id: int) -> Visit | None:
        return self.db.scalars(self._base_query().where(Visit.id == visit_id)).one_or_none()

    def find_by_pet_id(self, pet_id: int) -> list[Visit]:
        return list(self.db.scalars(self._base_query().where(Visit.pet_id == pet_id)))

    def _base_query(self) -> Select:
        return select(Visit).options(joinedload(Visit.pet), joinedload(Visit.vet))
