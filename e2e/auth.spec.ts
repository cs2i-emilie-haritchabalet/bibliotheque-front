import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    await expect(page.locator('app-login')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    // Remplir le formulaire de connexion
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Cliquer sur le bouton de connexion
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection
    await expect(page).toHaveURL(/.*dashboard|home/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Remplir avec des identifiants invalides
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    
    // Cliquer sur le bouton de connexion
    await page.click('button[type="submit"]');
    
    // Vérifier le message d'erreur
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Supposer qu'on est déjà connecté
    // Cliquer sur le bouton de déconnexion
    await page.click('button:has-text("Logout")');
    
    // Vérifier la redirection vers la page de connexion
    await expect(page).toHaveURL(/.*login/);
  });
});
