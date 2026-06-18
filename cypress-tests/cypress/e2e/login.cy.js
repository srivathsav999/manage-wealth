/// <reference types="cypress" />

/**
 * Test Flow 3: User Login
 * Verifies the login form renders, accepts input, and handles validation.
 */
describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display the login form with correct title and subtitle", () => {
    cy.get(".login-title")
      .should("be.visible")
      .and("have.text", "Welcome back");

    cy.get(".login-subtitle")
      .should("be.visible")
      .and("have.text", "Enter your credentials to access your account");
  });

  it("should have email and password input fields with correct types", () => {
    cy.get("#email")
      .should("be.visible")
      .and("have.attr", "type", "email")
      .and("have.attr", "required");

    cy.get("#password")
      .should("be.visible")
      .and("have.attr", "type", "password")
      .and("have.attr", "required");
  });

  it("should accept valid input in email and password fields", () => {
    cy.get("#email")
      .type("test@example.com")
      .should("have.value", "test@example.com");

    cy.get("#password")
      .type("password123")
      .should("have.value", "password123");
  });

  it("should have a Remember Me checkbox that toggles", () => {
    cy.get("#remember").should("not.be.checked");
    cy.get("#remember").check().should("be.checked");
    cy.get("#remember").uncheck().should("not.be.checked");
  });

  it("should display the Sign In button", () => {
    cy.get(".login-button")
      .should("be.visible")
      .and("have.text", "Sign In");
  });

  it("should have Sign Up and Forgot Password links in footer", () => {
    cy.get(".login-footer").within(() => {
      cy.contains("Don't have an account?").should("be.visible");
      cy.get('a[href="/register"]')
        .should("be.visible")
        .and("have.text", "Sign up");
      cy.contains("Forgot your password?").should("be.visible");
    });
  });

  it("should display the Open logo", () => {
    cy.get(".login-logo")
      .should("be.visible")
      .and("have.text", "Open");
  });
});
