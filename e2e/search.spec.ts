import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page de recherche
    await page.goto('/search');
    // Attendre que le composant de recherche soit chargé
    await page.waitForSelector('app-search');
  });

  test('should search for resources', async ({ page }) => {
    // Remplir le champ de recherche
    await page.fill('input[placeholder*="search" i]', 'Angular');
    
    // Cliquer sur le bouton de recherche
    await page.click('button:has-text("Search")');
    
    // Vérifier que les résultats sont affichés
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
  });

  test('should filter results by type', async ({ page }) => {
    // Remplir la recherche
    await page.fill('input[placeholder*="search" i]', 'Book');
    
    // Sélectionner le filtre de type
    await page.selectOption('select[name="type"]', 'book');
    
    // Cliquer sur rechercher
    await page.click('button:has-text("Search")');
    
    // Vérifier que seuls les livres sont affichés
    const results = page.locator('[data-testid="resource-item"]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display no results message', async ({ page }) => {
    // Rechercher quelque chose qui n'existe pas
    await page.fill('input[placeholder*="search" i]', 'XYZ123NONEXISTENT');
    
    // Cliquer sur rechercher
    await page.click('button:has-text("Search")');
    
    // Vérifier le message d'aucun résultat
    await expect(page.locator('text=No results found')).toBeVisible();
  });
});
