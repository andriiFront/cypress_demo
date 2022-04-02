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

  it('should not allow to register with an existing email', () => {
    cy.registerNewUser().then(user => {
      cy.findByPlaceholder('Username')
      .type(user.username);

      cy.findByPlaceholder('Email')
        .type(user.email);

      cy.findByPlaceholder('Password')
        .type(user.password);

      cy.contains('.btn', 'Sign up')
        .click();

      cy.get('.swal-modal')
        .should('contain.text', 'Email already taken.');
    });
  });
});
