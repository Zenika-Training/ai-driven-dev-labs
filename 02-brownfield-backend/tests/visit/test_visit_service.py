from petclinic.pet.models import Pet
from petclinic.pet.repository import PetRepository
from petclinic.pet.service import PetService
from petclinic.visit.repository import VisitRepository
from petclinic.visit.service import VisitService


def _visit_service(db_session) -> VisitService:
    return VisitService(VisitRepository(db_session))


def _pet_service(db_session) -> PetService:
    return PetService(PetRepository(db_session))


def test_should_find_all_visits(db_session):
    # given
    service = _visit_service(db_session)

    # when
    visits = service.find_all()

    # then
    assert len(visits) >= 8


def test_should_find_visit_by_id(db_session):
    # given
    service = _visit_service(db_session)
    existing_visit = service.find_all()[0]

    # when
    found_visit = service.find_by_id(existing_visit.id)

    # then
    assert found_visit is not None
    assert found_visit.id == existing_visit.id
    assert found_visit.clinic == existing_visit.clinic


def test_should_return_none_when_visit_not_found(db_session):
    # given
    service = _visit_service(db_session)

    # when
    found_visit = service.find_by_id(99999)

    # then
    assert found_visit is None


def test_should_find_visits_by_pet_id(db_session):
    # given
    pet_service = _pet_service(db_session)
    visit_service = _visit_service(db_session)
    pet = pet_service.find_by_id(1)
    assert pet is not None

    # when
    visits = visit_service.find_by_pet_id(1)

    # then
    assert len(visits) == 2
    assert all(visit.pet.id == 1 for visit in visits)


def test_should_return_empty_list_when_no_visits_for_pet(db_session):
    # given
    pet_service = _pet_service(db_session)
    visit_service = _visit_service(db_session)
    saved_pet = pet_service.save(Pet(name="TestPet", owner_name="TestOwner"))

    # when
    visits = visit_service.find_by_pet_id(saved_pet.id)

    # then
    assert visits == []


def test_should_verify_visit_has_correct_fields(db_session):
    # given
    service = _visit_service(db_session)

    # when
    visits = service.find_by_pet_id(1)
    visit = visits[0]

    # then
    assert visit.id is not None
    assert visit.date_time is not None
    assert visit.clinic != ""
    assert visit.summary != ""
    assert visit.pet.id == 1
    assert visit.vet is not None
    assert visit.vet.name != ""
    assert visit.vet.specialty != ""


def test_should_find_multiple_visits_for_different_pets(db_session):
    # given
    service = _visit_service(db_session)

    # when
    visits_for_pet_1 = service.find_by_pet_id(1)
    visits_for_pet_2 = service.find_by_pet_id(2)
    visits_for_pet_4 = service.find_by_pet_id(4)

    # then
    assert len(visits_for_pet_1) == 2
    assert len(visits_for_pet_2) == 2
    assert len(visits_for_pet_4) == 3
