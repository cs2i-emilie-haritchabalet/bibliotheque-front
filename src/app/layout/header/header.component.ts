import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="card" style="margin-bottom: 1rem;">
      <div class="page-title" style="margin-bottom: .5rem;">
        <div>
          <h1 style="margin: 0;">Bibliothèque universitaire</h1>
          <div style="color: var(--muted); margin-top: .25rem;">
            {{ auth.currentUser()?.nomComplet }} · {{ auth.currentUser()?.role }}
          </div>
        </div>
        <button class="btn btn-secondary" (click)="logout()">Déconnexion</button>
      </div>

      <nav class="nav-links">
        <a routerLink="/recherche" routerLinkActive="active" class="nav-link">Recherche</a>

        @if (auth.isBibliothecaire()) {
          <a routerLink="/utilisateurs" routerLinkActive="active" class="nav-link">Gestion utilisateurs</a>
          <a routerLink="/utilisateurs/nouveau" routerLinkActive="active" class="nav-link">Nouvel utilisateur</a>
          <a routerLink="/ressources/nouvelle" routerLinkActive="active" class="nav-link">Nouvelle ressource</a>
          <a routerLink="/retards" routerLinkActive="active" class="nav-link">Retards & relances</a>
        } @else {
          <a routerLink="/mes-emprunts" routerLinkActive="active" class="nav-link">Mes emprunts</a>
        }
      </nav>
    </header>
  `
})
export class HeaderComponent {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}