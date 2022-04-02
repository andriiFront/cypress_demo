/// <reference types="cypress" />

describe('Settings page', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.intercept('POST', '/user/login').as('/login');

    cy.registerNewUser().then(user => {
      cy.findByPlaceholder('Email')
        .type(user.email);

      cy.findByPlaceholder('Password')
        .type(user.password + '{enter}')
    });

    cy.wait('@login');

    cy.visit('/settings');
  });
});
