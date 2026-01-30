describe('Pokedemo - Complete User Flow', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 15000 });
  });

  describe('Pokemon Search Component Tests', () => {
    it('should display the main search component', () => {
      cy.get('app-poke-search', { timeout: 10000 }).should('be.visible');
    });

    it('should have all form fields available', () => {
      cy.get('mat-form-field', { timeout: 10000 }).should('have.length', 4);
    });

    it('should have ID input field', () => {
      cy.get('input[matInput][type="number"]', { timeout: 10000 }).first().clear().type('1');
      cy.get('input[matInput][type="number"]', { timeout: 10000 }).first().should('have.value', '1');
    });
  });

  describe('Pokemon Display Component Tests', () => {
    it('should render page components correctly', () => {
      // Page container and main components should exist
      cy.get('.page-container', { timeout: 10000 }).should('be.visible');
      cy.get('app-poke-search', { timeout: 10000 }).should('be.visible');
    });
  });

  describe('Form Fields Validation', () => {
    it('should allow typing in name filter text input', () => {
      cy.get('input[matInput][type="text"]', { timeout: 10000 })
        .type('bulbasaur', { force: true });
      cy.get('input[matInput][type="text"]')
        .should('have.value', 'bulbasaur');
    });

    it('should have readonly display field', () => {
      cy.get('input[matInput][readonly]', { timeout: 10000 })
        .should('have.attr', 'readonly');
    });
  });

  describe('Page Structure Tests', () => {
    it('should render page container div', () => {
      cy.get('.page-container', { timeout: 10000 }).should('be.visible');
    });

    it('should have router outlet', () => {
      cy.get('router-outlet', { timeout: 10000 }).should('exist');
    });
  });
});
