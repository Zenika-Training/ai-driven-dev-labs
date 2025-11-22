package com.petclinic.visit;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitService {

    private final VisitRepository visitRepository;

    public VisitService(VisitRepository visitRepository) {
        this.visitRepository = visitRepository;
    }

    public List<Visit> findAll() {
        return visitRepository.findAll();
    }

    public Visit findById(Long id) {
        return visitRepository.findById(id).orElse(null);
    }

    public List<Visit> findByPetId(Long petId) {
        return visitRepository.findByPetId(petId);
    }
}
