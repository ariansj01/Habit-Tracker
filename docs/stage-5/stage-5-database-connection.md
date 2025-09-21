# Stage 5: اتصال به دیتابیس و مدل‌سازی

## 🎯 هدف
پیاده‌سازی اتصال به MongoDB و ایجاد مدل‌های User و Habit با validation و indexing مناسب.

## ✅ کارهای انجام شده

### 1. نصب و پیکربندی MongoDB
- **MongoDB**: نصب و راه‌اندازی
- **Mongoose**: ODM برای MongoDB
- **Connection Pooling**: مدیریت اتصالات
- **Environment Variables**: تنظیمات امن

### 2. مدل User
```javascript
const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  passwordHash: { type: String, required: true },
  displayName: { 
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 50 
  },
  avatarUrl: { type: String },
  timezone: { type: String },
  settings: {
    weekStart: { type: Number, default: 6 },
    locale: { type: String, default: 'fa-IR' },
    notificationsEmailEnabled: { type: Boolean, default: false }
  }
}, { timestamps: true });
```

### 3. مدل Habit
```javascript
const HabitSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true, 
    minlength: 2, 
    maxlength: 60 
  },
  description: { type: String, maxlength: 300 },
  archived: { type: Boolean, default: false, index: true },
  color: { type: String },
  frequency: { type: String, enum: ['daily'], default: 'daily' },
  startDate: { type: String },
  order: { type: Number }
}, { timestamps: true });
```

### 4. Indexing Strategy
```javascript
// User indexes
UserSchema.index({ email: 1 }, { unique: true });

// Habit indexes
HabitSchema.index({ userId: 1, archived: 1 });
HabitSchema.index(
  { userId: 1, name: 1 },
  { unique: true, partialFilterExpression: { archived: false } }
);
```

### 5. Database Connection
```javascript
// src/repositories/config.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
```

## 🔧 ویژگی‌های پیاده‌سازی شده

### Validation
- **Schema Validation**: Mongoose schema validation
- **Custom Validators**: برای فیلدهای خاص
- **Error Handling**: مدیریت خطاهای validation

### Performance
- **Indexing**: بهینه‌سازی queries
- **Connection Pooling**: مدیریت اتصالات
- **Query Optimization**: کاهش database calls

### Security
- **Environment Variables**: حفاظت از credentials
- **Data Sanitization**: پاک‌سازی ورودی‌ها
- **Type Safety**: TypeScript definitions

## 📊 Database Design

### Relationships
- **User → Habits**: One-to-Many relationship
- **Referential Integrity**: با ObjectId references
- **Cascade Operations**: مدیریت حذف وابسته

### Data Types
- **String**: نام، توضیحات، رنگ
- **Boolean**: وضعیت archived
- **Number**: ترتیب، تنظیمات
- **ObjectId**: روابط بین جداول
- **Date**: timestamps خودکار

## 🚀 مزایای پیاده‌سازی

1. **Scalability**: طراحی برای مقیاس‌پذیری
2. **Performance**: Indexing و query optimization
3. **Maintainability**: کد تمیز و قابل نگهداری
4. **Type Safety**: TypeScript support
5. **Security**: Validation و sanitization

## 🔄 آماده برای Stage 6

Database layer حالا آماده است برای:
- Repository pattern implementation
- CRUD operations
- Business logic layer
- API endpoints

---

*Stage 5 تکمیل شد! آماده برای Stage 6: CRUD Operations*
