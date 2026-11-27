import { describe, expect, it, vi } from 'vitest';
import { PetService } from './pet.service';
import { PetRepository } from './pet.repository';

describe('PetService', () => {
  it('should find a pet by id', () => {
    // given
    const expectedPet = { id: 1, name: 'Leo', ownerName: 'George Franklin' };
    const petRepository = {
      findById: vi.fn().mockReturnValue(expectedPet),
      findByName: vi.fn(),
    } as unknown as PetRepository;
    const petService = new PetService(petRepository);

    // when
    const pet = petService.findById(1);

    // then
    expect(pet).toEqual(expectedPet);
    expect(petRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should not find a pet when the id does not exist', () => {
    // given
    const petRepository = {
      findById: vi.fn().mockReturnValue(null),
      findByName: vi.fn(),
    } as unknown as PetRepository;
    const petService = new PetService(petRepository);

    // when
    const pet = petService.findById(999);

    // then
    expect(pet).toBeNull();
  });

  it('should find pets by name', () => {
    // given
    const expectedPets = [
      { id: 1, name: 'Leo', ownerName: 'George Franklin' },
    ];
    const petRepository = {
      findById: vi.fn(),
      findByName: vi.fn().mockReturnValue(expectedPets),
    } as unknown as PetRepository;
    const petService = new PetService(petRepository);

    // when
    const pets = petService.findByName('Leo');

    // then
    expect(pets).toEqual(expectedPets);
    expect(petRepository.findByName).toHaveBeenCalledWith('Leo');
  });

  it('should not find pets when no name matches', () => {
    // given
    const petRepository = {
      findById: vi.fn(),
      findByName: vi.fn().mockReturnValue([]),
    } as unknown as PetRepository;
    const petService = new PetService(petRepository);

    // when
    const pets = petService.findByName('Unknown');

    // then
    expect(pets).toEqual([]);
  });
});
