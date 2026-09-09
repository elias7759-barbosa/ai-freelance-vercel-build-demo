import { test, expect } from '@playwright/test';

test('home serves successfully with application identity', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Deployment Diagnostics Demo');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Deployment Diagnostics Demo');
});
test('deployment details are directly addressable', async ({ page }) => {
  const response = await page.goto('/deployment-info');
  expect(response?.status()).toBe(200);
  await expect(page.getByText('Node.js 24.x')).toBeVisible();
  await expect(page.getByText('Required environment variables')).toBeVisible();
});
test('navigation connects both pages without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('link', { name: /Explore deployment info/ }).click();
  await expect(page).toHaveURL(/\/deployment-info$/);
  await page.getByRole('link', { name: '← Back to overview' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Deployment Diagnostics Demo');
  expect(errors).toEqual([]);
});
test('missing page returns 404 and supports recovery', async ({ page }) => {
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This page is missing');
  await page.getByRole('link', { name: 'Return to overview' }).click();
  await expect(page).toHaveURL('/');
});
test('mobile routes remain usable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ['/', '/deployment-info']) {
    await page.goto(route);
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});
