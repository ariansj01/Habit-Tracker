describe('Simple API Test', () => {
  it('should test basic API functionality', () => {
    // Test GET /api/habits
    cy.apiRequest('GET', '/habits').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('success')
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      console.log('GET /api/habits response:', response.body)
    })

    // Test GET /api/users
    cy.apiRequest('GET', '/users').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('success')
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      console.log('GET /api/users response:', response.body)
    })

    // Test POST /api/habits
    const habitData = {
      name: 'Test Habit',
      description: 'Test description',
      frequency: 'daily',
      category: 'health'
    }

    cy.apiRequest('POST', '/habits', habitData).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('success')
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('data')
      console.log('POST /api/habits response:', response.body)
    })
  })
})
