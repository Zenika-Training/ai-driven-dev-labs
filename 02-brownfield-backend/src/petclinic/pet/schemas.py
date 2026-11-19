from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class PetRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    id: int
    name: str
    owner_name: str


class PetCreate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    id: int | None = None
    name: str
    owner_name: str
