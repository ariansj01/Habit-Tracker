describe('Habit Tracker API - Habits', () => {
  let testHabitId

  beforeEach(() => {
    // Clean up any existing test data
    cy.cleanupTestData()
  })

  afterEach(() => {
    // Clean up test data after each test
    if (testHabitId) {
      cy.apiRequest('DELETE', `/habits/${testHabitId}`)
    }
  })

  describe('GET /api/habits', () => {
    it('should return all habits', () => {
      cy.apiRequest('GET', '/habits').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('success')
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('data')
        expect(response.body.success).to.be.true
      })
    })

    it('should return empty array when no habits exist', () => {
      // This test assumes the database is clean
      cy.apiRequest('GET', '/habits').then((response) => {
        cy.validateApiResponse(response)
        expect(response.body.data).to.be.an('array')
        expect(response.body.success).to.be.true
      })
    })
  })

  describe('POST /api/habits', () => {
    it('should create a new habit with valid data', () => {
      const habitData = {
        name: 'Cypress Test Habit',
        description: 'Test habit created by Cypress',
        frequency: 'daily',
        category: 'health'
      }

      cy.apiRequest('POST', '/habits', habitData).then((response) => {
        cy.validateApiResponse(response, 201)
        cy.validateHabitStructure(response.body.data)
        expect(response.body.data.name).to.eq(habitData.name)
        expect(response.body.data.description).to.eq(habitData.description)
        expect(response.body.data.frequency).to.eq(habitData.frequency)
        expect(response.body.data.category).to.eq(habitData.category)
        
        testHabitId = response.body.data._id
      })
    })

    it('should return 400 for invalid habit data', () => {
      const invalidHabit = {
        name: '', // Empty name should be invalid
        description: 'Test description',
        frequency: 'invalid', // Invalid frequency
        category: ''
      }

      cy.apiRequest('POST', '/habits', invalidHabit).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('should create multiple habits', () => {
      const habits = [
        {
          name: 'Cypress Habit 1',
          description: 'First test habit',
          frequency: 'daily',
          category: 'health'
        },
        {
          name: 'Cypress Habit 2',
          description: 'Second test habit',
          frequency: 'weekly',
          category: 'productivity'
        }
      ]

      habits.forEach((habit, index) => {
        cy.apiRequest('POST', '/habits', habit).then((response) => {
          cy.validateApiResponse(response, 201)
          expect(response.body.name).to.eq(habit.name)
          
          if (index === 0) {
            testHabitId = response.body._id
          }
        })
      })
    })
  })

  describe('GET /api/habits/:id', () => {
    beforeEach(() => {
      // Create a test habit first
      cy.createTestHabit({
        name: 'Cypress Test Habit for GET',
        description: 'Test habit for GET operation',
        frequency: 'daily',
        category: 'health'
      }).then((response) => {
        testHabitId = response.body._id
      })
    })

    it('should return a specific habit by ID', () => {
      cy.apiRequest('GET', `/habits/${testHabitId}`).then((response) => {
        cy.validateApiResponse(response)
        cy.validateHabitStructure(response.body)
        expect(response.body._id).to.eq(testHabitId)
      })
    })

    it('should return 404 for non-existent habit ID', () => {
      const nonExistentId = '507f1f77bcf86cd799439011' // Valid ObjectId format but non-existent
      cy.apiRequest('GET', `/habits/${nonExistentId}`).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

    it('should return 400 for invalid habit ID format', () => {
      const invalidId = 'invalid-id'
      cy.apiRequest('GET', `/habits/${invalidId}`).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })

  describe('PUT /api/habits/:id', () => {
    beforeEach(() => {
      // Create a test habit first
      cy.createTestHabit({
        name: 'Cypress Test Habit for PUT',
        description: 'Test habit for PUT operation',
        frequency: 'daily',
        category: 'health'
      }).then((response) => {
        testHabitId = response.body._id
      })
    })

    it('should update a habit with valid data', () => {
      const updateData = {
        name: 'Updated Cypress Habit',
        description: 'Updated test habit description',
        frequency: 'weekly',
        category: 'fitness'
      }

      cy.apiRequest('PUT', `/habits/${testHabitId}`, updateData).then((response) => {
        cy.validateApiResponse(response)
        cy.validateHabitStructure(response.body)
        expect(response.body.name).to.eq(updateData.name)
        expect(response.body.description).to.eq(updateData.description)
        expect(response.body.frequency).to.eq(updateData.frequency)
        expect(response.body.category).to.eq(updateData.category)
      })
    })

    it('should return 404 for non-existent habit ID', () => {
      const nonExistentId = '507f1f77bcf86cd799439011'
      const updateData = { name: 'Updated Name' }

      cy.apiRequest('PUT', `/habits/${nonExistentId}`, updateData).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })

  describe('DELETE /api/habits/:id', () => {
    beforeEach(() => {
      // Create a test habit first
      cy.createTestHabit({
        name: 'Cypress Test Habit for DELETE',
        description: 'Test habit for DELETE operation',
        frequency: 'daily',
        category: 'health'
      }).then((response) => {
        testHabitId = response.body._id
      })
    })

    it('should delete a habit successfully', () => {
      cy.apiRequest('DELETE', `/habits/${testHabitId}`).then((response) => {
        cy.validateApiResponse(response, 200)
      })

      // Verify the habit is deleted
      cy.apiRequest('GET', `/habits/${testHabitId}`).then((response) => {
        expect(response.status).to.eq(404)
      })

      testHabitId = null // Prevent cleanup in afterEach
    })

    it('should return 404 for non-existent habit ID', () => {
      const nonExistentId = '507f1f77bcf86cd799439011'
      cy.apiRequest('DELETE', `/habits/${nonExistentId}`).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })

  describe('GET /api/habits/count', () => {
    it('should return the count of habits', () => {
      cy.apiRequest('GET', '/habits/count').then((response) => {
        cy.validateApiResponse(response)
        expect(response.body).to.have.property('count')
        expect(response.body.count).to.be.a('number')
        expect(response.body.count).to.be.at.least(0)
      })
    })

    it('should return correct count after creating habits', () => {
      let initialCount

      // Get initial count
      cy.apiRequest('GET', '/habits/count').then((response) => {
        initialCount = response.body.count
      })

      // Create a test habit
      cy.createTestHabit({
        name: 'Cypress Count Test Habit',
        description: 'Test habit for count operation',
        frequency: 'daily',
        category: 'health'
      }).then((response) => {
        testHabitId = response.body._id

        // Verify count increased
        cy.apiRequest('GET', '/habits/count').then((countResponse) => {
          expect(countResponse.body.count).to.eq(initialCount + 1)
        })
      })
    })
  })
})
