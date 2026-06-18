const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx}",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "spec, mocha-junit-reporter",
      mochaJunitReporterReporterOptions: {
        mochaFile: "cypress/results/test-results-[hash].xml",
        toConsole: true,
      },
    },
  },
});
