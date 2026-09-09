from petclinic.pet.models import Pet
from petclinic.pet.repository import PetRepository


class PetService:
    def __init__(self, pet_repository: PetRepository):
        self.pet_repository = pet_repository

    def find_all(self) -> list[Pet]:
        return self.pet_repository.find_all()

    def find_by_id(self, pet_id: int) -> Pet | None:
        return self.pet_repository.find_by_id(pet_id)

    def find_by_name(self, name: str) -> Pet | None:
        return self.pet_repository.find_by_name(name)

    def save(self, pet: Pet) -> Pet:
        self._validate_pet_uniqueness_per_owner(pet)
        return self.pet_repository.save(pet)

    def delete(self, pet_id: int) -> None:
        self.pet_repository.delete_by_id(pet_id)

    def _validate_pet_uniqueness_per_owner(self, pet: Pet) -> None:
        existing_pet = self.pet_repository.find_by_name_and_owner_name(pet.name, pet.owner_name)
        if existing_pet is not None and existing_pet.id != pet.id:
            raise ValueError(f"Owner {pet.owner_name} already has a pet named {pet.name}")
