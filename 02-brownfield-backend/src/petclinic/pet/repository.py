from sqlalchemy import select
from sqlalchemy.orm import Session

from petclinic.pet.models import Pet


class PetRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_all(self) -> list[Pet]:
        return list(self.db.scalars(select(Pet).order_by(Pet.id)))

    def find_by_id(self, pet_id: int) -> Pet | None:
        return self.db.get(Pet, pet_id)

    def find_by_name(self, name: str) -> Pet | None:
        return self.db.scalars(select(Pet).where(Pet.name == name)).one_or_none()

    def find_by_name_and_owner_name(self, name: str, owner_name: str) -> Pet | None:
        return self.db.scalars(
            select(Pet).where(Pet.name == name, Pet.owner_name == owner_name)
        ).one_or_none()

    def save(self, pet: Pet) -> Pet:
        merged = self.db.merge(pet)
        self.db.commit()
        self.db.refresh(merged)
        return merged

    def delete_by_id(self, pet_id: int) -> None:
        pet = self.db.get(Pet, pet_id)
        if pet is not None:
            self.db.delete(pet)
        self.db.commit()
