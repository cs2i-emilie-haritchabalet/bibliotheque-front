import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  let service: ResourceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResourceService],
    });

    service = TestBed.inject(ResourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch resources', () => {
    const mockResources = [
      { id: 1, title: 'Book 1', type: 'BOOK' },
      { id: 2, title: 'Magazine 1', type: 'MAGAZINE' },
    ];

    service.getResources().subscribe(resources => {
      expect(resources.length).toBe(2);
      expect(resources[0].title).toBe('Book 1');
    });

    const req = httpMock.expectOne('/api/resources');
    expect(req.request.method).toBe('GET');
    req.flush(mockResources);
  });

  it('should search resources', () => {
    const searchTerm = 'Angular';
    const mockResults = [
      { id: 1, title: 'Angular Guide', type: 'BOOK' },
    ];

    service.search(searchTerm).subscribe(results => {
      expect(results.length).toBe(1);
      expect(results[0].title).toContain('Angular');
    });

    const req = httpMock.expectOne(`/api/resources/search?q=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });

  it('should create a resource', () => {
    const newResource = { title: 'New Book', type: 'BOOK', author: 'Author' };
    const mockResponse = { id: 1, ...newResource };

    service.createResource(newResource).subscribe(resource => {
      expect(resource.id).toBe(1);
      expect(resource.title).toBe('New Book');
    });

    const req = httpMock.expectOne('/api/resources');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should delete a resource', () => {
    const resourceId = 1;

    service.deleteResource(resourceId).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne(`/api/resources/${resourceId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
