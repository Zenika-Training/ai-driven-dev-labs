from datetime import datetime
from decimal import Decimal
from unittest.mock import Mock

from petclinic.invoice.models import Invoice
from petclinic.invoice.service import InvoiceService
from petclinic.visit.models import Visit


def test_should_generate_pdf():
    # given
    visit = Visit(date_time=datetime.now(), clinic="Test Clinic", summary="Test Visit", pet=None, vet=None)
    invoice = Invoice(id=1, invoice_number="INV-001", invoice_date=datetime.now(), amount=Decimal("100.00"), visit=visit)

    invoice_repository = Mock()
    invoice_repository.find_by_id.return_value = invoice
    service = InvoiceService(invoice_repository)

    # when
    pdf = service.generate_pdf(1)

    # then
    assert len(pdf) > 0
    assert b"%PDF" in pdf
