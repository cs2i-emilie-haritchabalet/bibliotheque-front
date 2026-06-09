import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with credentials', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'jwt-token', user: { id: 1, email: 'test@example.com' } };

    service.login(credentials).subscribe(result => {
      expect(result.token).toBe('jwt-token');
      expect(result.user.email).toBe('test@example.com');
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(mockResponse);
  });

  it('should logout', () => {
    service.logout().subscribe(() => {
      expect(service.isAuthenticated()).toBeFalsy();
    });

    const req = httpMock.expectOne('/api/auth/logout');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should check authentication status', () => {
    const isAuth = service.isAuthenticated();
    expect(typeof isAuth).toBe('boolean');
  });
});
