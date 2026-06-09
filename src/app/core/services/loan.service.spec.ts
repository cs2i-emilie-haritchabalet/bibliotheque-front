import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoanService } from './loan.service';

describe('LoanService', () => {
  let service: LoanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanService],
    });

    service = TestBed.inject(LoanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user loans', () => {
    const mockLoans = [
      { id: 1, resourceTitle: 'Book 1', dueDate: '2025-02-15' },
      { id: 2, resourceTitle: 'Magazine 1', dueDate: '2025-02-20' },
    ];

    service.getUserLoans().subscribe(loans => {
      expect(loans.length).toBe(2);
      expect(loans[0].resourceTitle).toBe('Book 1');
    });

    const req = httpMock.expectOne('/api/loans');
    expect(req.request.method).toBe('GET');
    req.flush(mockLoans);
  });

  it('should borrow a resource', () => {
    const resourceId = 1;
    const mockResponse = { id: 1, resourceId, dueDate: '2025-02-15' };

    service.borrowResource(resourceId).subscribe(loan => {
      expect(loan.resourceId).toBe(1);
    });

    const req = httpMock.expectOne('/api/loans');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return a resource', () => {
    const loanId = 1;

    service.returnResource(loanId).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne(`/api/loans/${loanId}/return`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
