import { test, expect, type Page, type TestInfo } from '@playwright/test';

const START_PAGE = 'http://localhost:5173';
const ALL_PETS = ['Max', 'Bella', 'Charlie', 'Luna', 'Rocky'];

async function openPetList(page: Page) {
  await page.goto(START_PAGE);
  await expect(page.getByRole('heading', { name: 'All Pets' })).toBeVisible();
  for (const pet of ALL_PETS) {
    await expect(page.getByRole('cell', { name: pet, exact: true })).toBeVisible();
  }
}

function ownerFilter(page: Page) {
  return page.getByRole('textbox', { name: 'Filter by owner name' });
}

async function expectOnlyPets(page: Page, shown: string[]) {
  for (const pet of ALL_PETS) {
    const cell = page.getByRole('cell', { name: pet, exact: true });
    if (shown.includes(pet)) {
      await expect(cell).toBeVisible();
    } else {
      await expect(cell).toHaveCount(0);
    }
  }
}

async function attachScreenshot(page: Page, testInfo: TestInfo) {
  await testInfo.attach('screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
}

test.describe('Filter the pet list by owner name', () => {
  test('1. filtering by "smith" shows only the pets of John Smith: Max, Charlie', async ({ page }, testInfo) => {
    await openPetList(page);

    await ownerFilter(page).fill('smith');

    await expectOnlyPets(page, ['Max', 'Charlie']);
    await expect(page.getByRole('cell', { name: 'John Smith' })).toHaveCount(2);
    await attachScreenshot(page, testInfo);
  });

  test('2. filtering by "SMITH" after "smith" shows the same pets: Max, Charlie', async ({ page }, testInfo) => {
    await openPetList(page);
    await ownerFilter(page).fill('smith');
    await expectOnlyPets(page, ['Max', 'Charlie']);

    await ownerFilter(page).fill('SMITH');

    await expectOnlyPets(page, ['Max', 'Charlie']);
    await attachScreenshot(page, testInfo);
  });

  test('3. filtering with an empty owner name after "smith" shows the full pet list', async ({ page }, testInfo) => {
    await openPetList(page);
    await ownerFilter(page).fill('smith');
    await expectOnlyPets(page, ['Max', 'Charlie']);

    await ownerFilter(page).fill('');

    await expectOnlyPets(page, ALL_PETS);
    await attachScreenshot(page, testInfo);
  });

  test('4. filtering with an owner name that holds only spaces after "smith" shows the full pet list', async ({ page }, testInfo) => {
    await openPetList(page);
    await ownerFilter(page).fill('smith');
    await expectOnlyPets(page, ['Max', 'Charlie']);

    await ownerFilter(page).fill('   ');

    await expectOnlyPets(page, ALL_PETS);
    await attachScreenshot(page, testInfo);
  });

  test('5. filtering by "xyz" shows the message "No pets found."', async ({ page }, testInfo) => {
    await openPetList(page);

    await ownerFilter(page).fill('xyz');

    await expect(page.getByText('No pets found.')).toBeVisible();
    await expectOnlyPets(page, []);
    await attachScreenshot(page, testInfo);
  });
});
