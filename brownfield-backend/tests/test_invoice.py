from httpx import AsyncClient


class TestInvoice:
    async def test_find_all_returns_seeded_invoices(self, client: AsyncClient):
        # given seeded invoices in the database

        # when
        response = await client.get("/api/v1/invoices")

        # then
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        assert data[0]["invoice_number"] == "INV-001"
        assert data[0]["amount"] == 75.0

    async def test_download_pdf_returns_pdf_for_existing_invoice(self, client: AsyncClient):
        # given invoice with id 1 exists

        # when
        response = await client.get("/api/v1/invoices/1/pdf")

        # then
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/pdf"
        assert "invoice-1.pdf" in response.headers["content-disposition"]
        assert len(response.content) > 0

    async def test_download_pdf_returns_404_when_not_found(self, client: AsyncClient):
        # given no invoice with id 999

        # when
        response = await client.get("/api/v1/invoices/999/pdf")

        # then
        assert response.status_code == 404
