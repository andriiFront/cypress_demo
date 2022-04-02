/// <reference types="cypress" />

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a correct title', () => {
    cy.get('h1').should('contain.text', 'conduit');
  });

  it('should have a feed', () => {
    cy.contains('a', 'Global Feed').should('exist');
  });

  it('should have a sidebar with tags', () => {
    cy.contains('.sidebar', 'Popular Tags').should('exist');
  });

  it('should have a link to Sign in page', () => {
    cy.contains('a', 'Sign in')
      .should('have.attr', 'href', '#/login')
  });
 
  it('should have a link to Sign up page', () => {
    cy.contains('a', 'Sign up')
      .should('have.attr', 'href', '#/register')
  });
});
