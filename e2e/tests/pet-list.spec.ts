import { test, expect } from '@playwright/test';

test('pet list shows Max, owned by John Smith', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const maxRow = page.getByRole('row', { name: /Max/ });

  await expect(maxRow.getByRole('cell', { name: 'Max', exact: true })).toBeVisible();
  await expect(maxRow.getByRole('cell', { name: 'John Smith', exact: true })).toBeVisible();
});
