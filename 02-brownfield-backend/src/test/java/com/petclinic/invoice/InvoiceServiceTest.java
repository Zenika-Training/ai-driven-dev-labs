package com.petclinic.invoice;

import com.petclinic.visit.Visit;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class InvoiceServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @InjectMocks
    private InvoiceService invoiceService;

    @Test
    void shouldGeneratePdf() {
        // given
        Visit visit = new Visit(LocalDateTime.now(), "Test Clinic", "Test Visit", null, null);
        
        Invoice invoice = new Invoice(1L, "INV-001", LocalDateTime.now(), new BigDecimal("100.00"), visit);
        given(invoiceRepository.findById(1L)).willReturn(Optional.of(invoice));

        // when
        byte[] pdf = invoiceService.generatePdf(1L);

        // then
        assertThat(pdf).isNotEmpty();
        assertThat(new String(pdf)).contains("%PDF");
    }
}
