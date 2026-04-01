import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container" style="max-width: 480px; padding-top: 4rem;">
      <div class="card">
        <h1>Connexion</h1>
        <p style="color: var(--muted);">Connecte-toi avec un compte utilisateur ou bibliothécaire.</p>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <div class="field">
            <label>Email</label>
            <input type="email" formControlName="email">
          </div>

          <div class="field">
            <label>Mot de passe</label>
            <input type="password" formControlName="motDePasse">
          </div>

          @if (errorMessage) {
            <div class="error">{{ errorMessage }}</div>
          }

          <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--border);">
        <div style="font-size: .95rem; color: var(--muted);">
          <div><strong>Démo bibliothécaire</strong> : admin@biblio.fr / admin123</div>
          <div><strong>Démo utilisateur</strong> : alice@etu.fr / alice123</div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected loading = false;
  protected errorMessage = '';

  protected form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required]]
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/recherche']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.message ?? 'Échec de connexion.';
      }
    });
  }
}
