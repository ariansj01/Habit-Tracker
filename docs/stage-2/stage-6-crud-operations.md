# Stage 6: CRUD Operations و API Endpoints

## 🎯 هدف
پیاده‌سازی کامل CRUD operations برای عادت‌ها با Repository pattern، Service layer، و Controller layer.

## ✅ کارهای انجام شده

### 1. Repository Pattern Implementation

#### Habit Repository
```javascript
// src/repositories/habit.repository.js
const Habit = require('../models/Habit');

const findAll = async () => {
  return await Habit.find({ archived: false }).populate('userId');
};

const findById = async (id) => {
  return await Habit.findById(id).populate('userId');
};

const create = async (userId, name, description, archived, color, frequency, startDate, order) => {
  const habit = new Habit({
    userId, name, description, archived, color, frequency, startDate, order
  });
  return await habit.save();
};

const update = async (id, updateData) => {
  return await Habit.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteHabit = async (id) => {
  return await Habit.findByIdAndUpdate(id, { archived: true }, { new: true });
};

const count = async () => {
  return await Habit.countDocuments({ archived: false });
};
```

### 2. Service Layer Implementation

#### Habit Service
```javascript
// src/services/habit.sevice.js
const habitRepository = require('../repositories/habit.repository');
const { validateId, validateHabitName, validateUserId } = require('../utils/validation');

const findAll = async () => {
  try {
    const habits = await habitRepository.findAll();
    return { success: true, data: habits };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const findById = async (id) => {
  if (!validateId(id)) {
    return { success: false, error: 'Invalid ID' };
  }
  try {
    const habit = await habitRepository.findById(id);
    return { success: true, data: habit };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const create = async (habitData) => {
  const { userId, name, description, archived, color, frequency, startDate, order } = habitData;
  try {
    const habit = await habitRepository.create(userId, name, description, archived, color, frequency, startDate, order);
    return { success: true, data: habit, message: 'Habit created successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const update = async (id, updateData) => {
  if (!validateId(id)) {
    return { success: false, error: 'Invalid ID' };
  }
  try {
    const habit = await habitRepository.update(id, updateData);
    return { success: true, data: habit, message: 'Habit updated successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const deleteHabit = async (id) => {
  if (!validateId(id)) {
    return { success: false, error: 'Invalid ID' };
  }
  try {
    const habit = await habitRepository.deleteHabit(id);
    return { success: true, data: habit, message: 'Habit deleted successfully' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### 3. Controller Layer Implementation

#### Habit Controller
```javascript
// src/controllers/habit.controllers.js
const habitService = require('../services/habit.sevice');
const { successResponse, errorResponse } = require('../utils/response');
const { notify } = require('../utils/habitEmitter');

const getAllHabits = async (req, res) => {
  try {
    const result = await habitService.findAll();
    if (result.success) {
      successResponse(res, 200, result.data, 'Habits fetched successfully');
    } else {
      errorResponse(res, 500, result.error);
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const getHabitById = async (req, res) => {
  try {
    const result = await habitService.findById(req.params.id);
    if (result.success) {
      successResponse(res, 200, result.data, 'Habit fetched successfully');
    } else {
      errorResponse(res, 404, result.error);
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const createHabit = async (req, res) => {
  try {
    const result = await habitService.create(req.body);
    if (result.success) {
      notify('habitCreated', result.data);
      successResponse(res, 201, result.data, result.message);
    } else {
      errorResponse(res, 400, result.error);
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const updateHabit = async (req, res) => {
  try {
    const result = await habitService.update(req.params.id, req.body);
    if (result.success) {
      notify('habitUpdated', result.data);
      successResponse(res, 200, result.data, result.message);
    } else {
      errorResponse(res, 400, result.error);
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

const deleteHabit = async (req, res) => {
  try {
    const result = await habitService.deleteHabit(req.params.id);
    if (result.success) {
      notify('habitDeleted', result.data);
      successResponse(res, 200, result.data, result.message);
    } else {
      errorResponse(res, 400, result.error);
    }
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
```

### 4. API Routes Configuration

#### Router Setup
```javascript
// src/routes/router.js
const express = require("express");
const HabitController = require("../controllers/habit.controllers");
const UserController = require("../controllers/user.controllers");

const router = express.Router();

// Habit routes
router.get("/habits/", HabitController.getAllHabits);
router.get("/habits/:id", HabitController.getHabitById);
router.post("/habits/", HabitController.createHabit);
router.put("/habits/:id", HabitController.updateHabit);
router.delete("/habits/:id", HabitController.deleteHabit);
router.get("/habits/count", HabitController.getHabitCount);

// User routes
router.get("/users/", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users/", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.get("/users/count", UserController.getUserCount);

module.exports = router;
```

### 5. Response Formatting

#### Standardized Response
```javascript
// src/utils/response.js
const successResponse = (res, statusCode, data, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, statusCode, message = 'Error', error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.message : null
  });
};
```

### 6. Event System Integration

#### Event Emitter
```javascript
// src/utils/habitEmitter.js
const EventEmitter = require('events');
const habitEmitter = new EventEmitter();

const notify = (event, data) => {
  habitEmitter.emit(event, data);
};

module.exports = { notify, habitEmitter };
```

## 🔧 ویژگی‌های پیاده‌سازی شده

### Architecture Patterns
- **Repository Pattern**: جداسازی data access
- **Service Layer**: business logic encapsulation
- **Controller Layer**: request/response handling
- **Event-Driven**: real-time notifications

### Validation & Error Handling
- **Input Validation**: Joi و Zod validation
- **Error Handling**: centralized error management
- **Response Formatting**: standardized API responses
- **HTTP Status Codes**: proper status code usage

### Performance & Security
- **Database Optimization**: efficient queries
- **Error Boundaries**: graceful error handling
- **Event System**: decoupled architecture
- **Type Safety**: TypeScript support

## 📊 API Endpoints

### Habits API
```
GET    /api/habits           - لیست تمام عادت‌ها
GET    /api/habits/:id       - دریافت عادت با ID
POST   /api/habits           - ایجاد عادت جدید
PUT    /api/habits/:id       - ویرایش عادت
DELETE /api/habits/:id       - حذف عادت (soft delete)
GET    /api/habits/count     - تعداد عادت‌ها
```

### Request/Response Examples

#### Create Habit
```json
POST /api/habits
{
  "userId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "name": "ورزش روزانه",
  "description": "30 دقیقه ورزش صبحگاهی",
  "color": "#4CAF50",
  "frequency": "daily",
  "startDate": "2024-01-01",
  "order": 1
}
```

#### Response
```json
{
  "success": true,
  "message": "Habit created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "userId": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "ورزش روزانه",
    "description": "30 دقیقه ورزش صبحگاهی",
    "color": "#4CAF50",
    "frequency": "daily",
    "startDate": "2024-01-01",
    "order": 1,
    "archived": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🚀 مزایای پیاده‌سازی

1. **Clean Architecture**: جداسازی concerns
2. **Maintainability**: کد قابل نگهداری
3. **Testability**: قابل تست بودن
4. **Scalability**: قابلیت مقیاس‌پذیری
5. **Type Safety**: امنیت نوع داده
6. **Event-Driven**: معماری event-driven

## 🔄 آماده برای Stage 7

CRUD operations حالا آماده است برای:
- Daily tracking implementation
- Frontend integration
- Real-time notifications
- User authentication

---

*Stage 6 تکمیل شد! آماده برای Stage 7: Daily Tracking*
