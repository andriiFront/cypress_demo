/// <reference types="cypress" />

const { type } = require("cypress/types/jquery");

describe('Sign in page', () => {
  it('should allow an existing user to log in', () => {
    cy.visit('/login');

    cy.registerNewUser().then(user => {
      cy.findByPlaceholder('Email')
        .type(user.email);

      cy.findByPlaceholder('Password')
        .type(user.password);

      cy.contains('button', 'Sign in')
        .click();

      cy.assertPageUrl('/');

      cy.findByTestId('header-username')
        .should('contain.text', user.username);
    });
  });
});
