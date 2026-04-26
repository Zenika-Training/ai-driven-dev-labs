from pydantic import BaseModel


class VetResponse(BaseModel):
    id: int
    name: str
    specialty: str

    model_config = {"from_attributes": True}
