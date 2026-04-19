# EduReach College Intelligence Platform

A full-stack education website built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

## Project Structure

- `client/vite-project` — React frontend
- `server` — Node.js/Express backend
- `server/knowledge-base/edureach-knowledge.txt` — knowledge corpus for the RAG agent

## Frontend Overview

The React app provides:

- Landing page with sections for hero, about, achievements, courses, mentors, and more
- Authentication pages: login and signup
- JWT-based auth using `localStorage`
- Conditional UI for authenticated users:
  - student life, events, counselor CTA, placement stats, and a chat interface
- Floating chat button opens a chat drawer for logged-in users
- Auth context in `client/vite-project/src/context/AuthContext.tsx`
- API service in `client/vite-project/src/services/api.ts`
- Auth service in `client/vite-project/src/services/auth.service.ts`

### Frontend routes

- `/` — Home page
- `/login` — Login page
- `/signup` — Signup page

## Backend Overview

The backend handles:

- User authentication with JWT
- Secure protected route for current user profile
- Chat endpoint powered by RAG and a knowledge base
- Outbound calling via VAPI
- Knowledge base indexing using Google GenAI embeddings and MongoDB vector search

### Key backend features

- `server/src/routes/auth.routes.ts`
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- `server/src/controllers/auth.controller.ts`
  - user registration, login, and profile retrieval
- `server/src/models/user.model.ts`
  - Mongoose `User` schema with name, email, password, phone, created_at
- `server/src/middleware/auth.middleware.ts`
  - JWT verification and request user injection
- `server/src/controllers/chat.controller.ts`
  - `POST /api/chat/message`
  - special fallback response for course inquiries
  - RAG answers for general knowledge-base questions
- `server/src/services/rag.service.ts`
  - loads `knowledge-base/edureach-knowledge.txt`
  - splits documents into vector chunks
  - embeds data with Google GenAI
  - stores vectors in MongoDB Atlas Vector Search
  - invokes a LangChain agent for retrieved responses
- `server/src/controllers/vapi.controller.ts`
  - `POST /api/vapi/call`
  - kickstarts outbound AI phone calls through VAPI
- `server/src/services/vapi.service.ts`
  - formats phone numbers and calls external VAPI API

## Environment Variables

The backend requires environment variables in `server/.env` or the environment:

- `MONGODB_URI` — MongoDB connection string
- `GOOGLE_API_KEY` — Google GenAI API key for embeddings and chat
- `VAPI_API_KEY` — VAPI authentication key
- `VAPI_PHONE_NUMBER_ID` — VAPI phone number ID
- `VAPI_ASSISTANT_ID` — VAPI assistant ID
- `CLIENT_URL` — optional frontend origin allowed by CORS (defaults to `http://localhost:5173`)
- `PORT` — optional backend port (defaults to `5000`)

## Setup

### Frontend

```bash
cd client/vite-project
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

The backend will:

1. connect to MongoDB
2. initialize the knowledge base with embeddings
3. start the Express server

## Notes

- The chat service uses a retrieval-augmented generation (RAG) workflow.
- A logged-in user can trigger an AI call attempt for certain queries.
- The frontend attaches the JWT token automatically to API requests.

## Useful files

- `client/vite-project/src/App.tsx` — main React router layout
- `client/vite-project/src/context/AuthContext.tsx` — auth state manager
- `server/src/app.ts` — Express app setup
- `server/src/server.ts` — server startup and knowledge-base initialization
- `server/src/services/rag.service.ts` — knowledge retrieval and LangChain agent
- `server/src/services/vapi.service.ts` — outbound call integration

---

Built as a demo education platform with auth, AI chat, and outbound AI calling features.
