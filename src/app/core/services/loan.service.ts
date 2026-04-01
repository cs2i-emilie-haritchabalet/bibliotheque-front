import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly http = inject(HttpClient);

  getMine(utilisateurId: number): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${environment.apiBaseUrl}/emprunts/utilisateur/${utilisateurId}`);
  }

  borrow(utilisateurId: number, ressourceId: number): Observable<Emprunt> {
    return this.http.post<Emprunt>(`${environment.apiBaseUrl}/emprunts`, { utilisateurId, ressourceId });
  }

  returnLoan(empruntId: number): Observable<Emprunt> {
    return this.http.post<Emprunt>(`${environment.apiBaseUrl}/emprunts/retour`, { empruntId });
  }

  getLateLoans(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${environment.apiBaseUrl}/retards`);
  }

  sendReminder(id: number) {
  return this.http.post<{ message: string }>(
    `/api/retards/${id}/relance`,
    {}
  );
}
}
