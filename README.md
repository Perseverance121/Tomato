# 🌱 Grow Safe Guide

A Next.js app that helps UK gardeners know when it's safe to plant tender crops outside, using real-time weather data from Open-Meteo.

## Features

- ✅ **Real weather data** via Open-Meteo (free, no API key needed)
- ✅ **Server-side rendered** — Google can index every page
- ✅ **Email alerts** via Resend — subscribers get notified when frost is forecast
- ✅ **Google Ads** ready
- ✅ **SEO optimised** with metadata, sitemap, robots.txt
- ✅ **Planting calendar** page for additional search traffic

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

You need:
- **RESEND_API_KEY** — get a free key at [resend.com](https://resend.com)
- **RESEND_FROM_EMAIL** — a verified email/domain in your Resend account
- **ADMIN_EMAIL** — optional, where new subscriber notifications go

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import your repo
3. Add environment variables in Vercel dashboard (Settings → Environment Variables)
4. Deploy!

## Update ad slots

In `src/components/FrostTracker.tsx`, replace `YOUR_AD_SLOT_ID` and `YOUR_AD_SLOT_ID_2` with your actual Google AdSense slot IDs.

## Domain

Update all references to `growsafeguide.com` in:
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/api/subscribe/route.ts`
