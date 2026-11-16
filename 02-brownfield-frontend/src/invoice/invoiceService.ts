import type { Visit } from '../visit/visitService';

const API_BASE_URL = 'http://localhost:8080/api/v1/invoices';

export interface Invoice {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  amount: number;
  visit: Visit;
}

export const invoiceService = {
  async findAll(): Promise<Invoice[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    return response.json();
  },

  async downloadPdf(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}/pdf`);
    if (!response.ok) {
      throw new Error(`Failed to download PDF for invoice ${id}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
};
