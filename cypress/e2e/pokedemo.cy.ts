describe('Pokedemo - Load and Search Pokemon', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 15000 });
  });

  it('should display the search component', () => {
    cy.get('app-poke-search', { timeout: 10000 }).should('be.visible');
  });

  it('should have form fields visible', () => {
    // Check for the mat-form-field elements in search component
    cy.get('mat-form-field', { timeout: 10000 }).should('have.length.greaterThan', 2);
  });

  it('should have input for pokemon ID', () => {
    cy.get('input[matInput][type="number"]', { timeout: 10000 }).first().should('exist');
  });

  it('should have mat-select dropdown for pokemon selection', () => {
    cy.get('mat-select#pokemon', { timeout: 10000 }).should('exist');
  });

  it('should have readonly ID display field', () => {
    cy.get('input[matInput][readonly]', { timeout: 10000 }).should('exist');
  });

  it('should have name filter input', () => {
    cy.get('input[matInput][type="text"]', { timeout: 10000 }).should('exist');
  });

  it('should render page container', () => {
    cy.get('.page-container', { timeout: 10000 }).should('exist').should('be.visible');
  });
});
