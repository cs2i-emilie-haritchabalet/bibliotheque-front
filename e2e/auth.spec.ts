import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('app-login');
  });

  test('should display login page', async ({ page }) => {
    await expect(page.locator('app-login')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'alice@etu.fr');
    await page.fill('input[type="password"]', 'alice123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*recherche/, { timeout: 10000 });
  });

  test('should logout successfully', async ({ page }) => {
    await page.fill('input[type="email"]', 'alice@etu.fr');
    await page.fill('input[type="password"]', 'alice123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*recherche/, { timeout: 10000 });
    await page.click('button:has-text("Déconnexion")');
    await expect(page).toHaveURL(/.*login|\//);
  });
});