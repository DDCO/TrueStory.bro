# TrueStory – Crowdsourced Truth-Focused News Platform

A platform that tracks **events** (not articles), where every piece of information is a **claim with evidence**, contributors have **reputation scores**, and the crowd can **fact-check** and participate in **prediction markets**.

## Architecture

- **Frontend**: React (Vite) + TypeScript – event/claim browsing, reputation, fact-checking UI, prediction markets
- **Backend**: NestJS + TypeScript – REST API, PostgreSQL via TypeORM
- **Infra**: Docker Compose (PostgreSQL, backend, frontend)

## Features

1. **Events** – Each event (e.g. “Bridge collapse in Lisbon”) has a timeline of reports, eyewitness accounts, media, official statements, and analysis.
2. **Claims with evidence** – Claims have labels: Unverified → Evidence provided → Multiple confirmations → Confirmed. Each claim can have attached evidence (documents, videos, links).
3. **Login** – Contributors can sign in with **Google** or **Facebook** (OAuth). JWT is issued and used for authenticated requests.
4. **Reputation** – Contributors get a reliability score that goes up (confirmed reports, correct fact-checks) or down (false claims, repeated corrections).
5. **Crowd fact-checking** – Users can challenge claims, add counter-evidence, confirm reports, or add context (Community Notes–style, attached to claims).
6. **Prediction markets** – Users predict the probability that a claim will turn out true; good predictors gain reputation.
7. **Create Events** – Anyone can propose an event, Event starts as unverified, Event becomes public after community confirmation, High-reputation users and verified reporters can bypass event verification

## Quick start

```bash
# From project root
docker compose up --build
```

- **Frontend**: http://localhost:5173 (Vite proxies `/api` to the backend)
- **Backend API**: http://localhost:3000/api (e.g. http://localhost:3000/api/events)  

## Development without Docker

### Backend

```bash
cd backend
cp .env.example .env   # set DATABASE_URL if needed
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Database

Ensure PostgreSQL is running and create a database `truestory`, or use the one from Docker:

```bash
docker compose up postgres -d
# then run backend with DATABASE_URL=postgresql://truestory:truestory_secret@localhost:5432/truestory
```

## Sample data (optional)

With the stack running, you can create an event and a claim via the API:

```bash
# Create a user (contributor)
curl -s -X POST http://localhost:3000/api/users -H "Content-Type: application/json" \
  -d '{"displayName":"Reporter1"}'

# Create an event (use the slug you want)
curl -s -X POST http://localhost:3000/api/events -H "Content-Type: application/json" \
  -d '{"title":"Bridge collapse in Lisbon","slug":"bridge-collapse-lisbon","description":"Ongoing coverage."}'

# Create a claim (replace EVENT_ID and USER_ID with IDs from above)
curl -s -X POST http://localhost:3000/api/claims -H "Content-Type: application/json" \
  -d '{"eventId":"EVENT_ID","authorId":"USER_ID","content":"Three people were injured in the collapse.","status":"evidence_provided"}'
```

Then open http://localhost:5173 and you should see the event and its timeline.

## Login with Google / Facebook

Contributors can log in via the header buttons. To enable OAuth:

1. **Google**: Create a project in [Google Cloud Console](https://console.cloud.google.com/), enable the Google+ API (or Google Identity), create OAuth 2.0 credentials (Web application), and set the authorized redirect URI to `http://localhost:3000/api/auth/google/callback` (or your backend URL in production).
2. **Facebook**: Create an app in [Facebook for Developers](https://developers.facebook.com/), add Facebook Login, and set the valid OAuth redirect URI to `http://localhost:3000/api/auth/facebook/callback`.

Set these in the backend environment (e.g. in `backend/.env` or `docker-compose`):

- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
- `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`, `FACEBOOK_CALLBACK_URL`
- `JWT_SECRET` (min 32 chars in production), `FRONTEND_URL` (where to redirect after login, e.g. `http://localhost:5173`)

If these are not set, the app still runs; Google/Facebook login will fail until credentials are configured.

## Project layout

```
TrueStory.bro/
├── docker-compose.yml
├── backend/          # NestJS API
│   ├── src/
│   │   ├── events/
│   │   ├── claims/
│   │   ├── users/
│   │   ├── auth/        # Google/Facebook OAuth, JWT
│   │   ├── evidence/
│   │   ├── fact-checking/
│   │   └── predictions/
│   └── Dockerfile
└── frontend/         # React (Vite)
    ├── src/
    └── Dockerfile
```
