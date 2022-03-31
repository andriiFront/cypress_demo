/// <reference types="cypress" />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/register')
  });

  it('should allow to register a new user', () => {
    const randomNumber = Math.random().toString().slice(2);
    const userName = `test_user-${randomNumber}`;
    const email = `${userName}@mail.com`;

    cy.get('[placeholder = "Username"]')
      .type(userName);

    cy.get('[placeholder = "Email"]')
      .type(email);

    cy.get('[placeholder = "Password"]')
      .type('Test1234');

    cy.contains('.btn', 'Sign up')
      .click();

    cy.get('.swal-modal')
      .should('contain.text', 'Your registration was successful!')

    cy.url()
      .should('equal', Cypress.config().baseUrl + '/');
  });
});
