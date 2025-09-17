### Stage 4 — Skeleton Frontend

**Goal**: ایجاد صفحات خالی، روتینگ Next.js، و ساختار Layout قابل گسترش

#### تصمیمات فنی

**Component Architecture**:
```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Route group
│   │   ├── habits/         # /habits
│   │   ├── add-habit/      # /add-habit
│   │   └── layout.tsx      # Dashboard layout
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # Base components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   └── features/           # Feature components
│       ├── habits/
│       └── tracking/
└── lib/
    ├── utils.ts            # Utility functions
    └── constants.ts        # App constants
```

**Design System Implementation**:
- CSS Variables برای theme colors
- Tailwind classes برای spacing و typography
- Responsive breakpoints: mobile-first

#### چالش‌ها و راه‌حل‌ها

**چالش 1: Layout Responsive**
- راه‌حل: Sidebar در desktop، drawer در mobile
- استفاده از `useMediaQuery` hook

**چالش 2: Theme Management**
- راه‌حل: `next-themes` + CSS variables
- localStorage برای persistence

**چالش 3: Navigation State**
- راه‌حل: URL-based navigation با Next.js router
- Active state management

#### صفحات اصلی

**1. Home Page (`/`)**:
- خلاصه امروز (placeholder)
- لیست عادت‌های امروز (placeholder)
- دکمه "Add New Habit"

**2. Habits List (`/habits`)**:
- جدول/کارت عادت‌ها (placeholder data)
- فیلتر و جستجو (UI only)
- دکمه‌های Add/Edit/Delete

**3. Add Habit (`/add-habit`)**:
- فرم ساده با validation
- دکمه‌های Save/Cancel

#### کامپوننت‌های Base

**Button Component**:
- Variants: primary, secondary, danger
- Sizes: sm, md, lg
- Loading state

**Input Component**:
- Types: text, email, password
- Error state
- Label و helper text

**Card Component**:
- Padding variants
- Hover effects
- Header/body/footer sections

#### Acceptance Criteria
- [ ] Layout responsive و کار می‌کند
- [ ] Navigation بین صفحات فعال است
- [ ] Theme toggle کار می‌کند
- [ ] کامپوننت‌های base قابل استفاده هستند
- [ ] صفحات اصلی با placeholder content موجودند
- [ ] Mobile experience مناسب است
