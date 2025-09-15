# Chirpy

Chirpy is a minimal Twitter-like API server built with TypeScript, Express, and PostgreSQL using Drizzle ORM.

## Features

- User registration and authentication with JWT and refresh tokens
- Chirp creation, retrieval, and deletion
- Admin endpoints for metrics and reset
- Webhook support for user upgrades
- Clean code structure with modular API and database layers

## Database

Chirpy uses PostgreSQL with Drizzle ORM for schema management and migrations. The schema includes users, chirps, and refresh tokens, with migrations tracked in the `src/db/migrations` folder.

## What I Learned

- Implementing secure authentication with JWT and refresh tokens
- Structuring a TypeScript Express API for clarity and maintainability
- Managing database schema and migrations with Drizzle ORM
- Writing robust error handling and middleware
- Building a simple, testable backend with modern TypeScript practices

## Getting Started

1. Clone the repo and install dependencies
2. Set up your `.env` with database and JWT secrets
3. Run migrations with `npm run migrate`
4. Start the server with `npm run dev`

See [src/index.ts](src/index.ts) for the entry point.
