// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

// Custom commands for API testing
Cypress.Commands.add('apiRequest', (method, url, body = null) => {
  return cy.request({
    method,
    url: `${Cypress.config('baseUrl')}/api${url}`,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    failOnStatusCode: false
  })
})

// Command to create test data
Cypress.Commands.add('createTestHabit', (habitData) => {
  const defaultHabit = {
    name: 'Test Habit',
    description: 'Test habit description',
    frequency: 'daily',
    category: 'health'
  }
  
  return cy.apiRequest('POST', '/habits', { ...defaultHabit, ...habitData })
})

Cypress.Commands.add('createTestUser', (userData) => {
  const defaultUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'testpassword123'
  }
  
  return cy.apiRequest('POST', '/users', { ...defaultUser, ...userData })
})

// Command to clean up test data
Cypress.Commands.add('cleanupTestData', () => {
  cy.apiRequest('GET', '/habits').then((response) => {
    if (response.body && response.body.length > 0) {
      response.body.forEach(habit => {
        if (habit.name.includes('Test') || habit.name.includes('Cypress')) {
          cy.apiRequest('DELETE', `/habits/${habit._id}`)
        }
      })
    }
  })
  
  cy.apiRequest('GET', '/users').then((response) => {
    if (response.body && response.body.length > 0) {
      response.body.forEach(user => {
        if (user.username.includes('test') || user.email.includes('test')) {
          cy.apiRequest('DELETE', `/users/${user._id}`)
        }
      })
    }
  })
})
