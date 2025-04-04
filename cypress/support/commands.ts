// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="password-input"]').type(password);
  cy.get('[data-cy="login-button"]').click();
});

// -- This is a child command --
Cypress.Commands.add('addToFavorites', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).find('[data-cy="favorite-button"]').click();
});

// -- This is a dual command --
Cypress.Commands.add('dismiss', { prevSubject: 'optional' }, (subject) => {
  if (subject) {
    cy.wrap(subject).find('[data-cy="dismiss-button"]').click();
  } else {
    cy.get('[data-cy="dismiss-button"]').click();
  }
});

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }) 