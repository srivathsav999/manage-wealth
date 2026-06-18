/// <reference types="cypress" />

/**
 * Test Flow 4: Navigation
 * Verifies all navigation links are present and navigate correctly.
 */
describe("Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display all navigation links", () => {
    cy.get(".navbar-links").within(() => {
      cy.contains("Products").should("be.visible");
      cy.contains("Solutions").should("be.visible");
      cy.contains("Partners").should("be.visible");
      cy.contains("Company").should("be.visible");
      cy.contains("Resources").should("be.visible");
      cy.contains("Pricing").should("be.visible");
    });
  });

  it("should navigate to Products page", () => {
    cy.contains("a", "Products").click();
    cy.url().should("include", "/products");
    cy.go("back");
  });

  it("should navigate to Solutions page", () => {
    cy.contains("a", "Solutions").click();
    cy.url().should("include", "/solutions");
    cy.go("back");
  });

  it("should navigate to Partners page", () => {
    cy.contains("a", "Partners").click();
    cy.url().should("include", "/partners");
    cy.go("back");
  });

  it("should navigate to Company page", () => {
    cy.contains("a", "Company").click();
    cy.url().should("include", "/company");
    cy.go("back");
  });

  it("should navigate to Login page from navbar", () => {
    cy.get(".login-get-started").within(() => {
      cy.contains("Login").click();
    });
    cy.url().should("include", "/login");
  });

  it("should navigate to Register page from Get Started button", () => {
    cy.get(".login-get-started").within(() => {
      cy.contains("Get Started").click();
    });
    cy.url().should("include", "/register");
  });

  it("should display the app logo with correct text", () => {
    cy.get(".logo").should("be.visible").and("have.text", "Open");
  });
});
