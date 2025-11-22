package com.petclinic.vet;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class VetServiceTest {

    @Autowired
    private VetService vetService;

    @Test
    void shouldFindAllVets() {
        // when
        List<Vet> vets = vetService.findAll();

        // then
        assertThat(vets).isNotEmpty();
        assertThat(vets.size()).isGreaterThanOrEqualTo(4);
    }

    @Test
    void shouldFindVetById() {
        // given
        List<Vet> allVets = vetService.findAll();
        Vet existingVet = allVets.get(0);

        // when
        Vet foundVet = vetService.findById(existingVet.getId());

        // then
        assertThat(foundVet).isNotNull();
        assertThat(foundVet.getId()).isEqualTo(existingVet.getId());
        assertThat(foundVet.getName()).isEqualTo(existingVet.getName());
        assertThat(foundVet.getSpecialty()).isEqualTo(existingVet.getSpecialty());
    }

    @Test
    void shouldReturnNullWhenVetNotFound() {
        // when
        Vet foundVet = vetService.findById(99999L);

        // then
        assertThat(foundVet).isNull();
    }

    @Test
    void shouldFindVetByName() {
        // when
        Vet foundVet = vetService.findByName("Dr. Sarah Martinez");

        // then
        assertThat(foundVet).isNotNull();
        assertThat(foundVet.getName()).isEqualTo("Dr. Sarah Martinez");
        assertThat(foundVet.getSpecialty()).isEqualTo("Surgery");
    }

    @Test
    void shouldReturnNullWhenVetNameNotFound() {
        // when
        Vet foundVet = vetService.findByName("Dr. NonExistent");

        // then
        assertThat(foundVet).isNull();
    }

    @Test
    void shouldVerifyVetHasCorrectFields() {
        // given
        List<Vet> vets = vetService.findAll();
        assertThat(vets).isNotEmpty();

        // when
        Vet vet = vets.get(0);

        // then
        assertThat(vet.getId()).isNotNull();
        assertThat(vet.getName()).isNotEmpty();
        assertThat(vet.getSpecialty()).isNotEmpty();
    }

    @Test
    void shouldFindVetsWithDifferentSpecialties() {
        // when
        Vet surgeryVet = vetService.findByName("Dr. Sarah Martinez");
        Vet dentistryVet = vetService.findByName("Dr. James Chen");
        Vet generalVet = vetService.findByName("Dr. Emily Rodriguez");
        Vet cardiologyVet = vetService.findByName("Dr. Michael Thompson");

        // then
        assertThat(surgeryVet.getSpecialty()).isEqualTo("Surgery");
        assertThat(dentistryVet.getSpecialty()).isEqualTo("Dentistry");
        assertThat(generalVet.getSpecialty()).isEqualTo("General Practice");
        assertThat(cardiologyVet.getSpecialty()).isEqualTo("Cardiology");
    }
}
