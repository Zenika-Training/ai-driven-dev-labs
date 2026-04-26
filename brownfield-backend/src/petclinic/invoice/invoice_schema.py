from datetime import datetime
from pydantic import BaseModel
from ..visit.visit_schema import VisitResponse


class InvoiceResponse(BaseModel):
    id: int
    invoice_number: str
    invoice_date: datetime
    amount: float
    visit: VisitResponse

    model_config = {"from_attributes": True}
