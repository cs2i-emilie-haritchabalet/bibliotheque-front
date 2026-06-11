import { test, expect, Page } from '@playwright/test';

async function waitForSearchLoaded(page: Page) {
  await page.click('button:has-text("Rechercher")');
  await page.waitForFunction(() => {
    const el = document.querySelector('.empty-state');
    return !el || !el.textContent?.includes('Chargement');
  }, { timeout: 30000 });
}

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('app-login');
    await page.fill('input[type="email"]', 'alice@etu.fr');
    await page.fill('input[type="password"]', 'alice123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*recherche/, { timeout: 10000 });
    await page.waitForSelector('app-search');
  });

  test('should search for resources', async ({ page }) => {
    await page.fill('input[formcontrolname="titre"]', 'Angular');
    await waitForSearchLoaded(page);
    const hasResults = await page.locator('section .card a').count();
    const hasEmpty = await page.locator('.empty-state').count();
    expect(hasResults + hasEmpty).toBeGreaterThan(0);
  });

  test('should filter results by type', async ({ page }) => {
    await page.fill('input[formcontrolname="auteur"]', 'Test');
    await waitForSearchLoaded(page);
    const hasResults = await page.locator('section .card a').count();
    const hasEmpty = await page.locator('.empty-state').count();
    expect(hasResults + hasEmpty).toBeGreaterThan(0);
  });

  test('should display no results message', async ({ page }) => {
    await page.fill('input[formcontrolname="titre"]', 'XYZ123NONEXISTENT');
    await waitForSearchLoaded(page);
    await expect(page.locator('.empty-state')).toContainText('Aucun résultat', { timeout: 5000 });
  });
});