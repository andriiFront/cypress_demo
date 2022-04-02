/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable <Subject> {
    findByTestId(testId: string): Chainable<any>
    findByPlaceholder(placeholder: string): Chainable<any>
    assertPageUrl(url: string): Chainable<any>
    assertAthorized(username: string): Chainable<any>
    registerNewUser(): Chainable<any>
  }
}
