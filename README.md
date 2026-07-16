# 🚀 PW-API-Testing-Framework

A production-ready, scalable, and maintainable **API Testing Framework** built with **Playwright** and **TypeScript**. The framework follows industry best practices with reusable utilities, custom assertions, environment configuration, Docker support, GitHub Actions CI/CD, and AI-assisted development workflows.

![Playwright](https://img.shields.io/badge/Playwright-API%20Testing-45ba4b?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue)

---

# ✨ Features

## Production Ready Framework

- Built with Playwright API Testing
- TypeScript-based architecture
- Modular & reusable design
- Fluent API request handling
- Enterprise-ready folder structure
- Configuration-driven execution
- Docker support
- GitHub Actions CI/CD
- Parallel execution
- Rich HTML reporting

---

## API Testing Capabilities

- GET
- POST
- PUT
- PATCH
- DELETE

Supports:

- Authentication
- Custom Headers
- Query Parameters
- Request Payload Validation
- Response Validation
- Status Code Validation

---

## Advanced Validation

- Custom Assertions
- JSON Response Validation
- Response Time Validation
- Header Validation
- Data Integrity Validation
- Schema-ready Architecture

---

## Reporting

- Playwright HTML Report
- Request Logging
- Response Logging
- Execution Summary
- Failure Diagnostics

---

## AI Enhanced Development

- GitHub Copilot Ready
- AI-assisted Test Creation
- Faster Assertion Generation
- Improved Code Quality

---

# 📁 Project Structure

```text
PW-API-Testing-Framework
│
├── .github/
│   └── workflows/
│       └── docker-tests.yml
│
├── helpers/
│   └── createToken.ts
│
├── tests/
│   ├── get_api_validation.spec.ts
│   ├── post_api_validation.spec.ts
│   └── smokeTest.spec.ts
│
├── utils/
│   ├── custom_expect.ts
│   ├── fixtures.ts
│   ├── logger.ts
│   └── request-handler.ts
│
├── playwright-report/
│   └── index.html
│
├── test-results/
│
├── .dockerignore
├── .gitignore
├── api-test.config.ts
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

> **Note:** `node_modules/` is intentionally excluded from the repository and is generated automatically after running `npm install`.

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Playwright | API Automation |
| TypeScript | Programming Language |
| Node.js | Runtime |
| Docker | Containerization |
| GitHub Actions | CI/CD |
| GitHub Copilot | AI Development |

---

# 🚀 Installation

## Clone Repository

```bash
git clone git@github.com:qasandeep-patil/PW-API-Testing-Framework.git

cd PW-API-Testing-Framework
```

## Install Dependencies

```bash
npm install
```

## Install Playwright

```bash
npx playwright install
```

---

# ▶️ Running Tests

### Execute all tests

```bash
npx playwright test
```

### Execute a single test

```bash
npx playwright test tests/get_api_validation.spec.ts
```

### Execute Smoke Tests

```bash
npx playwright test tests/smokeTest.spec.ts
```

### Execute in Headed Mode

```bash
npx playwright test --headed
```

---

# 📊 View Report

```bash
npx playwright show-report
```

---

# 🐳 Docker Execution

Build Docker image

```bash
docker build -t pw-api-framework .
```

Run Tests

```bash
docker-compose up --build
```

---

# ⚙️ CI/CD

GitHub Actions workflow is available at:

```
.github/workflows/docker-tests.yml
```

The pipeline performs:

- Install Dependencies
- Install Playwright
- Execute API Tests
- Generate HTML Report
- Publish Test Results

---

# 🧩 Framework Components

## Helpers

- Authentication Token Generation
- API Helper Methods

## Utilities

- Request Handler
- Custom Assertions
- Logger
- Playwright Fixtures

---

# 🎯 Best Practices

- Clean Architecture
- SOLID Principles
- DRY Principle
- Reusable Utilities
- Centralized Configuration
- Type Safety
- Easy Maintenance

---

# 📌 Roadmap

- JSON Schema Validation
- Automatic Schema Generation
- Data Driven Testing
- Environment Management
- Allure Reporting
- Retry Mechanism
- API Mocking
- Performance Testing
- Contract Testing
- AI Generated Assertions

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# ⭐ Support

If you found this framework helpful, please consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sandeep Patil**

QA Automation | SDET | Playwright | API Testing | TypeScript | AI Testing | CI/CD | Docker

---

**Built with ❤️ using Playwright, TypeScript, Docker, and modern API testing best practices.**
