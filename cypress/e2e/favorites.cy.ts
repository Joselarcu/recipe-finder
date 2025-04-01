describe('Favorites Page', () => {
  beforeEach(() => {
    cy.visit('/favorites');
  });

  it('should display the favorites page title', () => {
    cy.get('h1').should('contain', 'My Favorite Recipes');
  });

  
}); 