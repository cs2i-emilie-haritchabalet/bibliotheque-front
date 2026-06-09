import { test, expect } from '@playwright/test';

test.describe('Resource Management', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page de gestion des ressources
    await page.goto('/resources');
    // Attendre que la liste se charge
    await page.waitForSelector('[data-testid="resource-list"]');
  });

  test('should display list of resources', async ({ page }) => {
    // Vérifier que la liste est visible
    const resourceList = page.locator('[data-testid="resource-list"]');
    await expect(resourceList).toBeVisible();
    
    // Vérifier qu'il y a au moins une ressource
    const resources = page.locator('[data-testid="resource-item"]');
    const count = await resources.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should create a new resource', async ({ page }) => {
    // Cliquer sur le bouton de création
    await page.click('button:has-text("Create Resource")');
    
    // Remplir le formulaire
    await page.fill('input[name="title"]', 'Test Book');
    await page.fill('input[name="author"]', 'Test Author');
    await page.selectOption('select[name="type"]', 'BOOK');
    
    // Soumettre le formulaire
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection ou le message de succès
    await expect(page.locator('text=created successfully')).toBeVisible();
  });

  test('should edit a resource', async ({ page }) => {
    // Cliquer sur le premier bouton de modification
    await page.click('[data-testid="edit-resource-button"] >> first');
    
    // Modifier le titre
    await page.fill('input[name="title"]', 'Updated Title');
    
    // Sauvegarder
    await page.click('button[type="submit"]');
    
    // Vérifier la mise à jour
    await expect(page.locator('text=Updated successfully')).toBeVisible();
  });

  test('should delete a resource', async ({ page }) => {
    // Cliquer sur le bouton de suppression
    await page.click('[data-testid="delete-resource-button"] >> first');
    
    // Confirmer la suppression
    await page.click('button:has-text("Confirm")');
    
    // Vérifier le message de succès
    await expect(page.locator('text=deleted successfully')).toBeVisible();
  });
});
