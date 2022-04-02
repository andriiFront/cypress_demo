/// <reference types="cypress" />

const { generateUser } = require("../support/generate");

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/register')
  });

  it('should have a correct title', () => {
    cy.get('h1').should('contain.text', 'Sign Up');
  });

  it('should require an username', () => {
    cy.contains('.btn', 'Sign in').click();
    cy.get('.error-messages').should('contain.text', `username can't be blank`);
  });

  it('should require an email', () => {
    cy.findByPlaceholder('Username').type('user' + '{enter}');
    cy.get('.error-messages').should('contain.text', `email can't be blank`);
  });

  it('should require a password', () => {
    cy.findByPlaceholder('Username').type('user');
    cy.findByPlaceholder('Username').type('user@mail.com' + '{enter}');
    cy.get('.error-messages').should('contain.text', `password can't be blank`);
  });

  it('should allow to register a new user', () => {
    const { email, password, username } = generateUser();

    cy.findByPlaceholder('Username').type(username);
    cy.findByPlaceholder('Email').type(email);
    cy.findByPlaceholder('Password').type(password);
    cy.contains('.btn', 'Sign up').click();

    cy.get('.swal-modal')
      .should('contain.text', 'Your registration was successful!')

    cy.assertPageUrl('/');
    cy.assertAthorized(username);
  });

  it('should require a unique email', () => {
    cy.registerNewUser().then(user => {
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.contains('.btn', 'Sign in').click();
      cy.get('/swal-modal').should('contain.text', 'Email already taken.');
    });
  });
});
