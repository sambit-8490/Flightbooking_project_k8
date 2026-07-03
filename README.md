# Air Tickets — Full Stack Flight Booking App

Book faster, manage smarter. A full-stack flight booking platform with user authentication, flight search, bookings, billing, and an admin dashboard.

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Context API for auth state

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT-based authentication
- bcrypt for password hashing

**Infra**
- Docker & Docker Compose (frontend, backend, mongo)

## Project Structure

```
├── backend
│   ├── config/db.js              # MongoDB connection
│   ├── controller/                # Route handlers (Auth, Airport, Billing, Booking, Flight)
│   ├── middleware/authMiddleWare.js   # auth & adminAuth JWT guards
│   ├── models/                    # Mongoose schemas
│   ├── routes/                    # Express routers
│   ├── index.js / server.js
│   └── Dockerfile
├── frontend
│   ├── src
│   │   ├── api/client.js          # API client (axios/fetch wrapper)
│   │   ├── components/            # UI components (Login, Signup, Booking, Admin, etc.)
│   │   ├── context/AuthContext.jsx
│   │   └── Layout/HomeLayout.jsx
│   └── Dockerfile
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Docker & Docker Compose installed

### Setup

1. Clone the repository
   ```bash
   git clone <repo-url>
   cd Full-stack-project
   ```

2. Create a `.env` file in `backend/` with the required variables (see below).

3. Start all services:
   ```bash
   docker-compose up -d
   ```

4. Access the app:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - MongoDB: `localhost:27017`

### Environment Variables (`backend/.env`)

| Variable          | Description                          |
|-------------------|---------------------------------------|
| `MONGO_URI` / `DB_URI` | MongoDB connection string (check `backend/config/db.js` for the exact name used) |
| `SECRET_KEY`      | JWT signing secret                    |
| `JWT_EXPIRES_IN`  | JWT token expiry (e.g. `1d`)          |
| `PORT`            | Backend server port (default `3000`)  |

## Authentication & Roles

- Users sign up with `name`, `email`, and `password`. New accounts are always created with `role: "user"` — there is no public signup path to become an admin.
- JWTs are issued on login and encode `id`, `email`, and `role`.
- Two middleware guards protect routes:
  - `auth` — requires a valid token.
  - `adminAuth` — requires a valid token **and** `role: "admin"`.

### Creating an Admin Account

Since signup never creates admins, use one of the following:

**Option 1 — Promote an existing user via MongoDB shell**
```bash
docker exec -it mongo mongosh
use <your-db-name>
db.users.updateOne(
  { email: "youradmin@example.com" },
  { $set: { role: "admin" } }
)
```
The user must log in again afterward to receive a new JWT reflecting the `admin` role.

**Option 2 — Run the seed script**
```bash

For Docker: 
docker exec -it backend node seedAdmin.js

```

```
For Kubernetes:

kubectl exec -it pod/backend-f576d874f-c8rh5 -- node seedAdmin.js

```

```
ADMIN: admin@example.com  and ChangeMe123!

``` 
 
This creates (or promotes) a designated admin account. Ensure the correct Mongo connection env variable is set inside the backend container before running.

## Core Features

- **Auth** — signup, login, JWT-based sessions
- **Flights** — browse and search available flights
- **Airports** — airport data used for flight search
- **Booking** — create and manage flight bookings
- **Billing** — payment/billing records tied to bookings
- **Admin Dashboard** — protected admin-only views and controls

## API Overview

| Resource  | Base Route      | Auth Required        |
|-----------|-----------------|-----------------------|
| Auth      | `/api/auth`     | No (public)            |
| Flights   | `/api/flights`  | Varies                 |
| Airports  | `/api/airports` | Varies                 |
| Bookings  | `/api/bookings` | Yes (`auth`)            |
| Billing   | `/api/billing`  | Yes (`auth`)            |
| Admin ops | —               | Yes (`adminAuth`)      |

*(Confirm exact route prefixes in `backend/routes/*.js` and `backend/server.js`.)*

## Scripts

| Location  | Command                          | Purpose                     |
|-----------|-----------------------------------|------------------------------|
| backend   | `node seedAdmin.js`               | Create/promote an admin user |
| root      | `docker-compose up -d`            | Start all services            |
| root      | `docker-compose down`             | Stop all services              |
| root      | `docker-compose logs -f backend`  | Tail backend logs               |

## License

Add your license here.
