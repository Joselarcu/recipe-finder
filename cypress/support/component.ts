import { mount } from 'cypress/angular';

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      login(email: string, password: string): Chainable<void>;
      addToFavorites(): Chainable<void>;
      dismiss(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('mount', mount); 