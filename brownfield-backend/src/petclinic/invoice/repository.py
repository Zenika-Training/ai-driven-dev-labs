from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from petclinic.invoice.models import Invoice
from petclinic.visit.models import Visit


class InvoiceRepository:
    def __init__(self, db: Session):
        self.db = db

    def find_all(self) -> list[Invoice]:
        return list(self.db.scalars(self._base_query().order_by(Invoice.id)))

    def find_by_id(self, invoice_id: int) -> Invoice | None:
        return self.db.scalars(self._base_query().where(Invoice.id == invoice_id)).one_or_none()

    def _base_query(self):
        return select(Invoice).options(
            joinedload(Invoice.visit).joinedload(Visit.pet),
            joinedload(Invoice.visit).joinedload(Visit.vet),
        )
