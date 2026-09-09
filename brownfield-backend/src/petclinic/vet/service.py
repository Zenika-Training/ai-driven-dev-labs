from petclinic.vet.models import Vet
from petclinic.vet.repository import VetRepository


class VetService:
    def __init__(self, vet_repository: VetRepository):
        self.vet_repository = vet_repository

    def find_all(self) -> list[Vet]:
        return self.vet_repository.find_all()

    def find_by_id(self, vet_id: int) -> Vet | None:
        return self.vet_repository.find_by_id(vet_id)

    def find_by_name(self, name: str) -> Vet | None:
        return self.vet_repository.find_by_name(name)
