# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
```

Package manager: **pnpm** (not npm or yarn).

## Architecture

### i18n Routing

- Middleware lives in `proxy.ts` (Next.js 16 uses "proxy" not "middleware")
- All pages are under `app/[locale]/` — `locale` param is always a Promise and must be awaited
- Supported locales: `zh` (default), `en`
- Translation strings: `messages/zh.json` and `messages/en.json`
- Use `useTranslations()` in client components, `getTranslations()` in server components

### Data Layer

- Articles are Markdown files in `content/posts/{locale}/{slug}.md`
- `lib/posts.ts` provides all server-side post reading via gray-matter (no database)
- Posts are sorted by date descending; category slugs are English, display names via i18n

### Article Frontmatter

```yaml
title: "..."
excerpt: "..."
date: "YYYY-MM-DD"
category: "self-improvement" | "super-individual" | "one-person-company" | "viral-growth" | "tools"
readTime: 5   # minutes, number
slug: "url-slug"
```

Do not use ASCII double quotes inside double-quoted YAML strings — use curly quotes or single-quote the value.

### Key Patterns

- Server pages fetch data then pass to `*Client.tsx` components (e.g., `page.tsx` → `HomeClient.tsx`)
- GSAP animations run in `HomeClient.tsx` on the client side
- `Sidebar.tsx` + `SidebarWrapper.tsx` handle sidebar layout; `SidebarWrapper` is a server component that reads locale

### API Routes

- `POST /api/subscribe` — adds email to Resend contacts list; requires `RESEND_API_KEY` env var

### Environment Variables

- `RESEND_API_KEY` — required for newsletter subscription feature (set in `.env.local`)
