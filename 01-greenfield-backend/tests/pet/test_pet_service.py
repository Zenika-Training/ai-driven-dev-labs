from petclinic.pet.models import Pet
from petclinic.pet.repository import PetRepository
from petclinic.pet.service import PetService


def test_should_find_pet_by_id(db_session):
    # given
    repository = PetRepository(db_session)
    service = PetService(repository)
    saved_pet = repository.save(Pet(name="Buddy", owner_name="Alice"))

    # when
    found_pet = service.find_by_id(saved_pet.id)

    # then
    assert found_pet is not None
    assert found_pet.name == "Buddy"
    assert found_pet.owner_name == "Alice"


def test_should_not_find_pet_by_id_when_missing(db_session):
    # given
    service = PetService(PetRepository(db_session))

    # when
    found_pet = service.find_by_id(999)

    # then
    assert found_pet is None


def test_should_find_pet_by_name(db_session):
    # given
    repository = PetRepository(db_session)
    service = PetService(repository)
    repository.save(Pet(name="Daisy", owner_name="Ivan"))

    # when
    found_pets = service.find_by_name("Daisy")

    # then
    assert len(found_pets) == 1
    assert found_pets[0].owner_name == "Ivan"


def test_should_not_find_pet_by_name_when_missing(db_session):
    # given
    service = PetService(PetRepository(db_session))

    # when
    found_pets = service.find_by_name("Ghost")

    # then
    assert found_pets == []
