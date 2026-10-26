# Form Six Helper TZ — Production Deployment & Setup Guide

This guide details the steps required to configure, deploy, and verify **Form Six Helper TZ** on Vercel with PostgreSQL (Supabase Auth & Database) and Google Gemini AI.

---

## 1. Architecture Overview

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS 4, Motion, Lucide icons.
- **Backend & Serverless API**: Express server running on port 3000 locally, exported via `/api/index.ts` for Vercel Serverless Functions (`/api/*`).
- **Database & Authentication**: Supabase Auth (Email & Password with Email Verification) + PostgreSQL with Row Level Security (RLS).
- **AI Assistant**: Server-side proxy (`POST /api/chat`) calling `@google/genai` with model `gemini-3.8-flash`. Keys remain server-side only; zero client PII is sent to Gemini.
- **Contact & Portal Health**: Real validation, rate limiting, bot honeypot protection, duplicate prevention, and real HTTP health checks.

---

## 2. Environment Variables

Configure the following environment variables in your local `.env` and Vercel Project Settings (**Settings > Environment Variables**):

| Variable | Scope | Description |
|---|---|---|
| `GEMINI_API_KEY` | Server-only | Google AI Studio API key used by `server.ts` |
| `VITE_SUPABASE_URL` | Client & Server | Your Supabase project URL (`https://xyzcompany.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Client & Server | Your Supabase public anonymous API key |
| `ALLOWED_ORIGIN` | Server-only | Allowed CORS origin (e.g. `https://mywebsite-eo63ya610-ralphdevtz.vercel.app`) |
| `NODE_ENV` | Server-only | `production` |

---

## 3. Database & Supabase Auth Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a free PostgreSQL project.
2. **Execute Database Schema**:
   - Open the **SQL Editor** in your Supabase Dashboard.
   - Copy and paste the entire contents of `supabase/schema.sql`.
   - Click **Run**. This provisions:
     - `public.profiles` (student profile linked to `auth.users`)
     - `public.checklists` (student checklist progress with RLS)
     - `public.activity_logs` (student audit timeline with RLS)
     - `public.contact_messages` (persisted contact submissions)
     - Automated `handle_new_user()` trigger for new sign-ups.
3. **Configure Email Verification**:
   - In Supabase, go to **Authentication > Providers > Email**.
   - Ensure **Confirm email** is enabled.
   - Under **URL Configuration**, set the Site URL to your application deployment domain (e.g., `https://mywebsite-eo63ya610-ralphdevtz.vercel.app`).
   - (Recommended) Configure Custom SMTP under **Project Settings > Authentication > SMTP Settings** to send branded emails from your domain.

---

## 4. Deploying to Vercel

The repository is already configured with `vercel.json` and `api/index.ts`.

1. **Push Code to GitHub**:
   ```bash
   git add .
   git commit -m "Production hardening: real auth, email verification, API security, and vitest suite"
   git push origin main
   ```
2. **Import into Vercel**:
   - Connect your GitHub repository in the Vercel dashboard.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add Environment Variables**:
   - Add `GEMINI_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `ALLOWED_ORIGIN`.
4. **Deploy**:
   - Click **Deploy**. Vercel will automatically build the static assets to `/dist` and route `/api/*` to `/api/index.ts`.

---

## 5. Automated Testing & Verification

Run tests locally anytime:
```bash
# Run Vitest automated test suite
npm test

# Run TypeScript typecheck
npm run lint

# Build production bundle
npm run build
```

All 11 unit and integration tests verify:
- School & private NECTA index validation rules.
- Tanzanian phone format rules.
- Bot honeypot detection.
- Legitimate HTTPS `.go.tz` portal URLs.
- Factual and statutory fee qualification transparently.
