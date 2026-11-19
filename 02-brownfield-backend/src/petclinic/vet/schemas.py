from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class VetRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    id: int
    name: str
    specialty: str
