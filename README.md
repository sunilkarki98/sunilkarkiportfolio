# Sunil Karki Portfolio

Personal portfolio built with Next.js, React, Tailwind CSS, Framer Motion, and React Three Fiber.

## Requirements

- Node.js 20.9+
- npm 9+

Use the version declared in `.nvmrc` when using nvm:

```bash
nvm use
npm ci
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the EmailJS values:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_*` values are intentionally available to the browser because EmailJS is used client-side. Configure EmailJS domain restrictions and rate limits before deploying.

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

Deploy to Vercel or another Node-compatible host. Configure the same EmailJS environment variables in the hosting provider and use Node 20.
