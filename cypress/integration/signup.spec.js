/// <reference types="cypress" />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/register')
  });

  it('should allow to register a new user', () => {
    const { email, password, username } = generateUser();

    cy.findByPlaceholder('Username')
      .type(username);

    cy.findByPlaceholder('Email')
      .type(email);

    cy.findByPlaceholder('Password')
      .type(password);

    cy.contains('.btn', 'Sign up')
      .click();

    cy.get('.swal-modal')
      .should('contain.text', 'Your registration was successful!')

    cy.assertPageUrl('/');
  });

  it('should not allow to register with  an existing email', () => {
    const { email, password, username } = generateUser();

    cy.request('POST', '/users', {
      email,
      username,
      password
    });

    cy.findByPlaceholder('Username')
      .type(username);

    cy.findByPlaceholder('Email')
      .type(email);

    cy.findByPlaceholder('Password')
      .type(password);

    cy.contains('.btn', 'Sign up')
      .click();

    cy.get('.swal-modal')
      .should('contain.text', 'Email already taken.')
  });
});
