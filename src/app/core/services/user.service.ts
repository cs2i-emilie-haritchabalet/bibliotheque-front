import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisateurCreateRequest, Utilisateur } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiBaseUrl}/utilisateurs`;

  create(payload: UtilisateurCreateRequest): Observable<unknown> {
    return this.http.post(this.api, payload);
  }

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.api);
  }

 creditCaution(userId: number, montant: number): Observable<void> {
  return this.http.patch<void>(`${this.api}/${userId}/credit-caution`, { montant });
}

debitCaution(userId: number, montant: number): Observable<void> {
  return this.http.patch<void>(`${this.api}/${userId}/debit-caution`, { montant });
}
}