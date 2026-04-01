import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Inscription d’un utilisateur</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" class="grid grid-2">
        <div class="field"><label>Nom</label><input formControlName="nom"></div>
        <div class="field"><label>Prénom</label><input formControlName="prenom"></div>
        <div class="field"><label>Email</label><input type="email" formControlName="email"></div>
        <div class="field"><label>Mot de passe</label><input type="password" formControlName="motDePasse"></div>
        <div class="field">
          <label>Type utilisateur</label>
          <select formControlName="type">
            <option value="ETUDIANT">Étudiant</option>
            <option value="ENSEIGNANT">Enseignant</option>
            <option value="PARTICULIER">Particulier</option>
          </select>
        </div>
        <div class="field"><label>Caution disponible</label><input type="number" formControlName="cautionDisponible"></div>
        <div class="actions">
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Créer</button>
        </div>
      </form>
      @if (message) { <p class="success">{{ message }}</p> }
      @if (errorMessage) { <p class="error">{{ errorMessage }}</p> }
    </div>
  `
})
export class UserCreateComponent {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);

  protected message = '';
  protected errorMessage = '';

  protected form = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(6)]],
    type: ['ETUDIANT' as const, Validators.required],
    cautionDisponible: [0, [Validators.required, Validators.min(0)]]
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.userService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.message = 'Utilisateur créé.';
        this.errorMessage = '';
        this.form.reset({
          nom: '', prenom: '', email: '', motDePasse: '', type: 'ETUDIANT', cautionDisponible: 0
        });
      },
      error: (error) => {
        this.message = '';
        this.errorMessage = error?.error?.message ?? 'Création impossible.';
      }
    });
  }
}
