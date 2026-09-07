# Dev Journal

[![CI](https://github.com/Jermayy/dev-journal/actions/workflows/ci.yml/badge.svg)](https://github.com/Jermayy/dev-journal/actions/workflows/ci.yml)

A full-stack CRUD app for logging dated, tagged journal entries. Built as a portfolio project on the current Next.js/React stack with a Postgres-backed data layer.

**Live demo:** https://fe-starter-2026.vercel.app/

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, Server Actions) + [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) + PostgreSQL, hosted on [Neon](https://neon.tech/)
- [Mantine](https://mantine.dev/) component library + [Tailwind CSS](https://tailwindcss.com/) utilities
- [Zod](https://zod.dev/) for server-side input validation
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for unit tests
- Deployed on [Vercel](https://vercel.com/); CI on [GitHub Actions](https://github.com/features/actions)

## Features

- Create, edit, and delete journal entries (title + tag), with server-side validation
- Optimistic-feeling UX: submit buttons show a pending state and disable while a Server Action is in flight, preventing duplicate submissions
- Loading skeletons and error boundaries for the entries list

## Getting Started

### Prerequisites

- Node.js 24+ (see `volta` field in `package.json`)
- A PostgreSQL database (a free [Neon](https://neon.tech/) instance works well)

### Setup

```bash
git clone git@github.com:Jermayy/dev-journal.git
cd dev-journal
npm install
```

Create a `.env` file with your database connection string:

```bash
cp .env.example .env
# then set DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
```

Apply migrations and seed sample data:

```bash
npx prisma migrate dev
npm run seed
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:3000` (redirects to `/entries`).

## Scripts

| Command                 | Description                                |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Start the Next.js dev server                |
| `npm run build`         | Production build                            |
| `npm run start`         | Serve the production build                  |
| `npm run seed`          | Seed the database with sample entries       |
| `npm test`              | Run the test suite in watch mode            |
| `npm run test:run`      | Run the test suite once                     |
| `npm run test:coverage` | Run the test suite with a coverage report   |

## Testing

Unit and component tests live alongside the source files they cover (`*.test.ts` / `*.test.tsx`), using Vitest with jsdom and React Testing Library. Prisma and `next/navigation` are mocked, so the suite never touches a real database.

Coverage is enforced via `npm run test:coverage` (thresholds set in `vitest.config.ts`); the report is written to `coverage/`.

## Continuous Integration

Every push and pull request runs lint, type checking, the test suite with coverage, and a production build via [GitHub Actions](.github/workflows/ci.yml).

## Deployment

Deployed on Vercel. Set `DATABASE_URL` in the project's environment variables, and ensure migrations are committed to the repo so they run against the production database.
