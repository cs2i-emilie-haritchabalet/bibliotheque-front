# Unit Testing Guide - Karma et Jasmine

## Configuration

Les tests unitaires utilisent **Karma** comme testeur et **Jasmine** comme framework de test.

## Commandes

### Exécuter les tests une seule fois
```bash
npm test
```

### Exécuter les tests en mode watch
```bash
npm run test:watch
```

### Génération de rapports de couverture
Les rapports de couverture sont générés automatiquement dans `coverage/`.

## Structure des tests

### Tests de services
Location: `src/app/core/services/*.spec.ts`

Exemple:
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

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

  it('should perform an action', () => {
    // Test code
  });
});
```

### Tests de composants
Location: `src/app/**/*.component.spec.ts`

Exemple:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Couverture de code

### Visualiser les rapports
```bash
# Ouvrir le rapport HTML
open coverage/index.html
```

### Métriques de couverture
- **Line Coverage**: Pourcentage de lignes exécutées
- **Branch Coverage**: Pourcentage de branches conditionnelles
- **Function Coverage**: Pourcentage de fonctions exécutées
- **Statement Coverage**: Pourcentage d'instructions exécutées

### Target de couverture
- **Ligne**: > 80%
- **Branche**: > 75%
- **Fonction**: > 80%
- **Déclaration**: > 80%

## Best Practices

1. **Test une chose à la fois**
   ```typescript
   it('should do one thing', () => {
     // Arrange
     const input = ...;
     
     // Act
     const result = component.method(input);
     
     // Assert
     expect(result).toBe(expected);
   });
   ```

2. **Utiliser des descriptions claires**
   ```typescript
   describe('LoginComponent', () => {
     it('should display error when login fails', () => {
       // Test
     });
   });
   ```

3. **Mocker les dépendances externes**
   ```typescript
   let mockService = jasmine.createSpyObj('Service', ['method']);
   TestBed.configureTestingModule({
     providers: [{ provide: Service, useValue: mockService }]
   });
   ```

## Fichiers de configuration

### karma.conf.js
Configure:
- Frameworks (Jasmine)
- Browsers (Chrome, ChromeHeadless)
- Coverage reporters
- Timeouts

### tsconfig.spec.json
Configure:
- Types (Jasmine)
- Fichiers de test à inclure

### src/test.ts
Point d'entrée pour les tests.

## Intégration CI/CD

Les tests s'exécutent automatiquement dans:
- GitHub Actions
- GitLab CI/CD

### Rapports en CI
- Coverage LCOV
- Coverage Cobertura
- JUnit XML

## Troubleshooting

### Chrome non trouvé en CI
```javascript
// Dans karma.conf.js
browsers: process.env.CI ? ['ChromeHeadlessCI'] : ['Chrome']
```

### Tests qui traînent
```typescript
// S'assurer que les timers sont nettoyés
afterEach(fakeAsync(() => {
  tick();
}));
```

### HTTP Requests non versées
```typescript
// Toujours vérifier les requêtes non réglées
afterEach(() => {
  httpMock.verify();
});
```
