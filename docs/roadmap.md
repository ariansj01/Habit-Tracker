### نقشه راه ۱۰ روزه — Simple Habit Tracker

این سند مراحل روزبه‌روز پروژه را نشان می‌دهد تا همراه پروژه پیش بروید. در هر روز هدف، جزئیات و چالش‌ها توضیح داده شده‌اند.

#### روزهای 1 تا 3

| روز | هدف | جزئیات و چالش |
| --- | --- | --- |
| **1** | **ایده و ساختار** | مشخص‌کردن MVP، کشیدن دیاگرام دیتابیس، تصمیم برای Stack (Next.js + Fastify + MongoDB). چالش: طراحی مدل داده برای عادت‌ها و پیگیری روزانه. |
| **2** | **راه‌اندازی ریپو و محیط** | ساخت مخزن GitHub، نصب Next.js، Tailwind، ESLint/Prettier. بک‌اند Fastify + TypeScript در پوشه جدا. چالش: تنظیم monorepo و مدیریت اسکریپت‌ها. |
| **3** | **طراحی UI ابتدایی** | طراحی صفحات Home، Habit List، Add Habit در Figma یا روی کاغذ. چالش: انتخاب ساختار کامپوننت‌ها و معماری State. |

#### روزهای 4 تا 6

| روز | هدف | جزئیات و چالش |
| --- | --- | --- |
| **4** | **Skeleton Frontend** | ایجاد صفحات خالی و روتینگ Next.js، NavBar، Layout. چالش: معماری پوشه‌ها و ساخت Layout قابل گسترش. |
| **5** | **اتصال به دیتابیس** | ✅ **تکمیل شده**: نصب MongoDB و Mongoose، ساخت مدل‌های User و Habit با validation کامل. طراحی ارتباط یک‌به‌چند (User→Habits) با indexing مناسب. |
| **6** | **CRUD عادت‌ها** | ✅ **تکمیل شده**: API کامل create/read/update/delete برای Habit. پیاده‌سازی Repository pattern، Service layer، و Controller layer. اضافه کردن middleware های امنیتی و validation. |

#### کارهای اضافی انجام شده

| ویژگی | توضیحات |
| --- | --- |
| **معماری MVC** | ✅ پیاده‌سازی کامل Model-View-Controller pattern با جداسازی concerns |
| **Middleware های امنیتی** | ✅ Helmet، CORS، Rate Limiting، Compression، Security Headers |
| **Event System** | ✅ Event Emitter برای اطلاع‌رسانی تغییرات habits |
| **Validation Layer** | ✅ Validation کامل با Joi و Zod برای ورودی‌ها |
| **Error Handling** | ✅ Centralized error handling و response formatting |
| **Repository Pattern** | ✅ جداسازی logic دیتابیس از business logic |
| **TypeScript Support** | ✅ پشتیبانی کامل TypeScript با type definitions |

#### روزهای 7 تا 9

| روز | هدف | جزئیات و چالش |
| --- | --- | --- |
| **7** | **پیگیری روزانه (Tracking)** | API برای ثبت «انجام شد/نشد» هر روز. چالش: ذخیره ساختار تاریخ (UTC vs local) و جلوگیری از ثبت تکراری. |
| **8** | **اتصال Frontend به API** | استفاده از TanStack Query برای fetch/mutate. چالش: مدیریت خطا و Loading states. |
| **9** | **صفحات اصلی Frontend** | صفحه لیست عادت‌ها، فرم افزودن، صفحه پیگیری روزانه. چالش: آپدیت optimistic و همگام‌سازی State. |

#### روز 10

| روز | هدف | جزئیات و چالش |
| --- | --- | --- |
| **10** | **دیپلوی و تست نهایی** | فرانت روی Vercel، بک روی Render/Railway. چالش: تنظیم Env متغیرها، CORS، و تست عملکرد کلی. |

---

یادداشت‌ها:
- MVP و مدل داده در `docs/stage-1/` توضیح داده شده‌اند.
- تمرکز این نقشه راه روی حداقل قابلیت‌های مفید است؛ ویژگی‌های اضافی (Reminder، Social، Gamification) پس از v0 بررسی می‌شوند.

