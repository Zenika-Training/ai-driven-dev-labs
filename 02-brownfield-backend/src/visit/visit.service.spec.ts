import { describe, expect, it, vi } from 'vitest';
import { VisitService } from './visit.service';
import { VisitRepository } from './visit.repository';

function mockRepository(overrides: Partial<VisitRepository> = {}) {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    findByPetId: vi.fn(),
    ...overrides,
  } as unknown as VisitRepository;
}

const pet = { id: 1, name: 'Max', ownerName: 'John Smith' };
const vet = { id: 1, name: 'Dr. Sarah Martinez', specialty: 'Surgery' };

describe('VisitService', () => {
  it('should find all visits', async () => {
    // given
    const visits = [
      {
        id: 1,
        dateTime: new Date('2025-11-15T09:30:00Z'),
        clinic: 'Downtown Clinic',
        summary: 'Consultation',
        petId: 1,
        vetId: 1,
        pet,
        vet,
      },
    ];
    const visitRepository = mockRepository({
      findAll: vi.fn().mockReturnValue(visits),
    });
    const visitService = new VisitService(visitRepository);

    // when
    const result = await visitService.findAll();

    // then
    expect(result).toEqual(visits);
  });

  it('should find a visit by id', async () => {
    // given
    const visit = {
      id: 1,
      dateTime: new Date('2025-11-15T09:30:00Z'),
      clinic: 'Downtown Clinic',
      summary: 'Consultation',
      petId: 1,
      vetId: 1,
      pet,
      vet,
    };
    const visitRepository = mockRepository({
      findById: vi.fn().mockReturnValue(visit),
    });
    const visitService = new VisitService(visitRepository);

    // when
    const result = await visitService.findById(1);

    // then
    expect(result).toEqual(visit);
  });

  it('should not find a visit when the id does not exist', async () => {
    // given
    const visitRepository = mockRepository({
      findById: vi.fn().mockReturnValue(null),
    });
    const visitService = new VisitService(visitRepository);

    // when
    const result = await visitService.findById(99999);

    // then
    expect(result).toBeNull();
  });

  it('should find visits by pet id', async () => {
    // given
    const visits = [
      {
        id: 1,
        dateTime: new Date('2025-11-15T09:30:00Z'),
        clinic: 'Downtown Clinic',
        summary: 'Consultation',
        petId: 1,
        vetId: 1,
        pet,
        vet,
      },
    ];
    const visitRepository = mockRepository({
      findByPetId: vi.fn().mockReturnValue(visits),
    });
    const visitService = new VisitService(visitRepository);

    // when
    const result = await visitService.findByPetId(1);

    // then
    expect(result).toEqual(visits);
    expect(visitRepository.findByPetId).toHaveBeenCalledWith(1);
  });

  it('should return an empty list when there are no visits for a pet', async () => {
    // given
    const visitRepository = mockRepository({
      findByPetId: vi.fn().mockReturnValue([]),
    });
    const visitService = new VisitService(visitRepository);

    // when
    const result = await visitService.findByPetId(999);

    // then
    expect(result).toEqual([]);
  });
});
