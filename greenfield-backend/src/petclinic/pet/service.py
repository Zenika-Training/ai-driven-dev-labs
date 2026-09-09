from petclinic.pet.models import Pet
from petclinic.pet.repository import PetRepository


class PetService:
    def __init__(self, pet_repository: PetRepository):
        self.pet_repository = pet_repository

    def find_by_id(self, pet_id: int) -> Pet | None:
        return self.pet_repository.find_by_id(pet_id)

    def find_by_name(self, name: str) -> list[Pet]:
        return self.pet_repository.find_by_name(name)
