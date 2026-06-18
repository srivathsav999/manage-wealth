/// <reference types="cypress" />

/**
 * Test Flow 2: User Registration
 * Verifies the registration form renders, accepts input, and validates.
 */
describe("Registration Page Tests", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("should display the registration form with correct title", () => {
    cy.get(".register-title")
      .should("be.visible")
      .and("have.text", "Create your account");

    cy.get(".register-subtitle")
      .should("be.visible")
      .and("contain.text", "Join thousands");
  });

  it("should have all required form fields", () => {
    cy.get("#name").should("be.visible").and("have.attr", "required");
    cy.get("#email").should("be.visible").and("have.attr", "required");
    cy.get("#password").should("be.visible").and("have.attr", "required");
  });

  it("should accept valid input in all form fields", () => {
    const uniqueEmail = `testuser_${Date.now()}@test.com`;

    cy.get("#name").type("Test User").should("have.value", "Test User");
    cy.get("#email").type(uniqueEmail).should("have.value", uniqueEmail);
    cy.get("#password")
      .type("TestPass123!")
      .should("have.value", "TestPass123!");
  });

  it("should display password requirements", () => {
    cy.get(".password-requirements")
      .should("be.visible")
      .and("contain.text", "8 characters");
  });

  it("should navigate to login page when clicking Sign In Instead", () => {
    cy.get(".login-button").click();
    cy.url().should("include", "/login");
  });

  it("should display footer with Terms and Privacy links", () => {
    cy.get(".register-footer")
      .should("be.visible")
      .and("contain.text", "Terms of Service")
      .and("contain.text", "Privacy Policy");
  });
});
