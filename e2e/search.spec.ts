import { test, expect, Page } from '@playwright/test';
import { mockApi } from './fixtures';

async function login(page: Page) {
  await mockApi(page);
  await page.goto('/');
  await page.waitForSelector('app-login');
  await page.fill('input[type="email"]', 'alice@etu.fr');
  await page.fill('input[type="password"]', 'alice123');
  await page.click('button[type="submit"]');
  await page.waitForURL(/.*recherche/, { timeout: 10000 });
  await page.waitForSelector('app-search');
}

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should search for resources', async ({ page }) => {
    await page.fill('input[formcontrolname="titre"]', 'Clean');
    await page.click('button:has-text("Rechercher")');
    await page.waitForFunction(() => {
      const el = document.querySelector('.empty-state');
      return !el || !el.textContent?.includes('Chargement');
    }, { timeout: 10000 });
    const count = await page.locator('section .card a').count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter results by type', async ({ page }) => {
    await page.fill('input[formcontrolname="auteur"]', 'Martin');
    await page.click('button:has-text("Rechercher")');
    await page.waitForFunction(() => {
      const el = document.querySelector('.empty-state');
      return !el || !el.textContent?.includes('Chargement');
    }, { timeout: 10000 });
    const count = await page.locator('section .card a').count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display no results message', async ({ page }) => {
    // Mock retournant liste vide pour cette recherche
    await page.route('**/api/ressources/search**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });
    await page.fill('input[formcontrolname="titre"]', 'XYZ123NONEXISTENT');
    await page.click('button:has-text("Rechercher")');
    await page.waitForFunction(() => {
      const el = document.querySelector('.empty-state');
      return !el || !el.textContent?.includes('Chargement');
    }, { timeout: 10000 });
    await expect(page.locator('.empty-state')).toContainText('Aucun résultat', { timeout: 5000 });
  });
});