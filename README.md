# Manage Money - Full-Stack Business Finance Management System

A comprehensive web application for businesses to manage their finances, including cash flow, receivables, payables, banking, and financial analytics. This project features a modern frontend, a robust backend with RESTful APIs, and end-to-end automated testing.

## 📂 Project Structure

```
manage-money/
├── server-main/              # Backend server (Node.js/Express)
│   ├── api/                  # API routes and controllers
│   │   ├── transactions.js
│   │   ├── invoices.js
│   │   ├── dashboard.js
│   │   └── ...
│   ├── models/               # Mongoose schemas
│   ├── utils/                # Utility functions
│   ├── server.js             # Express server entry point
│   ├── Jenkinsfile           # Backend Jenkins pipeline
│   └── package.json
│
├── client/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # API service layer
│   │   ├── pages/            # Page components
│   │   └── ...
│   ├── Jenkinsfile           # Frontend Jenkins pipeline
│   └── package.json
│
├── selenum_demo/             # Selenium test automation
│   ├── src/test/java/       # Test classes (Java)
│   ├── src/main/java/       # Page object models
│   ├── pom.xml               # Maven configuration
│   └── Jenkinsfile           # Selenium Jenkins pipeline
│
├── cypress-tests/            # Cypress test automation
│   ├── cypress/test/        # E2E test files (JavaScript)
│   ├── cypress/pages/       # Page object models
│   ├── Jenkinsfile           # Cypress Jenkins pipeline
│   └── package.json
│
└── Jenkinsfile               # Main Jenkins pipeline (orchestrates all stages)
```

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Java** (v8 or higher for Selenium tests)
- **Maven** (v3.6 or higher for Selenium tests)

### 1. Backend Setup

```bash
cd server-main
npm install
```

Create a `.env` file in the `server-main` directory:

```env
MONGO_URI=mongodb://localhost:27017/manage_money_dev
PORT=8090
```

Start the backend server:

```bash
npm start
```

### 2. Frontend Setup

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 3. Selenium Tests Setup

```bash
cd selenum_demo
mvn clean install
```

### 4. Cypress Tests Setup

```bash
cd cypress-tests
npm install
```

## 🚀 Running Tests

### Run all tests (Jenkins)

Jenkins pipelines are already configured in each module and the root `Jenkinsfile`.

- **Main Jenkins Pipeline:** Triggers all stages sequentially
- **Backend Jenkinsfile:** Runs only backend tests
- **Frontend Jenkinsfile:** Runs only frontend tests
- **Selenium Jenkinsfile:** Runs only Selenium tests
- **Cypress Jenkinsfile:** Runs only Cypress tests

### Run individual test types (local)

**Backend Tests**
```bash
cd server-main
npm test
```

**Frontend Tests (Playwright)**
```bash
cd client
npm test
```

**Selenium Tests (Java)**
```bash
cd selenum_demo
mvn test -Dheadless=true
```

**Cypress Tests (E2E)**
```bash
cd cypress-tests
npx cypress run --browser chrome
```

## 🏗️ Technologies Used

### Backend (server-main)

- **Framework:** Node.js + Express.js
- **Database:** MongoDB
- **ORM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi
- **Testing:** Mocha, Chai, Supertest

### Frontend (client)

- **Framework:** React + Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **Testing:** Playwright
- **HTTP Client:** Axios

### Test Automation

- **Selenium:** Java + TestNG (for cross-browser web testing)
- **Cypress:** JavaScript (for modern end-to-end testing)

## 🎯 Key Features

### Backend Features

- **Authentication:** Secure login with JWT tokens
- **User Management:** CRUD operations for users
- **Financial Modules:**
  - Cash Flow Management
  - Accounts Receivable
  - Accounts Payable
  - Banking & Bank Reconciliation
  - Fixed Assets
  - Inventory Management
- **Dashboard Analytics:** Visualizations for financial insights
- **RESTful APIs:** Well-documented endpoints for frontend integration
- **Error Handling:** Centralized error management
- **Validation:** Joi schema validation

### Frontend Features

- **Dashboard:** Overview of financial health
- **Financial Reports:** Generate and view detailed reports
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Modern UI:** Clean, intuitive user interface
- **Real-time Feedback:** Loading states and error messages
- **Test Integration:** Built-in testing with Playwright

### Testing Features

- **Unit Tests:** Backend unit tests for business logic
- **E2E Tests:** Complete user journeys with Cypress
- **Web UI Tests:** Cross-browser testing with Selenium
- **Automated Reporting:** JUnit XML reports for all test types
- **Pipeline Automation:** Fully automated CI/CD pipelines

## 📝 API Documentation

See the `docs/api-docs.md` file for detailed API documentation, including:

- All endpoints with HTTP methods
- Request/response examples
- Authentication requirements
- Error codes

## 🚀 Jenkins CI/CD Pipeline

The project uses a multi-pipeline approach:

1. **Main Jenkinsfile:** Orchestrates all stages
2. **Stage 1 - Checkout:** Fetches code from GitHub
3. **Stage 2 - Backend Tests:**
   - Runs `mvn clean test`
   - Generates JUnit reports
   - Publishes TestNG reports
4. **Stage 3 - Frontend Tests:**
   - Runs Playwright tests
   - Generates HTML reports
5. **Stage 4 - Selenium Tests:**
   - Runs Selenium tests with TestNG
   - Publishes HTML reports
6. **Stage 5 - Cypress Tests:**
   - Runs E2E tests
   - Publishes JUnit reports
   - Archives artifacts

### Post-Build Actions

- **JUnit Reports:** Published to Jenkins dashboard
- **HTML Reports:** Test results accessible via Jenkins UI
- **Artifacts:** Videos, screenshots, and test reports archived

## 🔧 Development

### Adding New Tests

**Backend Tests**
```bash
cd server-main
# Create new test in src/test/java/
mvn test
```

**Frontend Tests**
```bash
cd client
# Create new test in src/test/
npm test
```

**Selenium Tests**
```bash
cd selenum_demo
# Create new test in src/test/java/
mvn test -Dheadless=true
```

**Cypress Tests**
```bash
cd cypress-tests
# Create new test in cypress/test/
npx cypress run --browser chrome
```

### Database Migration

See the `docs/database-migration.md` file for instructions on managing database schema changes.

## 🌐 Deployment

To deploy this application, you'll need:

1. **MongoDB Instance:** Running and accessible
2. **Node.js Server:** Running `server-main`
3. **Frontend Client:** Running `client` (or build for production)
4. **Jenkins Server:** Configured with required plugins

### Production Build (Frontend)

```bash
