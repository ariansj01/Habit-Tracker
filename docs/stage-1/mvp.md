### Stage 1 — MVP Scope (Simple Habit Tracker)

**Goal**: یک MVP سبک که کاربر بتواند عادت‌ها را بسازد، روزانه تیک بزند و Progress هفتگی/ماهانه را ببیند.

#### What ships in v0
- ایجاد حساب کاربری پایه (ایمیل اختیاری در v0؛ صرفاً نام مستعار/Device ID)
- CRUD عادت‌ها (name، frequency ساده: daily)
- Log روزانه (done/skip) با تاریخ
- نمای کلی امروز (لیست عادت‌ها + وضعیت امروز)
- خلاصه هفتگی/ماهانه (تعداد روزهای انجام و streak ساده)

#### Non-goals (v0)
- Reminder/Notification
- Social/Share
- Advanced scheduling (e.g., weekly pattern)
- Gamification/points
- Collaboration

#### Risks & Challenges
- تعریف مدل داده که هم ساده باشد هم قابلیت توسعه داشته باشد
- مدیریت timezone برای ثبت روزانه
- جلوگیری از ثبت‌های تکراری یا late-editing با کنترل‌های مناسب

#### Acceptance Criteria
- ایجاد/ویرایش/حذف عادت‌ها کار می‌کند
- می‌توان هر روز برای هر عادت یک وضعیت ثبت کرد
- خلاصه‌های هفتگی/ماهانه محاسبه می‌شوند

