from sqlalchemy.orm import Session

from petclinic.pet.models import Pet

PETS = [
    ("Leo", "George Franklin"),
    ("Basil", "Betty Davis"),
    ("Rosy", "Eduardo Rodriquez"),
    ("Jewel", "Harold Davis"),
    ("Iggy", "Peter McTavish"),
]


def seed(db: Session) -> None:
    for name, owner_name in PETS:
        db.add(Pet(name=name, owner_name=owner_name))
    db.commit()
