import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Utilisateur } from '../../core/models/models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card">
      <div class="page-title">
        <h2 style="margin: 0;">Gestion des utilisateurs</h2>
        <button class="btn btn-secondary" type="button" (click)="load()" [disabled]="loading">Actualiser</button>
      </div>

      <div class="filters" style="display:flex; gap:12px; flex-wrap:wrap; margin: 16px 0;">
        <input
          type="text"
          [(ngModel)]="search"
          placeholder="Nom, prénom ou email"
          class="input"
        />

        <select [(ngModel)]="typeFilter" class="input">
          <option value="">Tous les types</option>
          <option value="ETUDIANT">Étudiant</option>
          <option value="ENSEIGNANT">Enseignant</option>
          <option value="PARTICULIER">Particulier</option>
          <option value="BIBLIOTHECAIRE">Bibliothécaire</option>
        </select>

        <select [(ngModel)]="activeFilter" class="input">
          <option value="">Tous</option>
          <option value="true">Actifs</option>
          <option value="false">Inactifs</option>
        </select>

        <button class="btn btn-primary" type="button" (click)="applyFilters()">Filtrer</button>
      </div>

      @if (message) { <p class="success">{{ message }}</p> }
      @if (errorMessage) { <p class="error">{{ errorMessage }}</p> }

      @if (loading) {
        <div class="empty-state">Chargement...</div>
      } @else if (filteredUsers.length === 0) {
        <div class="empty-state">Aucun utilisateur trouvé.</div>
      } @else {
        <table class="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Type</th>
              <th>Actif</th>
              <th>Caution</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (user of filteredUsers; track user.id) {
              <tr>
                <td>{{ user.prenom }} {{ user.nom }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.type }}</td>
                <td>{{ user.actif ? 'Oui' : 'Non' }}</td>
                <td>{{ user.cautionDisponible }} €</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    [(ngModel)]="amounts[user.id]"
                    class="input"
                    style="width: 100px;"
                  />
                </td>
                <td style="display:flex; gap:8px;">
                  <button class="btn btn-primary" type="button" (click)="credit(user.id)">Créditer</button>
                  <button class="btn btn-danger" type="button" (click)="debit(user.id)">Débiter</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected users: Utilisateur[] = [];
  protected filteredUsers: Utilisateur[] = [];
  protected loading = false;
  protected message = '';
  protected errorMessage = '';

  protected search = '';
  protected typeFilter = '';
  protected activeFilter = '';

  protected amounts: Record<number, number> = {};

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.message = '';
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.users = [];
        this.filteredUsers = [];
        this.loading = false;
        this.errorMessage = error?.error?.message ?? 'Chargement impossible.';
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    const search = this.search.trim().toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const matchesSearch =
        !search ||
        user.nom.toLowerCase().includes(search) ||
        user.prenom.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesType =
        !this.typeFilter || user.type === this.typeFilter;

      const matchesActive =
        this.activeFilter === '' ||
        String(user.actif) === this.activeFilter;

      return matchesSearch && matchesType && matchesActive;
    });

    this.cdr.detectChanges();
  }

  credit(userId: number): void {
    const amount = Number(this.amounts[userId] ?? 0);

    if (amount <= 0) {
      this.errorMessage = 'Le montant doit être supérieur à 0.';
      this.message = '';
      this.cdr.detectChanges();
      return;
    }

    this.message = '';
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.userService.creditCaution(userId, amount).subscribe({
      next: () => {
        this.message = 'Caution créditée.';
        this.load();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message ?? 'Opération impossible.';
        this.cdr.detectChanges();
      }
    });
  }

  debit(userId: number): void {
    const amount = Number(this.amounts[userId] ?? 0);

    if (amount <= 0) {
      this.errorMessage = 'Le montant doit être supérieur à 0.';
      this.message = '';
      this.cdr.detectChanges();
      return;
    }

    this.message = '';
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.userService.debitCaution(userId, amount).subscribe({
      next: () => {
        this.message = 'Caution débitée.';
        this.load();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message ?? 'Opération impossible.';
        this.cdr.detectChanges();
      }
    });
  }
}