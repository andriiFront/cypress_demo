/// <reference types="cypress" />

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  
  it('should have a correct title', () => {
    cy.get('h1').should('contain.text', 'Sign In');
  });

  it('should require an email', () => {
    cy.contains('.btn', 'Sign in').click();
    cy.get('.error-messages').should('contain.text', `email can't be blank`);
  });

  it('should require a password', () => {
    cy.findByPlaceholder('Email').type('user@mail.com' + '{enter}');
    cy.get('.error-messages').should('contain.text', `password can't be blank`);
  });

  it('should show an error for wrong email', () => {
    cy.registerNewUser().then(user => {
      cy.findByPlaceholder('Email').type('mail@mail.com');
      cy.findByPlaceholder('Password').type(user.password + '{enter}');
      cy.get('.error-messages').should('contain.text', 'email or password is invalid');
    });
  });

  it('should show an error for wrong password', () => {
    cy.registerNewUser().then(user => {
      cy.findByPlaceholder('Email').type(user.email);
      cy.findByPlaceholder('Password').type('123');
      cy.get('.error-messages').should('contain.text', 'email or password is invalid');
    });
  });

  it('should allow an existing user to log in', () => {
    cy.registerNewUser().then(user => {
      cy.findByPlaceholder('Email').type(user.email);
      cy.findByPlaceholder('Password').type(user.password + '{enter}');
      cy.assertPageUrl('/');
      cy.assertAthorized(user.username)
    });
  });
});
