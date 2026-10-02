# 7Hills Web Solutions

Official website and admin panel for **7Hills Web Solutions** — a premium web development agency.

Built with [Next.js 16](https://nextjs.org) (App Router), Tailwind CSS v4, and PostgreSQL (via [Neon](https://neon.tech)).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.6 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Neon (serverless) |
| Auth | Custom HMAC session tokens (bcryptjs) |
| Hosting | Vercel |

---

## Project Structure

```
7hills-web-solutions/
├── app/
│   ├── (public)/          # Public-facing pages (Homepage, About, Services, etc.)
│   ├── admin/             # Admin panel pages (auth-protected)
│   └── api/               # API routes (REST endpoints)
├── components/
│   ├── admin/             # Admin UI components
│   └── public/            # Public UI components
├── lib/
│   ├── auth.js            # Session token creation & verification
│   ├── db.js              # Database client (Neon/PostgreSQL)
│   ├── ids.js             # Code generator utilities
│   └── utils.js           # Shared helpers
├── public/                # Static assets (images, logo, etc.)
└── data/                  # (Local dev only) SQLite DB — gitignored
```

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm 9+
- A [Neon](https://neon.tech) account (free tier) OR a local PostgreSQL instance

### 1. Clone the repository

```bash
git clone https://github.com/SanjayElumalai2006/7hills-web-solutions.git
cd 7hills-web-solutions
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# Required — from your Neon project dashboard (or local Postgres)
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require

# Required — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
SESSION_SECRET=your-random-64-char-hex-string
```

### 4. Initialize the database

On first start the app auto-creates all tables and seeds initial data (admin user, sample customers, etc.).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)
- Default email: `sanjayelumalai7363@gmail.com`
- Default password: `Sanjay@2006`

> ⚠️ **Change the default admin password immediately after first login in production.**

---

## Development Workflow

```bash
npm run dev      # Start development server (Turbopack, hot-reload)
npm run build    # Production build
npm run start    # Serve production build locally
npm run lint     # Run ESLint
```

### Making Changes

1. Edit files in `app/`, `components/`, or `lib/`
2. The dev server auto-reloads
3. Commit changes with a clear message:
   ```bash
   git add .
   git commit -m "feat: add testimonials section to homepage"
   git push origin main
   ```
4. Vercel automatically deploys on push to `main`

---

## Deployment (Vercel + Neon)

### First-time Setup

1. **Create a Neon project** at [neon.tech](https://neon.tech) — free tier is sufficient
2. Copy your Neon connection string (pooled, for serverless)
3. **Import the GitHub repo into Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select `SanjayElumalai2006/7hills-web-solutions`
   - Framework preset: **Next.js** (auto-detected)
4. **Set environment variables in Vercel dashboard:**
   - `DATABASE_URL` — your Neon pooled connection string
   - `SESSION_SECRET` — a 64-char random hex string
5. Deploy — Vercel handles everything else

### Continuous Deployment

| Trigger | Result |
|---|---|
| Push to `main` | Production deployment at your `.vercel.app` URL |
| Push to any other branch | Preview deployment at a unique URL |
| Pull request | Preview deployment with URL posted in the PR |

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string (Neon pooled URL) |
| `SESSION_SECRET` | ✅ Yes | Secret key for HMAC session tokens — keep it long and random |

> **Never commit real values** — use Vercel's environment variable settings or a local `.env.local` file (gitignored).

---

## Database Schema

The following tables are auto-created on startup:

- `users` — Admin accounts
- `customers` — Client records
- `enquiries` — Sales leads
- `requirements` — Project requirement submissions (from wizard)
- `projects` — Active/completed projects
- `project_tasks` — Tasks linked to projects
- `portfolio` — Published portfolio entries
- `contact_messages` — Website contact form submissions
- `files` — File attachments

---

## Admin Panel Features

- **Dashboard** — Overview stats and recent activity
- **Customers** — CRM-style client management
- **Enquiries** — Lead tracking and status management
- **Requirements** — Submitted project requirement forms
- **Projects** — Project progress tracking
- **Tasks** — Per-project task management
- **Portfolio** — Manage published portfolio entries
- **Messages** — Contact form inbox
- **Settings** — Site/admin configuration

---

## Public Pages

- `/` — Homepage (hero, services, process, portfolio preview, CTA)
- `/about` — About the agency
- `/services` — Services offered
- `/process` — How we work
- `/portfolio` — Portfolio grid
- `/portfolio/[slug]` — Individual project case study
- `/contact` — Contact form
- `/faq` — FAQ
- `/start-project` — Project requirement wizard

---

## License

Private — All rights reserved. © 2026 7Hills Web Solutions.
