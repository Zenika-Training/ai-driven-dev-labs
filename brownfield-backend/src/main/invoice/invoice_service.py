import io
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from sqlalchemy.ext.asyncio import AsyncSession
from .invoice_repository import InvoiceRepository
from .invoice_schema import InvoiceResponse


class InvoiceService:
    def __init__(self, session: AsyncSession):
        self.repository = InvoiceRepository(session)

    async def find_all(self) -> list[InvoiceResponse]:
        invoices = await self.repository.find_all()
        return [InvoiceResponse.model_validate(i) for i in invoices]

    async def generate_pdf(self, invoice_id: int) -> bytes:
        invoice = await self.repository.find_by_id(invoice_id)
        if not invoice:
            raise ValueError(f"Invoice {invoice_id} not found")

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        styles = getSampleStyleSheet()
        story = []

        story.append(Paragraph(f"Invoice #{invoice.invoice_number}", styles["Title"]))
        story.append(Spacer(1, 12))
        story.append(Paragraph(f"Date: {invoice.invoice_date.strftime('%Y-%m-%d')}", styles["Normal"]))
        story.append(Paragraph(f"Amount: ${invoice.amount}", styles["Normal"]))
        story.append(Spacer(1, 12))

        if invoice.visit:
            story.append(Paragraph("Visit Details", styles["Heading2"]))
            story.append(Paragraph(f"Clinic: {invoice.visit.clinic}", styles["Normal"]))
            story.append(Paragraph(f"Summary: {invoice.visit.summary}", styles["Normal"]))
            story.append(Paragraph(f"Date: {invoice.visit.date_time.strftime('%Y-%m-%d %H:%M')}", styles["Normal"]))
            story.append(Spacer(1, 12))
            if invoice.visit.pet:
                story.append(Paragraph(f"Pet: {invoice.visit.pet.name}", styles["Normal"]))
            if invoice.visit.vet:
                story.append(Paragraph(f"Vet: {invoice.visit.vet.name}", styles["Normal"]))

        doc.build(story)
        return buffer.getvalue()
