# Testing Guide - Habit Tracker API

This document provides comprehensive information about testing the Habit Tracker API using both Cypress for E2E testing and Artillery for load testing.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Cypress E2E Testing](#cypress-e2e-testing)
- [Load Testing with Artillery](#load-testing-with-artillery)
- [Test Data Management](#test-data-management)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Best Practices](#best-practices)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or accessible)
- Habit Tracker API running on `http://localhost:3000`

## Installation

Install all dependencies including testing tools:

```bash
npm install
```

This will install:
- Cypress for E2E testing
- Artillery for load testing
- All other project dependencies

## Cypress E2E Testing

### Test Structure

```
cypress/
├── e2e/
│   ├── habits.cy.js          # Habit API tests
│   ├── users.cy.js           # User API tests
│   └── api-integration.cy.js # Integration tests
├── fixtures/
│   ├── habits.json           # Test data for habits
│   └── users.json            # Test data for users
├── support/
│   ├── commands.js           # Custom Cypress commands
│   └── e2e.js               # Support file with global config
└── cypress.config.js         # Cypress configuration
```

### Available Test Suites

1. **Habits API Tests** (`habits.cy.js`)
   - GET /api/habits - Retrieve all habits
   - POST /api/habits - Create new habits
   - GET /api/habits/:id - Get specific habit
   - PUT /api/habits/:id - Update habit
   - DELETE /api/habits/:id - Delete habit
   - GET /api/habits/count - Get habit count

2. **Users API Tests** (`users.cy.js`)
   - GET /api/users - Retrieve all users
   - POST /api/users - Create new users
   - GET /api/users/:id - Get specific user
   - PUT /api/users/:id - Update user
   - DELETE /api/users/:id - Delete user
   - GET /api/users/count - Get user count

3. **Integration Tests** (`api-integration.cy.js`)
   - Complete user and habit workflow
   - Error handling and edge cases
   - Performance and load simulation
   - Concurrent operations

### Custom Commands

The following custom commands are available:

- `cy.apiRequest(method, url, body)` - Make API requests
- `cy.createTestHabit(habitData)` - Create test habit
- `cy.createTestUser(userData)` - Create test user
- `cy.cleanupTestData()` - Clean up test data
- `cy.validateApiResponse(response, expectedStatus)` - Validate API responses
- `cy.validateHabitStructure(habit)` - Validate habit object structure
- `cy.validateUserStructure(user)` - Validate user object structure

## Load Testing with Artillery

### Test Configurations

1. **Standard Load Test** (`load-test-no-limit.yml`)
   - 30 seconds at 10 requests/second
   - 30 seconds at 20 requests/second
   - 60 seconds at 50 requests/second
   - Tests both habits and users APIs

2. **Stress Test** (`load-test-stress.yml`)
   - 1 minute at 100 requests/second
   - 2 minutes at 200 requests/second
   - 1 minute at 500 requests/second
   - High-volume testing scenarios

3. **Spike Test** (`load-test-spike.yml`)
   - 30 seconds normal load (10 req/s)
   - 10 seconds spike (1000 req/s)
   - 30 seconds normal load (10 req/s)
   - Tests system behavior under sudden load spikes

### Load Test Scenarios

Each configuration includes multiple scenarios:

- **Habit Operations**: Create, read, update habits
- **User Operations**: Create, read, update users
- **Mixed Operations**: Combined API calls
- **Data Capture**: Dynamic ID extraction for dependent requests

## Test Data Management

### Fixtures

Test data is stored in JSON fixtures:

- `cypress/fixtures/habits.json` - Habit test data
- `cypress/fixtures/users.json` - User test data

### Data Cleanup

Tests automatically clean up after themselves:
- Each test creates its own test data
- Cleanup happens in `beforeEach` and `afterEach` hooks
- Test data is identified by specific naming patterns

## Running Tests

### Cypress Tests

```bash
# Open Cypress Test Runner (interactive)
npm run test:open

# Run tests in headless mode
npm run test:headless

# Run tests in specific browser
npm run test:chrome
npm run test:firefox
npm run test:edge

# Run all tests
npm test
```

### Load Tests

```bash
# Run standard load test
npm run load-test

# Run stress test
npm run load-test:stress

# Run spike test
npm run load-test:spike

# Run load test with HTML report
npm run load-test:report
```

### Before Running Tests

1. Start your MongoDB instance
2. Start the API server:
   ```bash
   npm run dev
   ```
3. Ensure the API is accessible at `http://localhost:3000`

## Test Reports

### Cypress Reports

Cypress generates:
- Video recordings of test runs
- Screenshots on test failures
- Console logs and network requests
- Test results in the terminal

### Artillery Reports

Artillery generates:
- Real-time console output during tests
- JSON reports (when using `--output` flag)
- HTML reports (when using `artillery report`)

Example HTML report generation:
```bash
artillery run load-test-no-limit.yml --output report.json
artillery report report.json
```

## Best Practices

### Test Organization

1. **Isolation**: Each test is independent and cleans up after itself
2. **Descriptive Names**: Test names clearly describe what is being tested
3. **Data Management**: Use fixtures for consistent test data
4. **Error Testing**: Include tests for invalid inputs and edge cases

### Load Testing

1. **Start Small**: Begin with low load and gradually increase
2. **Monitor Resources**: Watch server CPU, memory, and database performance
3. **Realistic Scenarios**: Use realistic data and request patterns
4. **Multiple Phases**: Test different load levels to find breaking points

### Maintenance

1. **Regular Updates**: Keep test data and scenarios up to date
2. **Performance Baselines**: Establish and monitor performance baselines
3. **Test Data Cleanup**: Ensure tests don't leave orphaned data
4. **Documentation**: Keep this guide updated with any changes

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure the API server is running
2. **Database Errors**: Check MongoDB connection and permissions
3. **Test Failures**: Review test data and API responses
4. **Load Test Timeouts**: Adjust timeout values in Artillery configs

### Debug Mode

Run Cypress in debug mode:
```bash
DEBUG=cypress:* npm run test:open
```

### Logs

Check application logs for API errors:
```bash
# If using PM2
pm2 logs

# If running directly
npm run dev
```

## Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Include both positive and negative test cases
3. Add appropriate cleanup in test hooks
4. Update this documentation if needed
5. Ensure tests are deterministic and reliable
