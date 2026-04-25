from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_session
from .invoice_schema import InvoiceResponse
from .invoice_service import InvoiceService

router = APIRouter(prefix="/api/v1/invoices", tags=["invoice"])


@router.get("", response_model=list[InvoiceResponse])
async def find_all(session: AsyncSession = Depends(get_session)):
    return await InvoiceService(session).find_all()


@router.get("/{invoice_id}/pdf")
async def download_pdf(invoice_id: int, session: AsyncSession = Depends(get_session)):
    try:
        pdf_bytes = await InvoiceService(session).generate_pdf(invoice_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=invoice-{invoice_id}.pdf"},
    )
