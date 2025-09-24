# Habit Tracker – Frontend (Next.js 14)

## Overview
A Persian RTL-friendly habit tracking UI built with Next.js App Router, React Query, and Tailwind. It supports large-scale usage via client-side caching, pagination-ready API, and resilient UX.

## Tech
- Next.js 14 (App Router)
- TypeScript
- React Query (@tanstack/react-query)
- Tailwind CSS
- next/font (Vazirmatn, Geist)
- Axios

## Getting Started
1. Install deps
```bash
npm install
```
2. Environment
```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend base, e.g.
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
```
3. Run
```bash
npm run dev
```

## Key Features
- Axios client with auth interceptors (`src/lib/api-client.ts`)
- React Query for list/detail mutations with invalidation (`src/lib/hooks/use-habits.ts`)
- Toggle complete/unarchive with optimistic UX
- Real streaks fetched from backend; robust fallback to 0 when endpoint not ready
- RTL and Persian font via `next/font` (Vazirmatn)
- Sidebar layout applied across dashboard pages

## Project Structure
- `src/app` – routes and pages
- `src/components` – UI, layout, providers
- `src/lib` – API, hooks, utils

## Scripts
- `dev` – start dev server
- `build` – production build
- `start` – run production

## Notes
- Ensure you login to obtain JWT so protected endpoints work.
- Pagination is backend-driven; frontend reads pages by query params when needed.

## Scaling
- Virtualization can be added with `react-virtuoso` or `react-window` for very large lists.
- Fine-tune React Query `staleTime`/`gcTime` for traffic patterns.
