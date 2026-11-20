import { describe, expect, it, vi } from 'vitest';
import { PetService } from './pet.service';
import { PetRepository } from './pet.repository';

function mockRepository(overrides: Partial<PetRepository> = {}) {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByName: vi.fn(),
    findByNameAndOwnerName: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
    ...overrides,
  } as unknown as PetRepository;
}

describe('PetService', () => {
  it('should save a new pet', async () => {
    // given
    const savedPet = { id: 1, name: 'Buddy', ownerName: 'Alice' };
    const petRepository = mockRepository({
      findByNameAndOwnerName: vi.fn().mockResolvedValue(null),
      save: vi.fn().mockResolvedValue(savedPet),
    });
    const petService = new PetService(petRepository);

    // when
    const pet = await petService.save({ name: 'Buddy', ownerName: 'Alice' });

    // then
    expect(pet).toEqual(savedPet);
  });

  it('should throw an exception when owner has a duplicate pet name', async () => {
    // given
    const existingPet = { id: 1, name: 'Max', ownerName: 'Bob' };
    const petRepository = mockRepository({
      findByNameAndOwnerName: vi.fn().mockResolvedValue(existingPet),
    });
    const petService = new PetService(petRepository);

    // when & then
    await expect(
      petService.save({ name: 'Max', ownerName: 'Bob' }),
    ).rejects.toThrow('Owner Bob already has a pet named Max');
  });

  it('should allow different owners to have pets with the same name', async () => {
    // given
    const petRepository = mockRepository({
      findByNameAndOwnerName: vi.fn().mockResolvedValue(null),
      save: vi
        .fn()
        .mockResolvedValueOnce({ id: 1, name: 'Charlie', ownerName: 'Carol' })
        .mockResolvedValueOnce({ id: 2, name: 'Charlie', ownerName: 'Dave' }),
    });
    const petService = new PetService(petRepository);

    // when
    const pet1 = await petService.save({ name: 'Charlie', ownerName: 'Carol' });
    const pet2 = await petService.save({ name: 'Charlie', ownerName: 'Dave' });

    // then
    expect(pet1.id).not.toEqual(pet2.id);
  });

  it('should find all pets', async () => {
    // given
    const pets = [
      { id: 1, name: 'Milo', ownerName: 'Frank' },
      { id: 2, name: 'Bella', ownerName: 'Grace' },
    ];
    const petRepository = mockRepository({
      findAll: vi.fn().mockResolvedValue(pets),
    });
    const petService = new PetService(petRepository);

    // when
    const result = await petService.findAll();

    // then
    expect(result).toEqual(pets);
  });

  it('should find a pet by id', async () => {
    // given
    const pet = { id: 1, name: 'Oscar', ownerName: 'Helen' };
    const petRepository = mockRepository({
      findById: vi.fn().mockResolvedValue(pet),
    });
    const petService = new PetService(petRepository);

    // when
    const result = await petService.findById(1);

    // then
    expect(result).toEqual(pet);
  });

  it('should not find a pet when the id does not exist', async () => {
    // given
    const petRepository = mockRepository({
      findById: vi.fn().mockResolvedValue(null),
    });
    const petService = new PetService(petRepository);

    // when
    const result = await petService.findById(999);

    // then
    expect(result).toBeNull();
  });

  it('should find a pet by name', async () => {
    // given
    const pet = { id: 1, name: 'Daisy', ownerName: 'Ivan' };
    const petRepository = mockRepository({
      findByName: vi.fn().mockResolvedValue(pet),
    });
    const petService = new PetService(petRepository);

    // when
    const result = await petService.findByName('Daisy');

    // then
    expect(result).toEqual(pet);
  });

  it('should delete a pet', async () => {
    // given
    const petRepository = mockRepository({
      delete: vi.fn().mockResolvedValue(undefined),
    });
    const petService = new PetService(petRepository);

    // when
    await petService.delete(1);

    // then
    expect(petRepository.delete).toHaveBeenCalledWith(1);
  });
});
