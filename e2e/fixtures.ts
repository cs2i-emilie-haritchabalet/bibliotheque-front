import { Page } from '@playwright/test';

export async function mockApi(page: Page) {
  // Mock login
  await page.route('**/api/auth/login', async (route) => {
    const body = route.request().postDataJSON();
    if (body?.email === 'alice@etu.fr' && body?.motDePasse === 'alice123') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          email: 'alice@etu.fr',
          nom: 'Alice',
          prenom: 'Dupont',
          role: 'UTILISATEUR'
        })
      });
    } else if (body?.email === 'admin@biblio.fr' && body?.motDePasse === 'admin123') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 2,
          email: 'admin@biblio.fr',
          nom: 'Admin',
          prenom: 'Biblio',
          role: 'BIBLIOTHECAIRE'
        })
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Identifiants invalides' })
      });
    }
  });

  // Mock recherche ressources
  await page.route('**/api/ressources/search**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          titre: 'Clean Code',
          auteur: 'Robert Martin',
          anneePublication: 2008,
          theme: 'Informatique',
          type: 'LIVRE',
          cautionExigee: 5.0,
          emplacement: 'A1',
          referenceSpecifique: '978-0132350884',
          exemplaires: [
            { id: 1, codeBarres: 'EX001', statut: 'DISPONIBLE' }
          ]
        },
        {
          id: 2,
          titre: 'Design Patterns',
          auteur: 'Gang of Four',
          anneePublication: 1994,
          theme: 'Informatique',
          type: 'LIVRE',
          cautionExigee: 5.0,
          emplacement: 'A2',
          referenceSpecifique: '978-0201633610',
          exemplaires: [
            { id: 2, codeBarres: 'EX002', statut: 'DISPONIBLE' }
          ]
        }
      ])
    });
  });

  // Mock détail ressource
  await page.route('**/api/ressources/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        titre: 'Clean Code',
        auteur: 'Robert Martin',
        anneePublication: 2008,
        theme: 'Informatique',
        type: 'LIVRE',
        cautionExigee: 5.0,
        emplacement: 'A1',
        referenceSpecifique: '978-0132350884',
        exemplaires: [
          { id: 1, codeBarres: 'EX001', statut: 'DISPONIBLE' }
        ]
      })
    });
  });

  // Mock création ressource
  await page.route('**/api/ressources', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 99, message: 'Ressource ajoutée.' })
      });
    } else {
      route.continue();
    }
  });
}