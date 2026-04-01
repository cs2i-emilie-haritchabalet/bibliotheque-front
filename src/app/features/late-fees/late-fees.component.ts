import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoanService } from '../../core/services/loan.service';
import { Emprunt } from '../../core/models/models';

@Component({
  selector: 'app-late-fees',
  standalone: true,
  template: `
    <div class="card">
      <div class="page-title">
        <h2 style="margin: 0;">Suivi des retards et relances</h2>
        <button class="btn btn-secondary" type="button" (click)="load()">Actualiser</button>
      </div>

      @if (message) { <p class="success">{{ message }}</p> }
      @if (errorMessage) { <p class="error">{{ errorMessage }}</p> }

      @if (loans.length === 0) {
        <div class="empty-state">Aucun retard détecté.</div>
      } @else {
        <table class="table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Ressource</th>
              <th>Date prévue</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (loan of loans; track loan.id) {
              <tr>
                <td>{{ loan.utilisateur }}</td>
                <td>{{ loan.ressource }}</td>
                <td>{{ loan.dateRetourPrevue }}</td>
                <td>{{ loan.statut }}</td>
                <td>
                  <button class="btn btn-primary" type="button" (click)="sendReminder(loan.id)">
                    Envoyer relance
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `
})
export class LateFeesComponent implements OnInit {
  private readonly loanService = inject(LoanService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected loans: Emprunt[] = [];
  protected message = '';
  protected errorMessage = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loanService.getLateLoans().subscribe({
      next: (loans) => {
        this.loans = loans;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loans = [];
        this.errorMessage = 'Impossible de charger les emprunts en retard.';
        this.cdr.detectChanges();
      }
    });
  }

  sendReminder(id: number): void {
  this.message = '';
  this.errorMessage = '';

  this.loanService.sendReminder(id).subscribe({
    next: (response) => {
      this.message = response.message;
      this.cdr.detectChanges();
    },
    error: (error) => {
      this.errorMessage =
        error?.error?.message ?? 'Relance impossible.';
      this.cdr.detectChanges();
    }
  });
}
}