from pydantic import BaseModel, ConfigDict


class PetRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    owner_name: str
