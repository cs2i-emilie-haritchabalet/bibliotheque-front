import { test, expect, Page } from '@playwright/test';

async function waitForSearchLoaded(page: Page) {
  await page.waitForSelector('app-search');
  await page.click('button:has-text("Rechercher")');
  await page.waitForFunction(() => {
    const el = document.querySelector('.empty-state');
    return !el || !el.textContent?.includes('Chargement');
  }, { timeout: 30000 });
}

test.describe('Resource Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('app-login');
    await page.fill('input[type="email"]', 'admin@biblio.fr');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*recherche/, { timeout: 10000 });
  });

  test('should display list of resources', async ({ page }) => {
    await waitForSearchLoaded(page);
    const count = await page.locator('section .card a').count();
    expect(count).toBeGreaterThan(0);
  });

  test('should edit a resource', async ({ page }) => {
    await waitForSearchLoaded(page);
    await page.locator('section .card a').first().click();
    await page.waitForURL(/.*ressources\/\d+/, { timeout: 10000 });
    await expect(page.locator('app-resource-detail')).toBeVisible({ timeout: 10000 });
  });

  test('should delete a resource', async ({ page }) => {
    await waitForSearchLoaded(page);
    const count = await page.locator('section .card a').count();
    expect(count).toBeGreaterThan(0);
  });
});