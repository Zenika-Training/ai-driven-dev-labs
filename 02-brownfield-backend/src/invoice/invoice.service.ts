import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { InvoiceRepository, InvoiceWithRelations } from './invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  findAll(): Promise<InvoiceWithRelations[]> {
    return this.invoiceRepository.findAll();
  }

  async generatePdf(invoiceId: number): Promise<Buffer> {
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return this.buildPdf(invoice);
  }

  private buildPdf(invoice: InvoiceWithRelations): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      doc.text('Invoice Details');
      doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
      doc.text(`Date: ${invoice.invoiceDate.toISOString()}`);
      doc.text(`Amount: $${invoice.amount.toString()}`);

      doc.text('\nVisit Details');
      if (invoice.visit) {
        doc.text(`Clinic: ${invoice.visit.clinic}`);
        doc.text(`Summary: ${invoice.visit.summary}`);
        if (invoice.visit.pet) {
          doc.text(`Pet: ${invoice.visit.pet.name}`);
        }
        if (invoice.visit.vet) {
          doc.text(`Vet: ${invoice.visit.vet.name}`);
        }
      }

      doc.end();
    });
  }
}
