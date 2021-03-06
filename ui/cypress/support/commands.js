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
Cypress.Commands.add("login", (email, password) => {
    cy.visit("/");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#login").click();
    cy.url().should("contain", "/my-bills");
});

Cypress.Commands.add("adminLogin", (email, password) => {
    cy.visit("/");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#login").click();
    cy.url().should("contain", "/view-users");
});

Cypress.Commands.add("signOut", () => {
    cy.visit("/");
    cy.get("#profile").click();
    cy.get("#signOut").click();
    cy.url().should("contain", "/login");
});
