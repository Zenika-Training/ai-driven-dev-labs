from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, field_serializer
from pydantic.alias_generators import to_camel

from petclinic.visit.schemas import VisitRead


class InvoiceRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    id: int
    invoice_number: str
    invoice_date: datetime
    amount: Decimal
    visit: VisitRead

    @field_serializer("amount")
    def serialize_amount(self, amount: Decimal) -> float:
        return float(amount)
