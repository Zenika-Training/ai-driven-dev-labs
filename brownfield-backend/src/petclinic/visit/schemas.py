from datetime import datetime

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

from petclinic.pet.schemas import PetRead
from petclinic.vet.schemas import VetRead


class VisitRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    id: int
    date_time: datetime
    clinic: str
    summary: str
    pet: PetRead
    vet: VetRead | None
