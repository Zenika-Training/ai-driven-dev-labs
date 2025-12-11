import React, { useEffect, useState } from 'react';
import { invoiceService, type Invoice } from './invoiceService';

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await invoiceService.findAll();
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: number) => {
    try {
      await invoiceService.downloadPdf(id);
    } catch (err) {
      console.error('Failed to download PDF', err);
      alert('Failed to download PDF');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading invoices...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Invoices</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinic</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(invoice.invoiceDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.visit?.clinic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.visit?.pet?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDownload(invoice.id)}
                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md transition-colors"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
