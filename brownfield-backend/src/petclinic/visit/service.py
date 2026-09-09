from petclinic.visit.models import Visit
from petclinic.visit.repository import VisitRepository


class VisitService:
    def __init__(self, visit_repository: VisitRepository):
        self.visit_repository = visit_repository

    def find_all(self) -> list[Visit]:
        return self.visit_repository.find_all()

    def find_by_id(self, visit_id: int) -> Visit | None:
        return self.visit_repository.find_by_id(visit_id)

    def find_by_pet_id(self, pet_id: int) -> list[Visit]:
        return self.visit_repository.find_by_pet_id(pet_id)
