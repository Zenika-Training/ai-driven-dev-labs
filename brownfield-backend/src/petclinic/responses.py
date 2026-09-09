from fastapi import Response
from pydantic import BaseModel


def entity_response(entity: object | None, schema_cls: type[BaseModel]) -> Response:
    if entity is None:
        return Response(status_code=200)
    schema = schema_cls.model_validate(entity)
    return Response(content=schema.model_dump_json(by_alias=True), media_type="application/json")
