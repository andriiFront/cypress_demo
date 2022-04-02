/// <reference types="cypress" />

describe('Settings page', () => {
  beforeEach(() => {
    cy.registerNewUser().then(user => {
      cy.request('POST', '/users/login', {
        user: {
          email: user.email,
          password: user.password
        }
      })
        .then(response => {
          cy.setCookie('drash_sess', response.body.user.token);
        });
    });
  });
});
