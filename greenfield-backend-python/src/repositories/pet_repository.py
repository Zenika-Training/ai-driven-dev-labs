from src.models.pet import Pet


async def find_all() -> list[Pet]:
    return await Pet.all()


async def find_by_name(name: str) -> Pet | None:
    return await Pet.filter(name=name).first()


async def find_by_name_and_owner(name: str, owner_name: str) -> Pet | None:
    return await Pet.filter(name=name, owner_name=owner_name).first()


async def save_pet(name: str, owner_name: str) -> Pet:
    return await Pet.create(name=name, owner_name=owner_name)
