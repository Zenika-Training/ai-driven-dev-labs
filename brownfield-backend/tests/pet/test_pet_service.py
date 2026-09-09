import pytest

from petclinic.pet.models import Pet
from petclinic.pet.repository import PetRepository
from petclinic.pet.service import PetService


def _service(db_session) -> PetService:
    return PetService(PetRepository(db_session))


def test_should_save_new_pet(db_session):
    # given
    service = _service(db_session)
    pet = Pet(name="Buddy", owner_name="Alice")

    # when
    saved_pet = service.save(pet)

    # then
    assert saved_pet.id is not None
    assert saved_pet.name == "Buddy"
    assert saved_pet.owner_name == "Alice"


def test_should_not_save_pet_with_duplicate_name_for_same_owner(db_session):
    # given
    service = _service(db_session)
    service.save(Pet(name="Max", owner_name="Bob"))
    duplicate_pet = Pet(name="Max", owner_name="Bob")

    # when & then
    with pytest.raises(ValueError, match="Owner Bob already has a pet named Max"):
        service.save(duplicate_pet)


def test_should_allow_different_owners_to_have_pets_with_same_name(db_session):
    # given
    service = _service(db_session)

    # when
    saved_pet_1 = service.save(Pet(name="Charlie", owner_name="Carol"))
    saved_pet_2 = service.save(Pet(name="Charlie", owner_name="Dave"))

    # then
    assert saved_pet_1.id is not None
    assert saved_pet_2.id is not None
    assert saved_pet_1.id != saved_pet_2.id


def test_should_allow_same_owner_to_have_pets_with_different_names(db_session):
    # given
    service = _service(db_session)

    # when
    saved_pet_1 = service.save(Pet(name="Rex", owner_name="Eve"))
    saved_pet_2 = service.save(Pet(name="Luna2", owner_name="Eve"))

    # then
    assert saved_pet_1.name == "Rex"
    assert saved_pet_2.name == "Luna2"


def test_should_find_all_pets(db_session):
    # given
    service = _service(db_session)

    # when
    pets = service.find_all()

    # then
    assert len(pets) >= 5


def test_should_find_pet_by_id(db_session):
    # given
    service = _service(db_session)
    saved_pet = service.save(Pet(name="Oscar", owner_name="Helen"))

    # when
    found_pet = service.find_by_id(saved_pet.id)

    # then
    assert found_pet is not None
    assert found_pet.name == "Oscar"
    assert found_pet.owner_name == "Helen"


def test_should_find_pet_by_name(db_session):
    # given
    service = _service(db_session)

    # when
    found_pet = service.find_by_name("Max")

    # then
    assert found_pet is not None
    assert found_pet.owner_name == "John Smith"


def test_should_delete_pet(db_session):
    # given
    service = _service(db_session)
    saved_pet = service.save(Pet(name="Rocky2", owner_name="Jack"))

    # when
    service.delete(saved_pet.id)

    # then
    assert service.find_by_id(saved_pet.id) is None
