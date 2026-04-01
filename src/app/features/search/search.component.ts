import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ResourceService } from '../../core/services/resource.service';
import { Ressource } from '../../core/models/models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="grid" style="gap: 1rem;">
      <div class="card">
        <div class="page-title">
          <h2 style="margin: 0;">Recherche de ressources</h2>
          <span class="badge">Simple + avancée</span>
        </div>

        <form [formGroup]="form" class="grid grid-2">
          <div class="field"><label>Titre</label><input formControlName="titre"></div>
          <div class="field"><label>Auteur</label><input formControlName="auteur"></div>
          <div class="field"><label>Année</label><input formControlName="anneePublication" type="number"></div>
          <div class="field"><label>Thème</label><input formControlName="theme"></div>
          <div class="actions">
            <button class="btn btn-primary" type="button" (click)="search()" [disabled]="loading">
              {{ loading ? 'Recherche...' : 'Rechercher' }}
            </button>
            <button class="btn btn-secondary" type="button" (click)="reset()" [disabled]="loading">
              Réinitialiser
            </button>
          </div>
        </form>
      </div>

      <div class="card">
        <h3>Résultats</h3>

        @if (loading) {
          <div class="empty-state">Chargement...</div>
        } @else if (results.length === 0) {
          <div class="empty-state">Aucun résultat pour le moment.</div>
        } @else {
          <div class="grid">
            @for (resource of results; track resource.id) {
              <a class="card" [routerLink]="['/ressources', resource.id]" style="display:block;">
                <div class="page-title">
                  <div>
                    <strong>{{ resource.titre }}</strong>
                    <div style="color: var(--muted); margin-top: .3rem;">
                      {{ resource.auteur }} · {{ resource.anneePublication }} · {{ resource.theme }}
                    </div>
                  </div>
                  <span class="badge">{{ resource.type }}</span>
                </div>
                <div>Exemplaires : {{ resource.exemplaires.length }}</div>
              </a>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class SearchComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly resourceService = inject(ResourceService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected loading = false;
  protected results: Ressource[] = [];

  protected form = this.fb.group({
    titre: this.fb.nonNullable.control(''),
    auteur: this.fb.nonNullable.control(''),
    anneePublication: this.fb.control<number | null>(null),
    theme: this.fb.nonNullable.control('')
  });

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.resourceService.search(this.form.getRawValue())
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (results) => {
          this.results = results;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erreur recherche', error);
          this.results = [];
          this.cdr.detectChanges();
        }
      });
  }

  reset(): void {
    this.form.reset({
      titre: '',
      auteur: '',
      anneePublication: null,
      theme: ''
    });
    this.search();
  }
}