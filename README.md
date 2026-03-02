# 🚀 Playwright Automation Framework

A modern, scalable **End-to-End Test Automation Framework** built using **Playwright + TypeScript**, designed with industry best practices for performance, maintainability, and parallel execution.

---

## ✨ Key Highlights

* ⚡ Fast parallel execution
* 🧩 Page Object Model (POM)
* 🔐 Credential Pool Management
* 💾 Session Save & Reuse (Storage State)
* 🧪 Custom Playwright Fixtures
* 📊 HTML Reports
* 🪵 Centralized Logging
* 🧱 Scalable & clean architecture

---

## 🛠 Tech Stack

| Tool       | Purpose                   |
| ---------- | ------------------------- |
| Playwright | UI Automation             |
| TypeScript | Type-safe scripting       |
| Node.js    | Runtime                   |
| POM        | Maintainable UI structure |
| Fixtures   | Reusable test setup       |

---

## 📁 Project Structure

```
project-root
│
├── src/   
│   ├── tests/                 # Test cases
│   ├── pages/                 # Page Object classes
│   ├── fixtures/              # Custom fixtures
│   ├── config/
│   │   ├── .env               # Multiple environment setup 
│   │   ├── .env.prod
│   │   ├── auth.json          # Saved sessions
│   ├── utils/
│   │   ├── CredentialManager.ts
│   │   ├── LoggerUtils.ts
│   │   ├── SessionUtils.ts
│   │
│   └── data/
│       ├── credentials.json   # Local credential pool
│  
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🔐 Credential Pool (Parallel Safe)

* Each test acquires a unique account
* Prevents login conflicts during parallel execution
* Credentials are released automatically after test completion
* Protected password can be moved to env's for better security

**Format:**

```
data/credentials.json
```

```json
[
  { "username": "user1", "password": "pass1", "inUse": false },
  { "username": "user2", "password": "pass2", "inUse": false }
]
```

---

## 💾 Session Management (Login Once, Reuse Many Times)

To improve execution speed, the framework supports **saving and reusing login sessions**.

### How it works

1. Login using credentials
2. Save session state:

```
await page.context().storageState({
  path: `data/storageStates/${username}.json`
});
```

3. Reuse session in tests:

```
test.use({
  storageState: `data/storageStates/${username}.json`
});
```

### Benefits

* Faster test execution
* Avoid repeated login
* Stable authentication handling
* Ideal for large test suites

---

## 🧩 Page Object Model

UI actions and locators are separated into reusable classes.

Example:

```
pages/
├── LoginPage.ts
├── HomePage.ts
```

Usage:

```
test('Dashboard Test', async ({ homePage }) => {
  await homePage.verifyDashboard();
});
```

---

## 🧪 Custom Fixtures

Fixtures provide:

* Credential injection
* Auto login
* Page initialization
* Resource cleanup

This keeps tests clean and focused only on validation logic.

---

## ⚡ Running Tests

### Install dependencies

```
npm install
```

### Install browsers

```
npx playwright install
```

### Run all tests

```
npx playwright test
```

### Run in headed mode

```
npx playwright test --headed
```

### Run specific test

```
npx playwright test tests/example.spec.ts
```

---

## 📊 Test Reports

After execution:

```
npx playwright show-report
```

Playwright generates an interactive HTML report with:

* Test status
* Screenshots
* Trace (if enabled)
* Execution time

---

## 🪵 Logging

A centralized logger tracks:

* Credential usage
* Test flow steps
* Debug information
* Error tracking

Located at:

```
utils/LoggerUtils.ts
```

---

## 🏎 Parallel Execution

Configured via Playwright workers:

```
npx playwright test --workers=4
```

Each worker uses a separate credential from the pool.

---

## 🧱 Framework Design Principles

* Separation of concerns
* Reusable components
* Parallel-safe resource handling
* Minimal test logic (fixtures handle setup)
* Scalable for large test suites

---

## 📌 Future Enhancements

* Multi-role credential support (Admin/User)
* API test integration
* Test tagging (Smoke/Regression)
* Docker execution
* Cloud browser execution

---

## 👨‍💻 Author

Automation Engineer | Playwright | TypeScript
Focused on building scalable, enterprise-grade automation frameworks.
