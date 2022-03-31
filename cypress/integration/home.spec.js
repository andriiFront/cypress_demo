/// <reference types="cypress" />

describe('My first test', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should contain main parts', () => {
    cy.get('h1')
      .should('contain.text', 'conduit');

    cy.contains('a', 'Global Feed')
      .should('exist');

    cy.contains('.sidebar', 'Popular Tags')
      .should('exist');
  });

  it('should open Sign In page', () => {
    cy.contains('a', 'Sign in')
      .should('exist')
      .click();

    cy.url()
      .should('include', '/login');

    cy.get('h1')
      .should('contain.text', 'Sign In');
  });

  it('should open Sign Up page', () => {
    cy.contains('a', 'Sign up')
      .should('exist')
      .click();

    cy.url()
      .should('include', '/register');

    cy.get('h1')
      .should('contain.text', 'Sign Up')
  });
});
