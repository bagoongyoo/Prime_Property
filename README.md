# Prime Property — React + Tailwind CSS

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka URL yang muncul dari Vite, biasanya:

```bash
http://localhost:5173
```

## Route tersedia

- `/` — Landing Page
- `/about` — Tentang Kami
- `/contact` — Kontak
- `/agent/login` — Login Agent

## Demo login

- Email: `agent@primeproperty.id`
- Password: `Prime12345!`

## Catatan production

Frontend ini sudah siap untuk integrasi backend, tetapi session `httpOnly cookie`, bcrypt, CSRF, rate limit final, dan authorization role tetap wajib di-handle dari backend.


## Deploy Vercel

Pastikan setting Vercel seperti ini:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

File `vercel.json` sudah disiapkan untuk SPA fallback agar `/about`, `/contact`, dan `/agent/login` tidak blank/404 saat di-refresh.
