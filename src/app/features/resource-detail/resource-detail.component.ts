import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../core/services/resource.service';
import { LoanService } from '../../core/services/loan.service';
import { AuthService } from '../../core/services/auth.service';
import { Ressource } from '../../core/models/models';

@Component({
  selector: 'app-resource-detail',
  standalone: true,
  template: `
    <div class="card">
      @if (loading) {
        <div class="empty-state">Chargement...</div>
      } @else if (errorMessage) {
        <p class="error">{{ errorMessage }}</p>
      } @else if (resource) {
        <div class="page-title">
          <div>
            <h2 style="margin: 0;">{{ resource.titre }}</h2>
            <div style="color: var(--muted); margin-top: .3rem;">
              {{ resource.auteur }} · {{ resource.anneePublication }} · {{ resource.theme }}
            </div>
          </div>
          <span class="badge">{{ resource.type }}</span>
        </div>

        <div class="grid grid-2">
          <div class="card">
            <h3>Informations</h3>
            <p><strong>Caution :</strong> {{ resource.cautionExigee }}</p>
            <p><strong>Emplacement :</strong> {{ resource.emplacement }}</p>
            @if (resource.referenceSpecifique) {
              <p><strong>Référence :</strong> {{ resource.referenceSpecifique }}</p>
            }
          </div>

          <div class="card">
            <h3>Disponibilité</h3>

            @if (!resource.exemplaires || resource.exemplaires.length === 0) {
              <p>Aucun exemplaire.</p>
            } @else {
              <table class="table">
                <thead>
                  <tr>
                    <th>Code-barres</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  @for (exemplaire of resource.exemplaires; track exemplaire.id) {
                    <tr>
                      <td>{{ exemplaire.codeBarres }}</td>
                      <td>{{ exemplaire.statut }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            }

            @if (!auth.isBibliothecaire()) {
              <div class="actions" style="margin-top: 1rem;">
                <button class="btn btn-primary" (click)="borrow()">Emprunter</button>
              </div>
            }

            @if (message) {
              <p class="success">{{ message }}</p>
            }

            @if (borrowErrorMessage) {
              <p class="error">{{ borrowErrorMessage }}</p>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class ResourceDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly resourceService = inject(ResourceService);
  private readonly loanService = inject(LoanService);
  private readonly cdr = inject(ChangeDetectorRef);
  protected readonly auth = inject(AuthService);

  protected resource: Ressource | null = null;
  protected loading = true;
  protected errorMessage = '';
  protected message = '';
  protected borrowErrorMessage = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.loading = false;
      this.errorMessage = 'Identifiant de ressource invalide.';
      this.cdr.detectChanges();
      return;
    }

    this.resourceService.getById(id).subscribe({
      next: (resource) => {
        this.resource = resource;
        this.loading = false;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.message ?? 'Impossible de charger le détail de la ressource.';
        this.cdr.detectChanges();
      }
    });
  }

  borrow(): void {
    const currentUser = this.auth.currentUser();
    if (!currentUser || !this.resource) {
      return;
    }

    this.message = '';
    this.borrowErrorMessage = '';

    this.loanService.borrow(currentUser.id, this.resource.id).subscribe({
      next: () => {
        this.message = 'Emprunt enregistré.';
        this.resourceService.getById(this.resource!.id).subscribe({
          next: (resource) => {
            this.resource = resource;
            this.cdr.detectChanges();
          },
          error: () => {
            this.borrowErrorMessage = 'Emprunt effectué, mais impossible de recharger la ressource.';
            this.cdr.detectChanges();
          }
        });
      },
      error: (error) => {
        this.borrowErrorMessage = error?.error?.message ?? 'Impossible d’emprunter cette ressource.';
        this.cdr.detectChanges();
      }
    });
  }
}