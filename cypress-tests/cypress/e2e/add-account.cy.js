/// <reference types="cypress" />

/**
 * Test Flow 5: Add Account Form
 * Verifies the Add Account form loads and can be filled with valid data.
 */
describe("Add Account Form Tests", () => {
  beforeEach(() => {
    cy.visit("/AddAccountForm");
  });

  it("should display the form with correct title", () => {
    cy.get(".form-title")
      .should("be.visible")
      .and("have.text", "Account Details");

    cy.get(".form-subtitle")
      .should("be.visible")
      .and("contain.text", "Fill in your bank account information");
  });

  it("should display the sidebar with instructions", () => {
    cy.get(".sidebar-title")
      .should("be.visible")
      .and("have.text", "Add Your Bank Account");

    cy.get(".sidebar-text").should("be.visible");
    cy.get(".requirements-list").should("be.visible");
    cy.get(".requirements-list li").should("have.length", 4);
  });

  it("should have Account Type dropdown with all options", () => {
    cy.get("#accountType").should("be.visible");
    cy.get("#accountType option").should("have.length.at.least", 8);

    // Verify specific account types exist
    cy.get("#accountType").select("Savings Account");
    cy.get("#accountType").should("have.value", "Savings Account");
  });

  it("should have Bank Name dropdown with all options", () => {
    cy.get("#bankName").should("be.visible");
    cy.get("#bankName option").should("have.length.at.least", 11);

    // Verify specific banks exist
    cy.get("#bankName").select("HDFC Bank");
    cy.get("#bankName").should("have.value", "HDFC Bank");
  });

  it("should accept input in Account Holder Name and Account Number fields", () => {
    cy.get("#accountHolderName")
      .type("John Doe")
      .should("have.value", "John Doe");

    cy.get("#accountNumber")
      .type("1234567890")
      .should("have.value", "1234567890");
  });

  it("should have a submit button labeled Add Account", () => {
    cy.get(".submit-button")
      .should("be.visible")
      .and("have.text", "Add Account")
      .and("have.attr", "type", "submit");
  });

  it("should be able to fill the complete form", () => {
    cy.get("#accountType").select("Current Account");
    cy.get("#bankName").select("ICICI Bank");
    cy.get("#accountHolderName").type("Jane Smith");
    cy.get("#accountNumber").type("9876543210");

    // Verify all fields are filled
    cy.get("#accountType").should("have.value", "Current Account");
    cy.get("#bankName").should("have.value", "ICICI Bank");
    cy.get("#accountHolderName").should("have.value", "Jane Smith");
    cy.get("#accountNumber").should("have.value", "9876543210");
  });
});
