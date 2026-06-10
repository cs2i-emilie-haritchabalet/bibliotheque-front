import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResourceService } from './resource.service';
import { Ressource, RessourceCreateRequest } from '../models/models';
import { environment } from '../../../environments/environment';

describe('ResourceService', () => {
  let service: ResourceService;
  let httpMock: HttpTestingController;

  const mockRessource: Ressource = {
    id: 1,
    titre: 'Angular avancé',
    auteur: 'John Doe',
    anneePublication: 2023,
    theme: 'Informatique'
  } as Ressource;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResourceService]
    });

    service = TestBed.inject(ResourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search resources with criteria', () => {
    const criteria = { titre: 'Angular', auteur: null, anneePublication: null, theme: null };

    service.search(criteria).subscribe(results => {
      expect(results.length).toBe(1);
      expect(results[0].titre).toContain('Angular');
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/ressources/advanced-search`);
    expect(req.request.method).toBe('POST');
    req.flush([mockRessource]);
  });

  it('should get resource by id', () => {
    const resourceId = 1;

    service.getById(resourceId).subscribe(resource => {
      expect(resource).toEqual(mockRessource);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/ressources/${resourceId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRessource);
  });

  it('should create a resource', () => {
    const newResource: RessourceCreateRequest = {
      titre: 'Angular avancé',
      auteur: 'John Doe',
      anneePublication: 2023,
      theme: 'Informatique'
    } as RessourceCreateRequest;

    service.create(newResource).subscribe(resource => {
      expect(resource).toEqual(mockRessource);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/ressources`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newResource);
    req.flush(mockRessource);
  });
});