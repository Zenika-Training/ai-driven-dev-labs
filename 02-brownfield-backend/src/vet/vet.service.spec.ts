import { describe, expect, it, vi } from 'vitest';
import { VetService } from './vet.service';
import { VetRepository } from './vet.repository';

function mockRepository(overrides: Partial<VetRepository> = {}) {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByName: vi.fn(),
    ...overrides,
  } as unknown as VetRepository;
}

describe('VetService', () => {
  it('should find all vets', async () => {
    // given
    const vets = [
      { id: 1, name: 'Dr. Sarah Martinez', specialty: 'Surgery' },
      { id: 2, name: 'Dr. James Chen', specialty: 'Dentistry' },
    ];
    const vetRepository = mockRepository({
      findAll: vi.fn().mockResolvedValue(vets),
    });
    const vetService = new VetService(vetRepository);

    // when
    const result = await vetService.findAll();

    // then
    expect(result).toEqual(vets);
  });

  it('should find a vet by id', async () => {
    // given
    const vet = { id: 1, name: 'Dr. Sarah Martinez', specialty: 'Surgery' };
    const vetRepository = mockRepository({
      findById: vi.fn().mockResolvedValue(vet),
    });
    const vetService = new VetService(vetRepository);

    // when
    const result = await vetService.findById(1);

    // then
    expect(result).toEqual(vet);
  });

  it('should not find a vet when the id does not exist', async () => {
    // given
    const vetRepository = mockRepository({
      findById: vi.fn().mockResolvedValue(null),
    });
    const vetService = new VetService(vetRepository);

    // when
    const result = await vetService.findById(99999);

    // then
    expect(result).toBeNull();
  });

  it('should find a vet by name', async () => {
    // given
    const vet = { id: 1, name: 'Dr. Sarah Martinez', specialty: 'Surgery' };
    const vetRepository = mockRepository({
      findByName: vi.fn().mockResolvedValue(vet),
    });
    const vetService = new VetService(vetRepository);

    // when
    const result = await vetService.findByName('Dr. Sarah Martinez');

    // then
    expect(result).toEqual(vet);
  });

  it('should not find a vet when the name does not exist', async () => {
    // given
    const vetRepository = mockRepository({
      findByName: vi.fn().mockResolvedValue(null),
    });
    const vetService = new VetService(vetRepository);

    // when
    const result = await vetService.findByName('Dr. NonExistent');

    // then
    expect(result).toBeNull();
  });
});
