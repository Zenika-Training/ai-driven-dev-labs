package com.petclinic.pet;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class PetServiceTest {

    @Autowired
    private PetService petService;

    @Test
    void shouldSaveNewPet() {
        // given
        Pet pet = new Pet("Buddy", "Alice", null);

        // when
        Pet savedPet = petService.save(pet);

        // then
        assertThat(savedPet.getId()).isNotNull();
        assertThat(savedPet.getName()).isEqualTo("Buddy");
        assertThat(savedPet.getOwnerName()).isEqualTo("Alice");
    }

    @Test
    void shouldThrowExceptionWhenOwnerHasDuplicatePetName() {
        // given    
        Pet firstPet = new Pet("Max", "Bob", null);
        petService.save(firstPet);
        Pet duplicatePet = new Pet("Max", "Bob", null);

        // when & then
        assertThatThrownBy(() -> petService.save(duplicatePet))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Owner Bob already has a pet named Max");
    }

    @Test
    void shouldAllowDifferentOwnersToHavePetsWithSameName() {
        // given
        Pet pet1 = new Pet("Charlie", "Carol", null);
        Pet pet2 = new Pet("Charlie", "Dave", null);

        // when
        Pet savedPet1 = petService.save(pet1);
        Pet savedPet2 = petService.save(pet2);

        // then
        assertThat(savedPet1.getId()).isNotNull();
        assertThat(savedPet2.getId()).isNotNull();
        assertThat(savedPet1.getId()).isNotEqualTo(savedPet2.getId());
    }

    @Test
    void shouldAllowSameOwnerToHavePetsWithDifferentNames() {
        // given
        Pet pet1 = new Pet("Rex", "Eve", null);
        Pet pet2 = new Pet("Luna", "Eve", null);

        // when
        Pet savedPet1 = petService.save(pet1);
        Pet savedPet2 = petService.save(pet2);

        // then
        assertThat(savedPet1.getId()).isNotNull();
        assertThat(savedPet2.getId()).isNotNull();
        assertThat(savedPet1.getName()).isEqualTo("Rex");
        assertThat(savedPet2.getName()).isEqualTo("Luna");
    }

    @Test
    void shouldFindAllPets() {
        // given
        Pet pet1 = new Pet("Milo", "Frank", null);
        Pet pet2 = new Pet("Bella", "Grace", null);
        petService.save(pet1);
        petService.save(pet2);

        // when
        var pets = petService.findAll();

        // then
        assertThat(pets).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    void shouldFindPetById() {
        // given
        Pet pet = new Pet("Oscar", "Helen", null);
        Pet savedPet = petService.save(pet);

        // when
        Pet foundPet = petService.findById(savedPet.getId());

        // then
        assertThat(foundPet).isNotNull();
        assertThat(foundPet.getName()).isEqualTo("Oscar");
        assertThat(foundPet.getOwnerName()).isEqualTo("Helen");
    }

    @Test
    void shouldFindPetByName() {
        // given
        Pet pet = new Pet("Daisy", "Ivan", null);
        petService.save(pet);

        // when
        Pet foundPet = petService.findByName("Daisy");

        // then
        assertThat(foundPet).isNotNull();
        assertThat(foundPet.getOwnerName()).isEqualTo("Ivan");
    }

    @Test
    void shouldDeletePet() {
        // given
        Pet pet = new Pet("Rocky", "Jack", null);
        Pet savedPet = petService.save(pet);

        // when
        petService.delete(savedPet.getId());

        // then
        Pet deletedPet = petService.findById(savedPet.getId());
        assertThat(deletedPet).isNull();
    }
}
