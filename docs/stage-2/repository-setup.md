### Stage 2 — Repository Setup & Environment

**Goal**: راه‌اندازی ساختار پروژه، monorepo، و محیط توسعه

#### تصمیمات فنی

**Monorepo Structure**:
```
habit-tracker/
├── habit-tracker/          # Frontend (Next.js)
├── habit-tracker-back/     # Backend (Fastify)
└── docs/                   # Documentation
```

**Frontend Stack**:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint + Prettier

**Backend Stack**:
- Fastify (standalone server)
- TypeScript
- MongoDB + Mongoose
- Zod (validation)

#### چالش‌ها و راه‌حل‌ها

**چالش 1: مدیریت اسکریپت‌ها**
- راه‌حل: استفاده از `concurrently` برای اجرای همزمان frontend و backend
- اسکریپت‌های root: `dev`, `build`, `start`

**چالش 2: Shared Types**
- راه‌حل: پکیج `shared` برای types مشترک بین frontend و backend
- یا استفاده از path mapping در TypeScript

**چالش 3: Environment Variables**
- راه‌حل: فایل‌های `.env.example` برای هر بخش
- متغیرهای مشترک: `MONGODB_URI`, `JWT_SECRET`

#### فایل‌های کلیدی

**Root package.json**:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd habit-tracker && npm run dev",
    "dev:backend": "cd habit-tracker-back && npm run dev"
  }
}
```

**Backend Structure**:
```
habit-tracker-back/
├── src/
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middleware/     # Auth, validation
│   └── utils/          # Helpers
├── package.json
└── .env.example
```

#### Acceptance Criteria
- [ ] هر دو پروژه (frontend/backend) به صورت جداگانه اجرا می‌شوند
- [ ] ESLint و Prettier روی هر دو بخش کار می‌کند
- [ ] Environment variables به درستی تنظیم شده‌اند
- [ ] ساختار پوشه‌ها منطقی و قابل گسترش است
