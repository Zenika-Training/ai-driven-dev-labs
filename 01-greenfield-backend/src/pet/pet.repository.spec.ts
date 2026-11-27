import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DatabaseService } from '../database/database.service';
import { PetRepository } from './pet.repository';

describe('PetRepository', () => {
  let database: DatabaseService;
  let repository: PetRepository;

  beforeEach(() => {
    database = new DatabaseService();
    database.onModuleInit();
    repository = new PetRepository(database);
  });

  afterEach(() => {
    database.onModuleDestroy();
  });

  it('should find a seeded pet by id', () => {
    // given
    const expectedPet = { id: 1, name: 'Leo', ownerName: 'George Franklin' };

    // when
    const pet = repository.findById(1);

    // then
    expect(pet).toEqual(expectedPet);
  });

  it('should find seeded pets by name', () => {
    // given
    const expectedPets = [
      { id: 1, name: 'Leo', ownerName: 'George Franklin' },
    ];

    // when
    const pets = repository.findByName('Leo');

    // then
    expect(pets).toEqual(expectedPets);
  });

  it('should not find a pet when the id does not exist', () => {
    // given
    const missingId = 999;

    // when
    const pet = repository.findById(missingId);

    // then
    expect(pet).toBeNull();
  });
});
