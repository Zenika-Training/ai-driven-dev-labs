package com.petclinic.visit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class VisitControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnAllVisitsWhenNoDateParams() throws Exception {
        // given / when / then
        mockMvc.perform(get("/api/v1/visit"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(8));
    }

    @Test
    void shouldIncludeVisitsOnBothBoundaryDays() throws Exception {
        // given: visit 3 on 2025-11-10 10:15 and visit 5 on 2025-11-12 16:30

        // when / then
        mockMvc.perform(get("/api/v1/visit").param("from", "2025-11-10").param("to", "2025-11-12"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldReturnOnlyVisitsOfThatDayWhenFromEqualsTo() throws Exception {
        // given / when / then
        mockMvc.perform(get("/api/v1/visit").param("from", "2025-11-15").param("to", "2025-11-15"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void shouldExcludeVisitsJustOutsideTheRange() throws Exception {
        // given: visits on 2025-11-15 and 2025-11-17 only fall inside 16th-17th partially

        // when / then
        mockMvc.perform(get("/api/v1/visit").param("from", "2025-11-16").param("to", "2025-11-16"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void shouldFilterWithOnlyFrom() throws Exception {
        // given / when / then
        mockMvc.perform(get("/api/v1/visit").param("from", "2025-11-21"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldFilterWithOnlyTo() throws Exception {
        // given / when / then
        mockMvc.perform(get("/api/v1/visit").param("to", "2025-11-10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldReturnEmptyListWhenNoVisitInRange() throws Exception {
        // given / when / then
        mockMvc.perform(get("/api/v1/visit").param("from", "2030-01-01").param("to", "2030-12-31"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void shouldRejectMalformedDate() throws Exception {
        // given / when / then
        mockMvc.perform(get("/api/v1/visit").param("from", "15/11/2025"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldRejectFromAfterTo() throws Exception {
        // given / when / then
        mockMvc.perform(get("/api/v1/visit").param("from", "2025-11-20").param("to", "2025-11-10"))
                .andExpect(status().isBadRequest());
    }
}
