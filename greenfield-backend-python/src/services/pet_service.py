from tortoise.transactions import atomic

from src.repositories import pet_repository
from src.schemas.pet_response import PetCreate, PetResponse


class PetNotFoundError(Exception):
    pass


class DuplicatePetError(Exception):
    pass


async def get_all_pets() -> list[PetResponse]:
    pets = await pet_repository.find_all()
    return [PetResponse(id=pet.id, name=pet.name, owner_name=pet.owner_name) for pet in pets]


async def get_pet_by_name(name: str) -> PetResponse:
    pet = await pet_repository.find_by_name(name)
    if pet is None:
        raise PetNotFoundError(f"Pet with name '{name}' not found")
    return PetResponse(id=pet.id, name=pet.name, owner_name=pet.owner_name)


@atomic()
async def save_pet(pet_create: PetCreate) -> PetResponse:
    existing = await pet_repository.find_by_name_and_owner(pet_create.name, pet_create.owner_name)
    if existing is not None:
        raise DuplicatePetError(
            f"Pet '{pet_create.name}' already exists for owner '{pet_create.owner_name}'"
        )
    pet = await pet_repository.save_pet(name=pet_create.name, owner_name=pet_create.owner_name)
    return PetResponse(id=pet.id, name=pet.name, owner_name=pet.owner_name)
