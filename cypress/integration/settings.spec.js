/// <reference types="cypress" />

describe('Settings page', () => {
  beforeEach(() => {
    cy.registerNewUser().then(user => {
      cy.login(user).then(() => user);
    })
      .as('user');

    cy.visit('/settings');
  });

  it('should have a correct title', () => {
    cy.get('h1').should('contain.text', 'Your Setings')
  });

  it('should have a username and email in the form', function() {
    cy.findByPlaceholder('Your username')
      .should('have.value', this.user.username);

    cy.findByPlaceholder('Email')
      .should('have.value', this.user.email);
  });
});
