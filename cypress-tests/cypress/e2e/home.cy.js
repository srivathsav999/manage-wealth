/// <reference types="cypress" />

/**
 * Test Flow 1: Home Page
 * Verifies the home page loads correctly with all expected elements.
 */
describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the main heading", () => {
    cy.get(".main-heading")
      .should("be.visible")
      .and("have.text", "Simplifying Business Banking");
  });

  it("should display the subheading with seamless banking text", () => {
    cy.get(".subheading")
      .should("be.visible")
      .and("contain.text", "seamless banking");
  });

  it("should display the CTA button linking to register", () => {
    cy.get(".cta-button")
      .should("be.visible")
      .and("have.text", "Get Started Now")
      .and("have.attr", "href", "/register");
  });

  it("should display partner logos in the logo bar", () => {
    cy.get(".logo-bar").should("be.visible");
    cy.get(".partner-logo").should("have.length.at.least", 4);
  });

  it("should display the navigation bar with logo", () => {
    cy.get(".navbar").should("be.visible");
    cy.get(".logo").should("have.text", "Open");
  });

  it("should navigate to register page when clicking Get Started Now", () => {
    cy.get(".cta-button").click();
    cy.url().should("include", "/register");
  });
});
