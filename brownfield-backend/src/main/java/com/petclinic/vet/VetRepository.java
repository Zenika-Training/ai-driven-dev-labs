package com.petclinic.vet;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VetRepository extends JpaRepository<Vet, Long> {
    Vet findByName(String name);
}
