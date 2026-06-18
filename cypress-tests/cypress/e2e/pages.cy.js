/// <reference types="cypress" />

/**
 * Test Flow 6: Page Content Verification
 * Verifies that all major pages load correctly with expected content.
 */
describe("Page Content Verification Tests", () => {
  it("should load Products page with content", () => {
    cy.visit("/products");
    cy.url().should("include", "/products");
    cy.get("body").should("not.be.empty");
    cy.get(".navbar").should("be.visible");
  });

  it("should load Solutions page with content", () => {
    cy.visit("/solutions");
    cy.url().should("include", "/solutions");
    cy.get("body").should("not.be.empty");
    cy.get(".navbar").should("be.visible");
  });

  it("should load Partners page with content", () => {
    cy.visit("/partners");
    cy.url().should("include", "/partners");
    cy.get("body").should("not.be.empty");
    cy.get(".navbar").should("be.visible");
  });

  it("should load Company page with content", () => {
    cy.visit("/company");
    cy.url().should("include", "/company");
    cy.get("body").should("not.be.empty");
    cy.get(".navbar").should("be.visible");
  });

  it("should load Resources page with content", () => {
    cy.visit("/resources");
    cy.url().should("include", "/resources");
    cy.get("body").should("not.be.empty");
    cy.get(".navbar").should("be.visible");
  });

  it("should navigate between pages seamlessly", () => {
    // Start at home
    cy.visit("/");
    cy.get(".main-heading").should("have.text", "Simplifying Business Banking");

    // Navigate to login
    cy.visit("/login");
    cy.get(".login-title").should("have.text", "Welcome back");

    // Navigate to register
    cy.visit("/register");
    cy.get(".register-title").should("have.text", "Create your account");

    // Navigate back to home
    cy.visit("/");
    cy.get(".main-heading").should("have.text", "Simplifying Business Banking");
  });
});
