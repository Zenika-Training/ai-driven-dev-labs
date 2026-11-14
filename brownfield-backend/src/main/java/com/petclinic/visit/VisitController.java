package com.petclinic.visit;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/visit")
public class VisitController {

    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @GetMapping
    public List<Visit> findAll(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return visitService.findByDateRange(from, to);
    }

    @GetMapping("/{id}")
    public Visit findById(@PathVariable Long id) {
        return visitService.findById(id);
    }

    @GetMapping("/pet/{petId}")
    public List<Visit> findByPetId(@PathVariable Long petId) {
        return visitService.findByPetId(petId);
    }
}
