# Prime Property — Animated Bilingual Version

## Run locally

```bash
npm install
npm run dev
```

## Routes

- `/` — Landing Page
- `/about` — About Us
- `/contact` — Contact
- `/agent/login` — Agent Login
- `/agent/dashboard` — Internal Dashboard

## Demo accounts

Superadmin:
- Email: `superadmin@primeproperty.id`
- Password: `Prime12345!`

Admin read-only:
- Email: `agent@primeproperty.id`
- Password: `Prime12345!`

## What's new

- Reactive animated background that follows the pointer.
- English and Indonesian language toggle.
- English is the default language.
- Agent Login is hidden from the public navbar and remains accessible through `/agent/login`.
- Superadmin mock dashboard with localStorage-based CRUD simulation.
- Animated drawer opening and closing.
- Vercel SPA fallback is included in `vercel.json`.
