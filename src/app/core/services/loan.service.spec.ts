import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoanService } from './loan.service';
import { Emprunt } from '../models/models';
import { environment } from '../../../environments/environment';

describe('LoanService', () => {
  let service: LoanService;
  let httpMock: HttpTestingController;

  const mockEmprunt: Emprunt = { id: 1, utilisateurId: 42, ressourceId: 7 } as Emprunt;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanService]
    });

    service = TestBed.inject(LoanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get loans for a user', () => {
    const utilisateurId = 42;

    service.getMine(utilisateurId).subscribe(loans => {
      expect(loans.length).toBe(1);
      expect(loans[0]).toEqual(mockEmprunt);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/emprunts/utilisateur/${utilisateurId}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockEmprunt]);
  });

  it('should borrow a resource', () => {
    const utilisateurId = 42;
    const ressourceId = 7;

    service.borrow(utilisateurId, ressourceId).subscribe(loan => {
      expect(loan).toEqual(mockEmprunt);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/emprunts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ utilisateurId, ressourceId });
    req.flush(mockEmprunt);
  });

  it('should return a loan', () => {
    const empruntId = 1;

    service.returnLoan(empruntId).subscribe(result => {
      expect(result).toEqual(mockEmprunt);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/emprunts/retour`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ empruntId });
    req.flush(mockEmprunt);
  });

  it('should get late loans', () => {
    service.getLateLoans().subscribe(loans => {
      expect(loans).toEqual([mockEmprunt]);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/retards`);
    expect(req.request.method).toBe('GET');
    req.flush([mockEmprunt]);
  });
});