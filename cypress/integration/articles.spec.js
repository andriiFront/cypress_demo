/// <reference types="cypress" />

describe('Articles', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.loginAsNewUser();
  });

  it('should allow to create a new article', () => {
    cy.visit('/editor');

    cy.findByTestId('aticle-title')
      .type('First article')
      .type('{enter}');

    cy.assertPageUrl('/articles/first-article');
    cy.visit('/');
    cy.findByTestId('article').should('have.length', 1);
  });
});
