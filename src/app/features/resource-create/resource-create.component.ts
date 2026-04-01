import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ResourceService } from '../../core/services/resource.service';

@Component({
  selector: 'app-resource-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Ajout d’une ressource</h2>

      <form [formGroup]="form" (ngSubmit)="submit()" class="grid grid-2">
        <div class="field">
          <label>Type</label>
          <select formControlName="type">
            <option value="LIVRE">Livre</option>
            <option value="REVUE">Revue</option>
          </select>
        </div>

        <div class="field"><label>Titre</label><input formControlName="titre"></div>
        <div class="field"><label>Auteur</label><input formControlName="auteur"></div>
        <div class="field"><label>Année</label><input type="number" formControlName="anneePublication"></div>
        <div class="field"><label>Thème</label><input formControlName="theme"></div>
        <div class="field"><label>Caution exigée</label><input type="number" step="0.01" formControlName="cautionExigee"></div>
        <div class="field"><label>Code emplacement</label><input formControlName="emplacementCode"></div>
        <div class="field"><label>Libellé emplacement</label><input formControlName="emplacementLibelle"></div>
        <div class="field"><label>Nombre d’exemplaires</label><input type="number" formControlName="nombreExemplaires"></div>

        @if (form.value.type === 'LIVRE') {
          <div class="field"><label>ISBN</label><input formControlName="isbn"></div>
        } @else {
          <div class="field"><label>Numéro</label><input type="number" formControlName="numero"></div>
        }

        <div class="actions">
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading">
            {{ loading ? 'Envoi...' : 'Ajouter' }}
          </button>
        </div>
      </form>

      @if (message) {
        <p class="success">{{ message }}</p>
      }

      @if (errorMessage) {
        <p class="error">{{ errorMessage }}</p>
      }
    </div>
  `
})
export class ResourceCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly resourceService = inject(ResourceService);

  protected loading = false;
  protected message = '';
  protected errorMessage = '';

  protected form = this.fb.nonNullable.group({
    type: ['LIVRE' as const, Validators.required],
    titre: ['', Validators.required],
    auteur: ['', Validators.required],
    anneePublication: [2024, [Validators.required, Validators.min(0)]],
    theme: ['', Validators.required],
    cautionExigee: [0, [Validators.required, Validators.min(0)]],
    emplacementCode: ['', Validators.required],
    emplacementLibelle: ['', Validators.required],
    nombreExemplaires: [1, [Validators.required, Validators.min(1)]],
    isbn: [''],
    numero: [0]
  });

  submit(): void {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    const value = this.form.getRawValue();
    const payload = value.type === 'LIVRE'
      ? { ...value, numero: undefined }
      : { ...value, isbn: undefined };

    this.resourceService.create(payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.message = 'Ressource ajoutée.';
          this.errorMessage = '';

          this.form.reset({
            type: 'LIVRE',
            titre: '',
            auteur: '',
            anneePublication: 2024,
            theme: '',
            cautionExigee: 0,
            emplacementCode: '',
            emplacementLibelle: '',
            nombreExemplaires: 1,
            isbn: '',
            numero: 0
          });
        },
        error: (error) => {
          this.message = '';
          this.errorMessage = error?.error?.message ?? 'Ajout impossible.';
        }
      });
  }
}