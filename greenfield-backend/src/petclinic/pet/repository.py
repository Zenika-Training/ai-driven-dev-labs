from sqlalchemy import select
from sqlalchemy.orm import Session

from petclinic.pet.models import Pet


class PetRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_by_id(self, pet_id: int) -> Pet | None:
        return self.db.get(Pet, pet_id)

    def find_by_name(self, name: str) -> list[Pet]:
        return list(self.db.scalars(select(Pet).where(Pet.name == name)))

    def save(self, pet: Pet) -> Pet:
        self.db.add(pet)
        self.db.commit()
        self.db.refresh(pet)
        return pet
