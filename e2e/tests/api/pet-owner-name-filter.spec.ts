import { test, expect, APIRequestContext } from '@playwright/test';

const PET_URL = 'http://localhost:8080/api/v1/pet';
const ALL_PETS = ['Max', 'Charlie', 'Bella', 'Luna', 'Rocky'];
const SMITH_PETS = ['Max', 'Charlie'];

async function petNames(request: APIRequestContext, ownerName?: string): Promise<string[]> {
  const response = await request.get(
    PET_URL,
    ownerName === undefined ? {} : { params: { ownerName } },
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  return body.map((pet: { name: string }) => pet.name);
}

test.describe('Filter the pet list by owner name (API)', () => {
  test('1. filtering by the owner name "smith" returns only the pets whose owner is John Smith: Max, Charlie', async ({ request }) => {
    const response = await request.get(PET_URL, { params: { ownerName: 'smith' } });
    expect(response.status()).toBe(200);
    const pets = await response.json();
    expect(pets.map((p: { name: string }) => p.name).sort()).toEqual([...SMITH_PETS].sort());
    for (const pet of pets) {
      expect(pet.ownerName).toBe('John Smith');
    }
  });

  test('2. filtering by the owner name "SMITH" returns the same pets as "smith": Max, Charlie', async ({ request }) => {
    const lower = await petNames(request, 'smith');
    const upper = await petNames(request, 'SMITH');
    expect(upper.sort()).toEqual([...SMITH_PETS].sort());
    expect(upper.sort()).toEqual(lower.sort());
  });

  test('3. filtering with an empty owner name returns the full pet list', async ({ request }) => {
    const names = await petNames(request, '');
    expect(names.sort()).toEqual([...ALL_PETS].sort());
  });

  test('4. filtering with an owner name that holds only spaces returns the full pet list', async ({ request }) => {
    const names = await petNames(request, '   ');
    expect(names.sort()).toEqual([...ALL_PETS].sort());
  });

  test('5. filtering by the owner name "xyz" returns an empty list', async ({ request }) => {
    const response = await request.get(PET_URL, { params: { ownerName: 'xyz' } });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([]);
  });
});
