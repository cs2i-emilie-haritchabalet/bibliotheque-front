import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoanService } from '../../core/services/loan.service';
import { AuthService } from '../../core/services/auth.service';
import { Emprunt } from '../../core/models/models';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  template: `
    <div class="card">
      <div class="page-title">
        <h2 style="margin: 0;">Mes emprunts</h2>
        <button class="btn btn-secondary" (click)="load()" [disabled]="loading">
          Actualiser
        </button>
      </div>

      @if (message) { <p class="success">{{ message }}</p> }
      @if (errorMessage) { <p class="error">{{ errorMessage }}</p> }

      @if (loading) {
        <div class="empty-state">Chargement...</div>
      } @else if (loans.length === 0) {
        <div class="empty-state">Aucun emprunt à afficher.</div>
      } @else {
        <table class="table">
          <thead>
            <tr>
              <th>Ressource</th>
              <th>Exemplaire</th>
              <th>Date emprunt</th>
              <th>Retour prévu</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (loan of loans; track loan.id) {
              <tr>
                <td>{{ loan.ressource }}</td>
                <td>{{ loan.codeBarres }}</td>
                <td>{{ loan.dateEmprunt }}</td>
                <td>{{ loan.dateRetourPrevue }}</td>
                <td>{{ loan.statut }}</td>
                <td>
                  @if (loan.statut !== 'RETOURNE') {
                    <button class="btn btn-primary" (click)="returnLoan(loan.id)">
                      Retourner
                    </button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `
})
export class MyLoansComponent implements OnInit {
  private readonly loanService = inject(LoanService);
  private readonly auth = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected loans: Emprunt[] = [];
  protected loading = false;
  protected message = '';
  protected errorMessage = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const userId = this.auth.currentUser()?.id;

    if (!userId) {
      this.loans = [];
      this.errorMessage = 'Utilisateur non chargé.';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.message = '';
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.loanService.getMine(userId).subscribe({
      next: (loans) => {
        this.loans = [...(loans ?? [])];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loans = [];
        this.loading = false;
        this.errorMessage = error?.error?.message ?? 'Chargement impossible.';
        this.cdr.detectChanges();
      }
    });
  }

  returnLoan(id: number): void {
    this.message = '';
    this.errorMessage = '';

    this.loanService.returnLoan(id).subscribe({
      next: () => {
        this.message = 'Retour enregistré.';
        this.cdr.detectChanges();
        this.load();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message ?? 'Retour impossible.';
        this.cdr.detectChanges();
      }
    });
  }
}