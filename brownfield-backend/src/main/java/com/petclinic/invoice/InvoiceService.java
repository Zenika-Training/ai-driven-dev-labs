package com.petclinic.invoice;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    public byte[] generatePdf(Long invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            document.add(new Paragraph("Invoice Details"));
            document.add(new Paragraph("Invoice Number: " + invoice.getInvoiceNumber()));
            document.add(new Paragraph("Date: " + invoice.getInvoiceDate()));
            document.add(new Paragraph("Amount: $" + invoice.getAmount()));
            
            document.add(new Paragraph("\nVisit Details"));
            if (invoice.getVisit() != null) {
                document.add(new Paragraph("Clinic: " + invoice.getVisit().getClinic()));
                document.add(new Paragraph("Summary: " + invoice.getVisit().getSummary()));
                if (invoice.getVisit().getPet() != null) {
                     document.add(new Paragraph("Pet: " + invoice.getVisit().getPet().getName()));
                }
                if (invoice.getVisit().getVet() != null) {
                     document.add(new Paragraph("Vet: " + invoice.getVisit().getVet().getName()));
                }
            }

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}
