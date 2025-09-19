# Habit Tracker Backend

Backend API for Simple Habit Tracker built with Fastify, TypeScript, and MongoDB.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env
```

3. Update `.env` with your configuration:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 3001)

4. Start development server:
```bash
npm run dev
```

The server will be available at `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Habits (protected via `x-user-id` header for dev)
- `GET /api/habits` - List active habits for current user
- `GET /api/habits/:id` - Get habit by id (owner only)
- `POST /api/habits` - Create habit
  - body: `{ name, description?, color?, frequency?, startDate?, order? }`
- `PATCH /api/habits/:id` - Update habit (partial)
- `DELETE /api/habits/:id` - Archive habit (soft delete)

Add request header: `x-user-id: <some-user-id>` during development.

## Project Structure

```
src/
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic
├── middleware/     # Auth, validation
├── utils/          # Helpers
└── server.ts       # Main server file
```

## Tech Stack

- **Fastify**: Fast and low overhead web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Zod**: Schema validation
- **JWT**: Authentication
