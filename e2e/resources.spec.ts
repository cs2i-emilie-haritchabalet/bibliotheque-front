import { test, expect, Page } from '@playwright/test';
import { mockApi } from './fixtures';

async function loginAsAdmin(page: Page) {
  await mockApi(page);
  await page.goto('/');
  await page.waitForSelector('app-login');
  await page.fill('input[type="email"]', 'admin@biblio.fr');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL(/.*recherche/, { timeout: 10000 });
}

test.describe('Resource Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('should display list of resources', async ({ page }) => {
    await page.waitForSelector('app-search');
    await page.click('button:has-text("Rechercher")');
    await page.waitForFunction(() => {
      const el = document.querySelector('.empty-state');
      return !el || !el.textContent?.includes('Chargement');
    }, { timeout: 10000 });
    const count = await page.locator('section .card a').count();
    expect(count).toBeGreaterThan(0);
  });

  test('should create a new resource', async ({ page }) => {
    await page.goto('/ressources/nouvelle');
    await expect(page).not.toHaveURL(/.*login/);
    await page.waitForSelector('app-resource-create');
    await page.selectOption('select[formcontrolname="type"]', 'LIVRE');
    await page.fill('input[formcontrolname="titre"]', 'Test Book');
    await page.fill('input[formcontrolname="auteur"]', 'Test Author');
    await page.fill('input[formcontrolname="theme"]', 'Informatique');
    await page.fill('input[formcontrolname="emplacementCode"]', 'A1');
    await page.fill('input[formcontrolname="emplacementLibelle"]', 'Étagère A');
    await page.fill('input[formcontrolname="isbn"]', '978-0000000000');
    await page.click('button[type="submit"]');
    await expect(page.locator('.success')).toContainText('Ressource ajoutée', { timeout: 10000 });
  });

  test('should edit a resource', async ({ page }) => {
    await page.waitForSelector('app-search');
    await page.click('button:has-text("Rechercher")');
    await page.waitForFunction(() => {
      const el = document.querySelector('.empty-state');
      return !el || !el.textContent?.includes('Chargement');
    }, { timeout: 10000 });
    await page.locator('section .card a').first().click();
    await page.waitForURL(/.*ressources\/\d+/, { timeout: 10000 });
    await expect(page.locator('app-resource-detail')).toBeVisible({ timeout: 10000 });
  });

  test('should delete a resource', async ({ page }) => {
    await page.waitForSelector('app-search');
    await page.click('button:has-text("Rechercher")');
    await page.waitForFunction(() => {
      const el = document.querySelector('.empty-state');
      return !el || !el.textContent?.includes('Chargement');
    }, { timeout: 10000 });
    const count = await page.locator('section .card a').count();
    expect(count).toBeGreaterThan(0);
  });
});