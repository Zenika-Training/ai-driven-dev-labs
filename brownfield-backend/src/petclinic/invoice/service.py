from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

from petclinic.invoice.models import Invoice
from petclinic.invoice.repository import InvoiceRepository


class InvoiceService:
    def __init__(self, invoice_repository: InvoiceRepository):
        self.invoice_repository = invoice_repository

    def find_all(self) -> list[Invoice]:
        return self.invoice_repository.find_all()

    def generate_pdf(self, invoice_id: int) -> bytes:
        invoice = self.invoice_repository.find_by_id(invoice_id)
        if invoice is None:
            raise ValueError("Invoice not found")

        styles = getSampleStyleSheet()
        story = [
            Paragraph("Invoice Details", styles["Normal"]),
            Paragraph(f"Invoice Number: {invoice.invoice_number}", styles["Normal"]),
            Paragraph(f"Date: {invoice.invoice_date}", styles["Normal"]),
            Paragraph(f"Amount: ${invoice.amount}", styles["Normal"]),
            Spacer(1, 12),
            Paragraph("Visit Details", styles["Normal"]),
        ]

        visit = invoice.visit
        if visit is not None:
            story.append(Paragraph(f"Clinic: {visit.clinic}", styles["Normal"]))
            story.append(Paragraph(f"Summary: {visit.summary}", styles["Normal"]))
            if visit.pet is not None:
                story.append(Paragraph(f"Pet: {visit.pet.name}", styles["Normal"]))
            if visit.vet is not None:
                story.append(Paragraph(f"Vet: {visit.vet.name}", styles["Normal"]))

        buffer = BytesIO()
        SimpleDocTemplate(buffer).build(story)
        return buffer.getvalue()
