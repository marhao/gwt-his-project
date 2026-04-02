# GEMINI.md - Project Context: GWT HIS (MedCore HIS)

This document provides essential context for AI assistants working on the GWT HIS project, a Hospital Information System monorepo.

## Project Overview
GWT HIS is a modern Hospital Information System composed of an AdonisJS backend and a Next.js frontend. It is designed to manage patient records, outpatient department (OPD) visits, and various medical administrative tasks, integrating with Thai national health services (NHSO).

- **Backend (`gwt-api`):** Built with **AdonisJS 6**, using TypeScript and MySQL. It follows a traditional MVC/Service pattern and integrates with a legacy HIS database schema (resembling HOSxP).
- **Frontend (`his-web`):** Built with **Next.js 16**, using TypeScript, Tailwind CSS, and Lucide React. It provides a dashboard-driven UI for hospital staff.

---

## Directory Structure

### `gwt-api/` (Backend)
- `app/controllers/`: API route handlers.
- `app/models/`: Lucid ORM models mapping to the database (e.g., `Patient`, `Visit`, `User`).
- `app/services/`: Business logic layer (e.g., `SerialService`, `NhsoService`).
- `app/validators/`: Input validation logic using VineJS.
- `database/migrations/`: Database schema definitions (primarily for system-specific tables like `users` and `access_tokens`).
- `start/routes/`: Route definitions organized by module (Auth, Patients, OPD, etc.).
- `config/`: Application configuration (Database, Auth, CORS, etc.).

### `his-web/` (Frontend)
- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components (UI primitives, feature-specific components).
- `src/hooks/`: Custom React hooks for data fetching and state management.
- `src/lib/api.ts`: Centralized API client using Fetch API.
- `src/lib/types/`: TypeScript definitions and interfaces.
- `src/styles/`: Global CSS and Tailwind configurations.

---

## Technical Stack & Dependencies

### Backend
- **Framework:** AdonisJS 6
- **ORM:** Lucid (MySQL)
- **Validation:** VineJS
- **Authentication:** JWT via `@adonisjs/auth`
- **Documentation:** Auto-generated Swagger via `adonis-autoswagger`
- **Testing:** Japa

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **State/Data Fetching:** Custom hooks wrapping standard Fetch API

---

## Key Features & Domain Logic
- **Patient Management:** Comprehensive patient demographics (HN, CID, address, relatives, blood group, allergies).
- **RBAC (Role-Based Access Control):** Highly granular system managing Users, Groups, Roles, Permissions, and Menus.
- **Lookup System:** Standardized medical lookups (Prefixes, Occupations, Nationalities, Religions, Education levels).
- **NHSO Integration:** Services for checking health rights and authentication with the Thai National Health Security Office.
- **OPD Visits:** Managing outpatient visits and registration.
- **Death Records:** Registration and lookup for death-related information.

---

## Development Workflow

### Backend (`gwt-api`)
- **Run Development:** `npm run dev` (Starts AdonisJS server with HMR)
- **Build:** `npm run build`
- **Run Migrations:** `node ace migration:run`
- **Linting:** `npm run lint`
- **Typecheck:** `npm run typecheck`

### Frontend (`his-web`)
- **Run Development:** `npm run dev` (Starts Next.js dev server)
- **Build:** `npm run build`
- **Linting:** `npm run lint`

---

## Known Configurations & Conventions
- **API Base URL:** Defaulted to `http://localhost:3333/api/v1` in frontend development.
- **Database Schema:** Uses a legacy style with `snake_case` column names (e.g., `hos_guid`, `hn_int`).
- **Naming Conventions:**
    - Backend: `camelCase` for variables/methods, `PascalCase` for classes/models, `snake_case` for database columns.
    - Frontend: `camelCase` for variables/props, `PascalCase` for components.
- **Environment Variables:** Required `.env` files in both directories. `his-web/.env.example` may contain merge conflict markers that need cleaning.

## Future Considerations
- Database migrations for the core HIS tables are not present in this repo (legacy/external). Only system-specific tables are managed via migrations.
- WebSocket support is indicated in some environment variables (`NEXT_PUBLIC_WS_URL`) but might not be fully implemented yet.
