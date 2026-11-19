from petclinic.vet.repository import VetRepository
from petclinic.vet.service import VetService


def _service(db_session) -> VetService:
    return VetService(VetRepository(db_session))


def test_should_find_all_vets(db_session):
    # given
    service = _service(db_session)

    # when
    vets = service.find_all()

    # then
    assert len(vets) >= 4


def test_should_find_vet_by_id(db_session):
    # given
    service = _service(db_session)
    existing_vet = service.find_all()[0]

    # when
    found_vet = service.find_by_id(existing_vet.id)

    # then
    assert found_vet is not None
    assert found_vet.id == existing_vet.id
    assert found_vet.name == existing_vet.name
    assert found_vet.specialty == existing_vet.specialty


def test_should_return_none_when_vet_not_found(db_session):
    # given
    service = _service(db_session)

    # when
    found_vet = service.find_by_id(99999)

    # then
    assert found_vet is None


def test_should_find_vet_by_name(db_session):
    # given
    service = _service(db_session)

    # when
    found_vet = service.find_by_name("Dr. Sarah Martinez")

    # then
    assert found_vet is not None
    assert found_vet.name == "Dr. Sarah Martinez"
    assert found_vet.specialty == "Surgery"


def test_should_return_none_when_vet_name_not_found(db_session):
    # given
    service = _service(db_session)

    # when
    found_vet = service.find_by_name("Dr. NonExistent")

    # then
    assert found_vet is None


def test_should_find_vets_with_different_specialties(db_session):
    # given
    service = _service(db_session)

    # when
    surgery_vet = service.find_by_name("Dr. Sarah Martinez")
    dentistry_vet = service.find_by_name("Dr. James Chen")
    general_vet = service.find_by_name("Dr. Emily Rodriguez")
    cardiology_vet = service.find_by_name("Dr. Michael Thompson")

    # then
    assert surgery_vet.specialty == "Surgery"
    assert dentistry_vet.specialty == "Dentistry"
    assert general_vet.specialty == "General Practice"
    assert cardiology_vet.specialty == "Cardiology"
