describe('Habit Tracker API - Integration Tests', () => {
  let testUserId
  let testHabitIds = []

  beforeEach(() => {
    // Clean up any existing test data
    cy.cleanupTestData()
  })

  afterEach(() => {
    // Clean up test data after each test
    testHabitIds.forEach(habitId => {
      cy.apiRequest('DELETE', `/habits/${habitId}`)
    })
    testHabitIds = []

    if (testUserId) {
      cy.apiRequest('DELETE', `/users/${testUserId}`)
    }
  })

  describe('Complete User and Habit Workflow', () => {
    it('should handle complete user registration and habit management workflow', () => {
      // Step 1: Create a user
      cy.createTestUser({
        username: 'integrationuser',
        email: 'integration@test.com',
        password: 'integrationpass123'
      }).then((response) => {
        cy.validateApiResponse(response, 201)
        testUserId = response.body._id
        cy.log('User created successfully')
      })

      // Step 2: Create multiple habits for the user
      const habits = [
        {
          name: 'Morning Exercise',
          description: '30 minutes of cardio',
          frequency: 'daily',
          category: 'health'
        },
        {
          name: 'Read Books',
          description: 'Read for 1 hour',
          frequency: 'daily',
          category: 'learning'
        },
        {
          name: 'Meditation',
          description: '10 minutes meditation',
          frequency: 'daily',
          category: 'wellness'
        }
      ]

      habits.forEach((habit, index) => {
        cy.createTestHabit(habit).then((response) => {
          cy.validateApiResponse(response, 201)
          testHabitIds.push(response.body._id)
          cy.log(`Habit ${index + 1} created successfully`)
        })
      })

      // Step 3: Verify all habits were created
      cy.apiRequest('GET', '/habits').then((response) => {
        cy.validateApiResponse(response)
        const createdHabits = response.body.filter(habit => 
          testHabitIds.includes(habit._id)
        )
        expect(createdHabits).to.have.length(3)
      })

      // Step 4: Update one of the habits
      cy.apiRequest('PUT', `/habits/${testHabitIds[0]}`, {
        name: 'Updated Morning Exercise',
        description: '45 minutes of cardio and strength training',
        frequency: 'daily',
        category: 'fitness'
      }).then((response) => {
        cy.validateApiResponse(response)
        expect(response.body.name).to.eq('Updated Morning Exercise')
        cy.log('Habit updated successfully')
      })

      // Step 5: Verify habit count
      cy.apiRequest('GET', '/habits/count').then((response) => {
        cy.validateApiResponse(response)
        expect(response.body.count).to.be.at.least(3)
      })

      // Step 6: Delete one habit
      cy.apiRequest('DELETE', `/habits/${testHabitIds[2]}`).then((response) => {
        cy.validateApiResponse(response, 200)
        cy.log('Habit deleted successfully')
      })

      // Remove deleted habit from cleanup list
      testHabitIds = testHabitIds.slice(0, 2)

      // Step 7: Verify habit was deleted
      cy.apiRequest('GET', `/habits/${testHabitIds[2]}`).then((response) => {
        expect(response.status).to.eq(404)
      })

      // Step 8: Update user information
      cy.apiRequest('PUT', `/users/${testUserId}`, {
        username: 'updatedintegrationuser',
        email: 'updatedintegration@test.com'
      }).then((response) => {
        cy.validateApiResponse(response)
        expect(response.body.username).to.eq('updatedintegrationuser')
        cy.log('User updated successfully')
      })

      // Step 9: Verify final state
      cy.apiRequest('GET', '/habits').then((response) => {
        const remainingHabits = response.body.filter(habit => 
          testHabitIds.includes(habit._id)
        )
        expect(remainingHabits).to.have.length(2)
      })

      cy.apiRequest('GET', '/users/count').then((response) => {
        expect(response.body.count).to.be.at.least(1)
      })
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('should handle concurrent operations gracefully', () => {
      // Create multiple users simultaneously
      const users = [
        { username: 'concurrent1', email: 'concurrent1@test.com', password: 'pass123' },
        { username: 'concurrent2', email: 'concurrent2@test.com', password: 'pass123' },
        { username: 'concurrent3', email: 'concurrent3@test.com', password: 'pass123' }
      ]

      const userIds = []

      users.forEach((user, index) => {
        cy.createTestUser(user).then((response) => {
          cy.validateApiResponse(response, 201)
          userIds.push(response.body._id)
          cy.log(`Concurrent user ${index + 1} created`)
        })
      })

      // Create multiple habits simultaneously
      const habits = [
        { name: 'Concurrent Habit 1', frequency: 'daily', category: 'test' },
        { name: 'Concurrent Habit 2', frequency: 'weekly', category: 'test' },
        { name: 'Concurrent Habit 3', frequency: 'monthly', category: 'test' }
      ]

      habits.forEach((habit, index) => {
        cy.createTestHabit(habit).then((response) => {
          cy.validateApiResponse(response, 201)
          testHabitIds.push(response.body._id)
          cy.log(`Concurrent habit ${index + 1} created`)
        })
      })

      // Clean up users
      cy.then(() => {
        userIds.forEach(userId => {
          cy.apiRequest('DELETE', `/users/${userId}`)
        })
      })
    })

    it('should handle invalid data gracefully across endpoints', () => {
      // Test invalid habit creation
      cy.apiRequest('POST', '/habits', {
        name: '', // Invalid empty name
        frequency: 'invalid' // Invalid frequency
      }).then((response) => {
        expect(response.status).to.eq(400)
      })

      // Test invalid user creation
      cy.apiRequest('POST', '/users', {
        username: '', // Invalid empty username
        email: 'invalid-email', // Invalid email
        password: '123' // Too short password
      }).then((response) => {
        expect(response.status).to.eq(400)
      })

      // Test invalid ID formats
      cy.apiRequest('GET', '/habits/invalid-id').then((response) => {
        expect(response.status).to.eq(400)
      })

      cy.apiRequest('GET', '/users/invalid-id').then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })

  describe('Performance and Load Simulation', () => {
    it('should handle multiple rapid requests', () => {
      // Simulate rapid habit creation
      for (let i = 0; i < 5; i++) {
        cy.createTestHabit({
          name: `Rapid Test Habit ${i}`,
          description: `Rapid test habit ${i}`,
          frequency: 'daily',
          category: 'performance'
        }).then((response) => {
          cy.validateApiResponse(response, 201)
          testHabitIds.push(response.body._id)
        })
      }

      // Verify all habits were created
      cy.apiRequest('GET', '/habits').then((response) => {
        const rapidHabits = response.body.filter(habit => 
          testHabitIds.includes(habit._id)
        )
        expect(rapidHabits).to.have.length(5)
      })
    })

    it('should maintain data consistency during concurrent updates', () => {
      // Create a test habit
      cy.createTestHabit({
        name: 'Consistency Test Habit',
        description: 'Test habit for consistency',
        frequency: 'daily',
        category: 'test'
      }).then((response) => {
        testHabitIds.push(response.body._id)
        const habitId = response.body._id

        // Perform multiple updates
        cy.apiRequest('PUT', `/habits/${habitId}`, {
          name: 'Updated Name 1',
          description: 'Updated description 1'
        }).then((response) => {
          cy.validateApiResponse(response)
        })

        cy.apiRequest('PUT', `/habits/${habitId}`, {
          name: 'Updated Name 2',
          description: 'Updated description 2'
        }).then((response) => {
          cy.validateApiResponse(response)
          expect(response.body.name).to.eq('Updated Name 2')
        })

        // Verify final state
        cy.apiRequest('GET', `/habits/${habitId}`).then((response) => {
          cy.validateApiResponse(response)
          expect(response.body.name).to.eq('Updated Name 2')
          expect(response.body.description).to.eq('Updated description 2')
        })
      })
    })
  })
})
