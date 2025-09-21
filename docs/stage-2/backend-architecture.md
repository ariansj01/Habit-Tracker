# Backend Architecture Documentation

## Overview

Simple Habit Tracker Backend با معماری Clean Architecture و MVC Pattern پیاده‌سازی شده است. این سند جزئیات فنی implementation را شرح می‌دهد.

## 🏗️ Project Structure

```
habit-tracker-back/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── habit.controllers.js
│   │   └── user.controllers.js
│   ├── middlewares/          # Express middlewares
│   │   ├── middleware.js     # Main middleware loader
│   │   ├── security.js       # Helmet security
│   │   ├── cors.js          # CORS configuration
│   │   ├── rateLimit.js     # Rate limiting
│   │   ├── compression.js   # Response compression
│   │   ├── logging.js       # Request logging
│   │   ├── errorHandler.js  # Error handling
│   │   ├── healthCheck.js   # Health check endpoint
│   │   ├── slowDown.js      # Slow down suspicious requests
│   │   └── validation.js    # Input validation
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Habit.js
│   │   ├── User.ts          # TypeScript definitions
│   │   └── Habit.ts
│   ├── repositories/        # Data access layer
│   │   ├── config.js        # Database connection
│   │   ├── habit.repository.js
│   │   └── user.repository.js
│   ├── routes/              # API routes
│   │   └── router.js
│   ├── services/            # Business logic
│   │   ├── habit.sevice.js
│   │   └── user.sevice.js
│   ├── setup/               # Setup utilities
│   │   ├── db.ts
│   │   └── devAuth.ts
│   └── utils/               # Helper functions
│       ├── response.js      # Response formatting
│       ├── validation.js    # Validation helpers
│       ├── eventListeners.js
│       ├── habitEmitter.js  # Event system
│       └── userEmitter.js
├── app.js                   # Main application entry
├── package.json
├── tsconfig.json
└── .gitignore
```

## 🔧 Core Components

### 1. Models (Data Layer)

#### User Model
```javascript
{
  email: String (unique, required),
  passwordHash: String (required),
  displayName: String (required, 2-50 chars),
  avatarUrl: String,
  timezone: String,
  settings: {
    weekStart: Number (default: 6),
    locale: String (default: 'fa-IR'),
    notificationsEmailEnabled: Boolean (default: false)
  },
  timestamps: true
}
```

#### Habit Model
```javascript
{
  userId: ObjectId (ref: 'User', required, indexed),
  name: String (required, 2-60 chars, indexed),
  description: String (max 300 chars),
  archived: Boolean (default: false, indexed),
  color: String,
  frequency: String (enum: ['daily'], default: 'daily'),
  startDate: String,
  order: Number,
  timestamps: true
}
```

### 2. Controllers (Presentation Layer)

Controllers مسئول:
- دریافت HTTP requests
- فراخوانی service methods
- مدیریت response formatting
- Error handling

### 3. Services (Business Logic Layer)

Services شامل:
- Business logic validation
- Data transformation
- Integration با repositories
- Event emission

### 4. Repositories (Data Access Layer)

Repositories مسئول:
- Database operations
- Query optimization
- Data persistence
- Database abstraction

## 🔒 Security Implementation

### Middleware Stack
1. **Security Headers** (Helmet)
2. **Compression** (Gzip)
3. **Request Logging** (Morgan)
4. **JSON Parsing** (Express)
5. **CORS** (Cross-Origin)
6. **Slow Down** (Suspicious requests)
7. **Rate Limiting** (1000 req/15min)

### Security Features
- **CSP**: Content Security Policy
- **HSTS**: HTTP Strict Transport Security
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: DDoS protection

## 📊 API Endpoints

### Habits API
```
GET    /api/habits           - Get all habits
GET    /api/habits/:id       - Get habit by ID
POST   /api/habits           - Create new habit
PATCH  /api/habits/:id       - Update habit
DELETE /api/habits/:id       - Delete habit
GET    /api/habits/count     - Get habits count
```

### Users API
```
GET    /api/users            - Get all users
GET    /api/users/:id        - Get user by ID
POST   /api/users            - Create new user
PATCH  /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user
GET    /api/users/count      - Get users count
```

### Health Check
```
GET    /health               - Server health status
```

## 🎯 Event System

### Event Emitter Implementation
- **habitCreated**: When new habit is created
- **habitUpdated**: When habit is modified
- **habitDeleted**: When habit is removed
- **habitCount**: When count is requested

### Benefits
- **Decoupled Architecture**: Loose coupling between components
- **Real-time Notifications**: Event-driven updates
- **Scalability**: Easy to add new event listeners

## 🚀 Performance Optimizations

### Database
- **Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Minimal database calls

### Application
- **Response Compression**: Reduced payload size
- **Rate Limiting**: Controlled request flow
- **Memory Management**: Efficient data structures

## 🧪 Development Features

### TypeScript Support
- Type definitions for models
- Compile-time type checking
- Better IDE support

### Development Tools
- **ESLint**: Code quality
- **Nodemon**: Auto-restart on changes
- **Environment Variables**: Configuration management

## 📈 Monitoring & Logging

### Request Logging
- HTTP method and URL
- Response status and time
- Request size and headers

### Error Logging
- Centralized error handling
- Detailed error information
- Stack trace logging

## 🔄 Future Enhancements

### Planned Features
1. **Authentication**: JWT-based auth
2. **Daily Tracking**: Habit completion tracking
3. **Analytics**: Usage statistics
4. **Notifications**: Real-time updates
5. **Caching**: Redis integration
6. **Testing**: Unit and integration tests

### Scalability Considerations
- **Microservices**: Service decomposition
- **Load Balancing**: Multiple server instances
- **Database Sharding**: Horizontal scaling
- **Caching Layer**: Redis/Memcached

---

*این سند به‌روزرسانی می‌شود با پیشرفت پروژه و اضافه شدن ویژگی‌های جدید.*
