// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for habit tracker testing
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.apiRequest('POST', '/auth/login', {
      username,
      password
    }).then((response) => {
      expect(response.status).to.eq(200)
      window.localStorage.setItem('token', response.body.token)
    })
  })
})

Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token')
})

Cypress.Commands.add('getAuthHeaders', () => {
  const token = window.localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
})

// Utility commands
Cypress.Commands.add('waitForApiResponse', (alias, timeout = 10000) => {
  cy.wait(alias, { timeout })
})

Cypress.Commands.add('validateApiResponse', (response, expectedStatus = 200) => {
  expect(response.status).to.eq(expectedStatus)
  expect(response.headers['content-type']).to.include('application/json')
  expect(response.body).to.have.property('success')
  expect(response.body).to.have.property('message')
  expect(response.body).to.have.property('data')
})

Cypress.Commands.add('validateHabitStructure', (habit) => {
  expect(habit).to.have.property('_id')
  expect(habit).to.have.property('name')
  expect(habit).to.have.property('description')
  expect(habit).to.have.property('frequency')
  expect(habit).to.have.property('category')
  expect(habit).to.have.property('createdAt')
  expect(habit).to.have.property('updatedAt')
})

Cypress.Commands.add('validateUserStructure', (user) => {
  expect(user).to.have.property('_id')
  expect(user).to.have.property('username')
  expect(user).to.have.property('email')
  expect(user).to.have.property('createdAt')
  expect(user).to.have.property('updatedAt')
  // Password should not be included in response
  expect(user).to.not.have.property('password')
})
