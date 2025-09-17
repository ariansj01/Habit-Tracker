### LinkedIn Post — Stage 2: راه‌اندازی ریپو و محیط

روز دوم پروژه: ساختار monorepo رو راه‌اندازی کردم! 🚀

**تصمیمات کلیدی:**
- Frontend: Next.js 15 + TypeScript + Tailwind v4
- Backend: Fastify (standalone) + MongoDB + Mongoose
- ساختار: دو پوشه جدا (habit-tracker/ و habit-tracker-back/)

**چالش‌ها:**
- مدیریت اسکریپت‌ها برای اجرای همزمان frontend/backend
- تنظیم shared types بین دو بخش
- Environment variables و CORS

**راه‌حل:**
- `concurrently` برای dev script
- پکیج shared برای types مشترک
- .env.example برای هر بخش

حالا آماده‌ام برای Stage 3: طراحی UI! 

#BuildInPublic #NextJS #Fastify #MongoDB #TypeScript
