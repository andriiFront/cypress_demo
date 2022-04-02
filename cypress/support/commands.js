// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { generateUser } = require('./generate');

Cypress.Commands.add('findByTestId', testId => {
  cy.get(`[data-cy = "${testId}]`)
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder = "${placeholder}"]`);
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn('/#' + url, options);
});

Cypress.Commands.add('registerNewUser', () => {
  const user = generateUser();

  cy.request('POST', '/users', user)
    .then(response => ({
      ...response.body.user,
      ...user 
    }));
});

Cypress.Commands.add('assertPageUrl', (url) => {
  cy.url()
    .should('equal', Cypress.config().baseUrl + '/#' + url);
});

Cypress.Commands.add('assertAthorized', (username) => {
  cy.findByTestId()
    .should('contain.text', username);
});




