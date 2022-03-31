/// <reference types="cypress" />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/#/register')
  });

  it('should allow to register a new user', () => {
    const { email, password, username } = generateUser();

    cy.get('[placeholder = "Username"]')
      .type(username);

    cy.get('[placeholder = "Email"]')
      .type(email);

    cy.get('[placeholder = "Password"]')
      .type(password);

    cy.contains('.btn', 'Sign up')
      .click();

    cy.get('.swal-modal')
      .should('contain.text', 'Your registration was successful!')

    cy.url()
      .should('equal', Cypress.config().baseUrl + '/#/');
  });

  it('should not allow to register with  an existing email', () => {
    const { email, password, username } = generateUser();

    cy.request('POST', '/users', {
      email,
      username,
      password
    });

    cy.get('[placeholder = "Username"]')
      .type(username + '_new');

    cy.get('[placeholder = "Email"]')
      .type(email);

    cy.get('[placeholder = "Password"]')
      .type(password);

    cy.contains('.btn', 'Sign up')
      .click();

    cy.get('.swal-modal')
      .should('contain.text', 'Email already taken.')
  });
});
