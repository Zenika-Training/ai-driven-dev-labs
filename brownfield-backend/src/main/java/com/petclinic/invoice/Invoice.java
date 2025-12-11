package com.petclinic.invoice;

import com.petclinic.visit.Visit;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String invoiceNumber;

    private LocalDateTime invoiceDate;

    private BigDecimal amount;

    @OneToOne
    @JoinColumn(name = "visit_id")
    private Visit visit;

    public Invoice() {
    }

    public Invoice(String invoiceNumber, LocalDateTime invoiceDate, BigDecimal amount, Visit visit) {
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.amount = amount;
        this.visit = visit;
    }

    public Invoice(Long id, String invoiceNumber, LocalDateTime invoiceDate, BigDecimal amount, Visit visit) {
        this.id = id;
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.amount = amount;
        this.visit = visit;
    }

    public Long getId() {
        return id;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public LocalDateTime getInvoiceDate() {
        return invoiceDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Visit getVisit() {
        return visit;
    }
}
