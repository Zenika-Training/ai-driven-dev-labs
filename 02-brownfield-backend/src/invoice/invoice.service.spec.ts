import { describe, expect, it, vi } from 'vitest';
import { InvoiceService } from './invoice.service';
import { InvoiceRepository } from './invoice.repository';

function mockRepository(overrides: Partial<InvoiceRepository> = {}) {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    ...overrides,
  } as unknown as InvoiceRepository;
}

describe('InvoiceService', () => {
  it('should generate a pdf', async () => {
    // given
    const invoice = {
      id: 1,
      invoiceNumber: 'INV-001',
      invoiceDate: new Date('2025-11-15T09:30:00Z'),
      amount: '100.00',
      visitId: 1,
      visit: {
        id: 1,
        dateTime: new Date('2025-11-15T09:30:00Z'),
        clinic: 'Test Clinic',
        summary: 'Test Visit',
        petId: 1,
        vetId: null,
        pet: { id: 1, name: 'Max', ownerName: 'John Smith' },
        vet: null,
      },
    };
    const invoiceRepository = mockRepository({
      findById: vi.fn().mockReturnValue(invoice),
    });
    const invoiceService = new InvoiceService(invoiceRepository);

    // when
    const pdf = await invoiceService.generatePdf(1);

    // then
    expect(pdf.length).toBeGreaterThan(0);
    expect(pdf.toString('latin1')).toContain('%PDF');
  });

  it('should not generate a pdf when the invoice does not exist', async () => {
    // given
    const invoiceRepository = mockRepository({
      findById: vi.fn().mockReturnValue(null),
    });
    const invoiceService = new InvoiceService(invoiceRepository);

    // when & then
    await expect(invoiceService.generatePdf(999)).rejects.toThrow(
      'Invoice not found',
    );
  });
});
