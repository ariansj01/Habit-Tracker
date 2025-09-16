### Stage 1 — Stack Decision

**Frontend**: Next.js (App Router)

**Backend**: Fastify (as a standalone API server) — later can be deployed separately or behind Next.js route handler proxy.

**Database**: MongoDB (Atlas/local)

**ODM**: Mongoose

**Why this stack?**
- Next.js برای SSR/ISR و DX عالی
- Fastify سبک و سریع با اکوسیستم پلاگین
- MongoDB برای مدل سندی منعطف و مناسب عادت‌ها و لاگ‌های روزانه
- Mongoose برای اعتبارسنجی schema و روابط مرجع

**Dev scripts (planned)**
- `api:dev` برای اجرای Fastify API
- `web:dev` برای اجرای Next.js UI

در v0 تمرکز روی ساده‌سازی است؛ ارتباط UI و API می‌تواند ابتدا روی یک پورت لوکال با CORS ساده باشد.

