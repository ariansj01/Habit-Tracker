describe('Habit Tracker API - Simple Tests', () => {
  let testHabitId

  afterEach(() => {
    // Clean up test data
    if (testHabitId) {
      cy.apiRequest('DELETE', `/habits/${testHabitId}`)
    }
  })

  describe('Basic API Tests', () => {
    it('should get all habits', () => {
      cy.apiRequest('GET', '/habits').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.success).to.be.true
        expect(response.body).to.have.property('data')
        expect(response.body).to.have.property('message')
      })
    })

    it('should create a new habit', () => {
      const habitData = {
        name: 'Cypress Test Habit',
        description: 'Test habit created by Cypress',
        frequency: 'daily',
        category: 'health'
      }

      cy.apiRequest('POST', '/habits', habitData).then((response) => {
        console.log('POST /habits response:', response.body)
        expect(response.status).to.eq(201)
        expect(response.body.success).to.be.true
        if (response.body.data && response.body.data._id) {
          expect(response.body.data.name).to.eq(habitData.name)
          testHabitId = response.body.data._id
        }
      })
    })

    it('should get habit count', () => {
      cy.apiRequest('GET', '/habits/count').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.success).to.be.true
        expect(response.body).to.have.property('data')
      })
    })
  })

  describe('User API Tests', () => {
    it('should get all users', () => {
      cy.apiRequest('GET', '/users').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.success).to.be.true
        expect(response.body).to.have.property('data')
      })
    })

    it('should create a new user', () => {
      const userData = {
        username: 'cypresstestuser',
        email: 'cypress@test.com',
        password: 'cypresspassword123'
      }

      cy.apiRequest('POST', '/users', userData).then((response) => {
        console.log('POST /users response:', response.body)
        expect(response.status).to.eq(201)
        expect(response.body.success).to.be.true
        if (response.body.data && response.body.data._id) {
          expect(response.body.data.username).to.eq(userData.username)
        }
      })
    })

    it('should get user count', () => {
      cy.apiRequest('GET', '/users/count').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.success).to.be.true
        expect(response.body).to.have.property('data')
      })
    })
  })
})
