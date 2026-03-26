import { expect, test } from '@playwright/test';

test.describe('Pet Directory user journeys', () => {
  test.beforeEach(async ({ page }) => {
      const pets = [
        { id: 1, name: 'Buddy', ownerName: 'Alice' },
        { id: 2, name: 'Milo', ownerName: 'Bob' },
      ];

      const visits = [
        {
          id: 101,
          dateTime: '2026-03-25T09:30:00Z',
          clinic: 'Downtown Clinic',
          summary: 'Routine check-up with good overall health.',
          pet: { id: 1, name: 'Buddy', ownerName: 'Alice' },
          vet: { id: 11, name: 'Dr. Carter', specialty: 'General Practice' },
        },
        {
          id: 102,
          dateTime: '2026-03-26T14:00:00Z',
          clinic: 'Northside Animal Center',
          summary: 'Follow-up visit and vaccination.',
          pet: { id: 2, name: 'Milo', ownerName: 'Bob' },
          vet: { id: 12, name: 'Dr. Singh', specialty: 'Internal Medicine' },
        },
      ];

      const vets = [
        { id: 11, name: 'Dr. Carter', specialty: 'General Practice' },
        { id: 12, name: 'Dr. Singh', specialty: 'Internal Medicine' },
      ];

      const invoices = [
        {
          id: 1,
          invoiceNumber: 'INV-001',
          invoiceDate: '2026-03-25T10:15:00Z',
          amount: 125.5,
          visit: visits[0],
        },
      ];

      await page.route('http://localhost:8080/api/v1/pet', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(pets) });
      });

      await page.route('http://localhost:8080/api/v1/visit', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(visits) });
      });

      await page.route('http://localhost:8080/api/v1/visit/pet/*', async (route) => {
        const url = route.request().url();
        const petId = Number(url.split('/').pop());
        const petVisits = visits.filter((visit) => visit.pet.id === petId);
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(petVisits) });
      });

      await page.route('http://localhost:8080/api/v1/vet', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(vets) });
      });

      await page.route('http://localhost:8080/api/v1/invoices', async (route) => {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(invoices) });
      });

      await page.route('http://localhost:8080/api/v1/invoices/*/pdf', async (route) => {
        const pdfData = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n');
        await route.fulfill({
          status: 200,
          contentType: 'application/pdf',
          headers: {
            'content-disposition': 'attachment; filename="invoice-1.pdf"',
          },
          body: pdfData,
        });
      });

      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Pet Directory' })).toBeVisible();
  });

  test('pets journey: list and detail view', async ({ page }) => {
    await page.getByRole('button', { name: 'Pets', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'All Pets' })).toBeVisible();
    const petRows = page.locator('tbody tr');
    await expect(petRows.first()).toBeVisible();

    const firstPetName = (await petRows.first().locator('td').nth(1).textContent())?.trim();
    await petRows.first().click();

    if (firstPetName) {
      await expect(page.getByRole('heading', { name: firstPetName })).toBeVisible();
    }
    await expect(page.getByRole('heading', { name: 'Visit History' })).toBeVisible();

    await page.getByRole('button', { name: 'Back to Pets' }).click();
    await expect(page.getByRole('heading', { name: 'All Pets' })).toBeVisible();
  });

  test('visits journey: list and detail view', async ({ page }) => {
    await page.getByRole('button', { name: 'Visits', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'All Visits' })).toBeVisible();
    const visitRows = page.locator('tbody tr');
    await expect(visitRows.first()).toBeVisible();

    await visitRows.first().click();

    await expect(page.getByRole('heading', { name: 'Visit Details' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pet Information' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Veterinarian Information' })).toBeVisible();

    await page.getByRole('button', { name: 'Back to Visits' }).click();
    await expect(page.getByRole('heading', { name: 'All Visits' })).toBeVisible();
  });

  test('vets journey: list view', async ({ page }) => {
    await page.getByRole('button', { name: 'Vets', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'Our Veterinarians' })).toBeVisible();
    await expect(page.locator('tbody tr').first()).toBeVisible();
  });

  test('invoices journey: list and PDF download action', async ({ page }) => {
    await page.getByRole('button', { name: 'Invoices', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();
    await expect(page.locator('tbody tr').first()).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PDF' }).first().click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  });
});
