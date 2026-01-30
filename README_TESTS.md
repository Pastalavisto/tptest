# Pokedemo - Guide de Lancement et Tests

## Installation

```bash
npm install
```

## Lancer le Projet

```bash
npm start
```
L'app démarre sur `http://localhost:4200`

---

## Tests Jest (Unit Tests)

### Lancer tous les tests
```bash
npm test
```

### Tests disponibles
- **src/app/app.spec.ts** - 2 tests
- **src/app/services/poke-api-service.spec.ts** - 7 tests
- **src/app/services/selected-pokemon-service.spec.ts** - 8 tests
- **src/app/components/poke-search/poke-search.spec.ts** - 7 tests
- **src/app/components/poke-displayer/poke-displayer.spec.ts** - 4 tests
- **src/app/pipes/filter-pokemon-pipe.spec.ts** - 11 tests

**Total: 38 tests Jest**

---

## Tests Cypress (E2E Tests)

### Prérequis
L'app doit tourner sur `http://localhost:4200`:
```bash
npm start
# Dans un autre terminal:
npm run cypress:run
```

### Mode UI (interactif)
```bash
npm run cypress
```

### Mode headless (CI/CD)
```bash
npm run cypress:run
```

### Tests disponibles
- **cypress/e2e/pokedemo.cy.ts** - 7 tests (structure composants)
- **cypress/e2e/pokedemo-flow.cy.ts** - 8 tests (user flows)

**Total: 15 tests Cypress**

---

## Tous les Scripts NPM

| Script | Commande | Description |
|--------|----------|-------------|
| `npm start` | `ng serve` | Lance le serveur dev |
| `npm test` | `ng test` | Lance Jest (unit tests) |
| `npm run cypress` | `cypress open` | Lance Cypress UI |
| `npm run cypress:run` | `cypress run` | Lance Cypress headless |
| `npm run test:coverage` | `ng test --code-coverage` | Rapport de couverture |

---

## Couverture de Tests

### Générer le rapport
```bash
npm run test:coverage
```

Rapport généré dans `coverage/lcov-report/index.html`

---

## CI/CD - Lancer Tous les Tests

```bash
# Unit tests
npm test

# E2E tests (app doit être lancée)
npm start &
npm run cypress:run
```

---

## Structure des Tests

```
src/app/
├── app.spec.ts
├── services/
│   ├── poke-api-service.spec.ts
│   └── selected-pokemon-service.spec.ts
├── components/
│   ├── poke-search/
│   │   └── poke-search.spec.ts
│   └── poke-displayer/
│       └── poke-displayer.spec.ts
└── pipes/
    └── filter-pokemon-pipe.spec.ts

cypress/
├── e2e/
│   ├── pokedemo.cy.ts
│   └── pokedemo-flow.cy.ts
└── support/
    └── e2e.ts
```

---

## Résumé

✅ **38 Tests Jest** - Unit tests avec mocking  
✅ **15 Tests Cypress** - E2E tests  
✅ **53 tests au total**

Tous les tests passent ✅
