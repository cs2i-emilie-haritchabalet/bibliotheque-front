import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { LoginRequest, LoginResponse } from '../models/models';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storageSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageService', [
      'setAuth', 'clear', 'getAuth', 'getBasicToken', 'isLoggedIn'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: StorageService, useValue: storageSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login endpoint and store auth', () => {
    const credentials: LoginRequest = { email: 'test@example.com', motDePasse: 'password123' };
    const mockResponse: LoginResponse = { id: 1, nomComplet: 'Test User', email: 'test@example.com', role: 'UTILISATEUR', type: 'ETUDIANT' } as LoginResponse;

    service.login(credentials).subscribe(result => {
      expect(result).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(mockResponse);

    expect(storageSpy.setAuth).toHaveBeenCalledWith(mockResponse, credentials.email, credentials.motDePasse);
  });

  it('should call logout and clear storage', () => {
    service.logout();
    expect(storageSpy.clear).toHaveBeenCalled();
  });

  it('should return true when user is logged in', () => {
    storageSpy.isLoggedIn.and.returnValue(true);
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false when user is not logged in', () => {
    storageSpy.isLoggedIn.and.returnValue(false);
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return current user from storage', () => {
    const mockAuth = { id: 1, nomComplet: 'Test User', email: 'test@example.com', role: 'UTILISATEUR', type: 'ETUDIANT' } as LoginResponse;
    storageSpy.getAuth.and.returnValue(mockAuth);
    expect(service.currentUser()).toEqual(mockAuth);
  });

  it('should return true when user is bibliothecaire', () => {
    storageSpy.getAuth.and.returnValue({ role: 'BIBLIOTHECAIRE' } as LoginResponse);
    expect(service.isBibliothecaire()).toBeTrue();
  });

  it('should return false when user is not bibliothecaire', () => {
    storageSpy.getAuth.and.returnValue({ role: 'UTILISATEUR' } as LoginResponse);
    expect(service.isBibliothecaire()).toBeFalse();
  });
});