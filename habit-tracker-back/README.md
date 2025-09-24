# Habit Tracker – Backend (Node.js + Express + MongoDB)

## Overview
Express API for a habit tracker with JWT auth, user-scoped data, pagination, completion logs, and streak computation. Built for scale-readiness (indexes, filters, rate limiting ready).

## Tech
- Node.js + Express
- MongoDB + Mongoose
- JWT auth

## Setup
1. Install deps
```bash
npm install
```
2. Environment
```bash
cp env.example .env
# Required
# MONGODB_URI=mongodb://localhost:27017/habit-tracker
# JWT_SECRET=change-me
# PORT=3000
```
3. Run
```bash
npm run dev
```

## Models
- `User`
- `Habit` (indexed by `userId`, `archived`, `createdAt`)
- `Completion` (unique by `userId, habitId, date`)

## Key Endpoints
- Auth
  - `POST /api/login`
- Habits
  - `GET /api/habits?page=1&limit=20&archived=true|false`
  - `GET /api/habits/:id`
  - `POST /api/habits/`
  - `PUT /api/habits/:id`
  - `PATCH /api/habits/:id/archive`
  - `DELETE /api/habits/:id`
  - `GET /api/habits/count`
- Streaks
  - `GET /api/habits/:id/streak`
  - `GET /api/habits/streaks`

## Behavior
- All resources are scoped to the authenticated user (via JWT).
- On toggle complete/archive, a Completion log for today is upserted/removed and streak recomputed from recent logs.

## Scaling Notes
- Indexes added: `userId, archived` and `userId, createdAt`.
- Add Redis for caching hot reads and a rate limiter in production.
- Use health probes, structured logging, and proper timeouts.

## Scripts
- `dev` – nodemon
- `start` – production
