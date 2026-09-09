from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from petclinic.database import get_db
from petclinic.invoice.repository import InvoiceRepository
from petclinic.invoice.schemas import InvoiceRead
from petclinic.invoice.service import InvoiceService

router = APIRouter(prefix="/api/v1/invoices", tags=["invoices"])


def get_invoice_service(db: Session = Depends(get_db)) -> InvoiceService:
    return InvoiceService(InvoiceRepository(db))


@router.get("", response_model=list[InvoiceRead])
def find_all(invoice_service: InvoiceService = Depends(get_invoice_service)):
    return invoice_service.find_all()


@router.get("/{invoice_id}/pdf")
def download_pdf(invoice_id: int, invoice_service: InvoiceService = Depends(get_invoice_service)) -> Response:
    pdf_content = invoice_service.generate_pdf(invoice_id)
    return Response(
        content=pdf_content,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=invoice-{invoice_id}.pdf"},
    )
