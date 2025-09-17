### Stage 3 — UI Design & Component Architecture

**Goal**: طراحی UI ابتدایی و انتخاب معماری کامپوننت‌ها

#### تصمیمات طراحی

**Design System**:
- رنگ‌های اصلی: سبز (success), قرمز (danger), خاکستری (neutral)
- Typography: Inter یا Geist (default Next.js)
- Spacing: 4px base unit (Tailwind default)
- Border radius: 8px برای cards، 4px برای buttons

**Layout Structure**:
```
┌─────────────────────────────────┐
│ Header (Logo + Theme Toggle)    │
├─────────────────────────────────┤
│ Navigation (Home, Habits, Stats)│
├─────────────────────────────────┤
│ Main Content                    │
│ ┌─────────┐ ┌─────────────────┐ │
│ │ Sidebar │ │ Page Content    │ │
│ │ (Stats) │ │                 │ │
│ └─────────┘ └─────────────────┘ │
└─────────────────────────────────┘
```

#### صفحات اصلی

**1. Home Page**:
- خلاصه امروز (تعداد عادت‌ها، درصد انجام)
- لیست عادت‌های امروز با وضعیت
- دکمه "Add New Habit"

**2. Habits List**:
- جدول/کارت عادت‌ها
- فیلتر (فعال/آرشیو)
- دکمه‌های Edit/Delete/Archive

**3. Add/Edit Habit**:
- فرم ساده: نام عادت، توضیحات (اختیاری)
- دکمه‌های Save/Cancel

**4. Daily Tracking**:
- تقویم ساده یا لیست روزانه
- تیک‌زدن برای هر عادت
- نمایش streak

#### معماری State

**تصمیم**: TanStack Query + Local State
- **TanStack Query**: برای server state (habits, daily logs)
- **Local State**: برای UI state (modals, forms, theme)

**دلایل**:
- سادگی برای MVP
- قابلیت گسترش به Zustand در آینده
- کمتر از Redux پیچیده

#### کامپوننت‌های اصلی

```
components/
├── ui/                 # Base components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Modal.tsx
├── layout/             # Layout components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── Layout.tsx
├── habits/             # Feature components
│   ├── HabitCard.tsx
│   ├── HabitForm.tsx
│   └── HabitList.tsx
└── tracking/           # Tracking components
    ├── DailyTracker.tsx
    └── Calendar.tsx
```

#### چالش‌ها و راه‌حل‌ها

**چالش 1: Responsive Design**
- راه‌حل: Mobile-first approach با Tailwind
- Sidebar در موبایل به صورت drawer

**چالش 2: Dark/Light Theme**
- راه‌حل: CSS variables + localStorage
- استفاده از `next-themes` برای Next.js

**چالش 3: Loading States**
- راه‌حل: Skeleton components
- TanStack Query loading states

#### Acceptance Criteria
- [ ] Design system تعریف شده (رنگ‌ها، فونت‌ها، spacing)
- [ ] Layout responsive و قابل استفاده
- [ ] کامپوننت‌های base ساخته شده‌اند
- [ ] معماری state انتخاب شده
- [ ] Wireframe یا mockup آماده است
