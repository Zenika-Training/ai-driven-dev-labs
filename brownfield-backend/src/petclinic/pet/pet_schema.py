from pydantic import BaseModel, Field


class PetResponse(BaseModel):
    id: int
    name: str
    owner_name: str = Field(serialization_alias="ownerName")

    model_config = {"from_attributes": True, "populate_by_name": True}


class PetRequest(BaseModel):
    name: str
    owner_name: str
