from pydantic import BaseModel


class PetResponse(BaseModel):
    id: int
    name: str
    owner_name: str


class PetCreate(BaseModel):
    name: str
    owner_name: str
