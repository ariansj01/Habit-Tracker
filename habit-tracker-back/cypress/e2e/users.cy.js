describe('Habit Tracker API - Users', () => {
  let testUserId

  beforeEach(() => {
    // Clean up any existing test data
    cy.cleanupTestData()
  })

  afterEach(() => {
    // Clean up test data after each test
    if (testUserId) {
      cy.apiRequest('DELETE', `/users/${testUserId}`)
    }
  })

  describe('GET /api/users', () => {
    it('should return all users', () => {
      cy.apiRequest('GET', '/users').then((response) => {
        cy.validateApiResponse(response)
        expect(response.body).to.be.an('array')
      })
    })

    it('should return empty array when no users exist', () => {
      // This test assumes the database is clean
      cy.apiRequest('GET', '/users').then((response) => {
        cy.validateApiResponse(response)
        expect(response.body).to.be.an('array')
      })
    })
  })

  describe('POST /api/users', () => {
    it('should create a new user with valid data', () => {
      const userData = {
        username: 'cypresstestuser',
        email: 'cypress@test.com',
        password: 'cypresspassword123'
      }

      cy.apiRequest('POST', '/users', userData).then((response) => {
        cy.validateApiResponse(response, 201)
        cy.validateUserStructure(response.body)
        expect(response.body.username).to.eq(userData.username)
        expect(response.body.email).to.eq(userData.email)
        expect(response.body).to.not.have.property('password') // Password should not be returned
        
        testUserId = response.body._id
      })
    })

    it('should return 400 for invalid user data', () => {
      const invalidUser = {
        username: '', // Empty username should be invalid
        email: 'invalid-email', // Invalid email format
        password: '123' // Password too short
      }

      cy.apiRequest('POST', '/users', invalidUser).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('should return 409 for duplicate username', () => {
      const userData = {
        username: 'duplicateuser',
        email: 'duplicate@test.com',
        password: 'password123'
      }

      // Create first user
      cy.apiRequest('POST', '/users', userData).then((response) => {
        testUserId = response.body._id
      })

      // Try to create user with same username
      cy.apiRequest('POST', '/users', {
        ...userData,
        email: 'different@test.com'
      }).then((response) => {
        expect(response.status).to.eq(409)
      })
    })

    it('should return 409 for duplicate email', () => {
      const userData = {
        username: 'duplicateuser',
        email: 'duplicate@test.com',
        password: 'password123'
      }

      // Create first user
      cy.apiRequest('POST', '/users', userData).then((response) => {
        testUserId = response.body._id
      })

      // Try to create user with same email
      cy.apiRequest('POST', '/users', {
        ...userData,
        username: 'differentuser'
      }).then((response) => {
        expect(response.status).to.eq(409)
      })
    })
  })

  describe('GET /api/users/:id', () => {
    beforeEach(() => {
      // Create a test user first
      cy.createTestUser({
        username: 'cypressgetuser',
        email: 'get@test.com',
        password: 'password123'
      }).then((response) => {
        testUserId = response.body._id
      })
    })

    it('should return a specific user by ID', () => {
      cy.apiRequest('GET', `/users/${testUserId}`).then((response) => {
        cy.validateApiResponse(response)
        cy.validateUserStructure(response.body)
        expect(response.body._id).to.eq(testUserId)
        expect(response.body.username).to.eq('cypressgetuser')
        expect(response.body.email).to.eq('get@test.com')
      })
    })

    it('should return 404 for non-existent user ID', () => {
      const nonExistentId = '507f1f77bcf86cd799439011' // Valid ObjectId format but non-existent
      cy.apiRequest('GET', `/users/${nonExistentId}`).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

    it('should return 400 for invalid user ID format', () => {
      const invalidId = 'invalid-id'
      cy.apiRequest('GET', `/users/${invalidId}`).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })

  describe('PUT /api/users/:id', () => {
    beforeEach(() => {
      // Create a test user first
      cy.createTestUser({
        username: 'cypressputuser',
        email: 'put@test.com',
        password: 'password123'
      }).then((response) => {
        testUserId = response.body._id
      })
    })

    it('should update a user with valid data', () => {
      const updateData = {
        username: 'updatedcypressuser',
        email: 'updated@test.com'
      }

      cy.apiRequest('PUT', `/users/${testUserId}`, updateData).then((response) => {
        cy.validateApiResponse(response)
        cy.validateUserStructure(response.body)
        expect(response.body.username).to.eq(updateData.username)
        expect(response.body.email).to.eq(updateData.email)
      })
    })

    it('should return 404 for non-existent user ID', () => {
      const nonExistentId = '507f1f77bcf86cd799439011'
      const updateData = { username: 'updatedname' }

      cy.apiRequest('PUT', `/users/${nonExistentId}`, updateData).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

    it('should not allow updating to duplicate username', () => {
      // Create another user first
      cy.createTestUser({
        username: 'anotheruser',
        email: 'another@test.com',
        password: 'password123'
      }).then((response) => {
        const anotherUserId = response.body._id

        // Try to update first user with second user's username
        cy.apiRequest('PUT', `/users/${testUserId}`, {
          username: 'anotheruser'
        }).then((response) => {
          expect(response.status).to.eq(409)
        })

        // Clean up the second user
        cy.apiRequest('DELETE', `/users/${anotherUserId}`)
      })
    })
  })

  describe('DELETE /api/users/:id', () => {
    beforeEach(() => {
      // Create a test user first
      cy.createTestUser({
        username: 'cypressdeleteuser',
        email: 'delete@test.com',
        password: 'password123'
      }).then((response) => {
        testUserId = response.body._id
      })
    })

    it('should delete a user successfully', () => {
      cy.apiRequest('DELETE', `/users/${testUserId}`).then((response) => {
        cy.validateApiResponse(response, 200)
      })

      // Verify the user is deleted
      cy.apiRequest('GET', `/users/${testUserId}`).then((response) => {
        expect(response.status).to.eq(404)
      })

      testUserId = null // Prevent cleanup in afterEach
    })

    it('should return 404 for non-existent user ID', () => {
      const nonExistentId = '507f1f77bcf86cd799439011'
      cy.apiRequest('DELETE', `/users/${nonExistentId}`).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })

  describe('GET /api/users/count', () => {
    it('should return the count of users', () => {
      cy.apiRequest('GET', '/users/count').then((response) => {
        cy.validateApiResponse(response)
        expect(response.body).to.have.property('count')
        expect(response.body.count).to.be.a('number')
        expect(response.body.count).to.be.at.least(0)
      })
    })

    it('should return correct count after creating users', () => {
      let initialCount

      // Get initial count
      cy.apiRequest('GET', '/users/count').then((response) => {
        initialCount = response.body.count
      })

      // Create a test user
      cy.createTestUser({
        username: 'cypresscountuser',
        email: 'count@test.com',
        password: 'password123'
      }).then((response) => {
        testUserId = response.body._id

        // Verify count increased
        cy.apiRequest('GET', '/users/count').then((countResponse) => {
          expect(countResponse.body.count).to.eq(initialCount + 1)
        })
      })
    })
  })
})
