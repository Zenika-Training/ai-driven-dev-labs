from datetime import datetime
from pydantic import BaseModel
from ..vet.vet_schema import VetResponse
from ..pet.pet_schema import PetResponse


class VisitResponse(BaseModel):
    id: int
    date_time: datetime
    clinic: str
    summary: str
    pet: PetResponse
    vet: VetResponse

    model_config = {"from_attributes": True}
