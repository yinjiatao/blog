# Tao's Blog

[中文](./README.md)

> Exploring thoughts and practices on self-improvement, super individuals, one-person companies, and product growth.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **i18n**: next-intl v4 (Chinese / English)
- **Content**: Markdown (parsed by gray-matter)
- **Newsletter**: Resend API
- **Package Manager**: pnpm

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Production build
pnpm build

# Lint
pnpm lint
```

The dev server runs at [http://localhost:3000](http://localhost:3000), which redirects to `/zh` (default locale) automatically.

---

## Project Structure

```
.
├── app/
│   ├── [locale]/              # i18n page routes
│   │   ├── page.tsx           # Home
│   │   ├── about/             # About
│   │   ├── articles/[slug]/   # Article detail
│   │   ├── category/[category]/ # Category listing
│   │   └── subscribe/         # Subscribe
│   └── api/subscribe/         # Newsletter API
├── components/
│   └── blog/                  # Blog components
├── content/
│   └── posts/
│       ├── zh/                # Chinese articles
│       └── en/                # English articles
├── messages/
│   ├── zh.json                # Chinese translations
│   └── en.json                # English translations
├── lib/
│   └── posts.ts               # Post reading logic
├── i18n/
│   ├── routing.ts             # Routing config
│   └── request.ts             # Server-side i18n
└── proxy.ts                   # Routing middleware
```

---

## Writing Articles

Create a Markdown file under `content/posts/zh/` or `content/posts/en/` with the following frontmatter:

```yaml
---
title: 'Article Title'
excerpt: 'Short description shown in article lists'
date: 'YYYY-MM-DD'
category: 'self-improvement'
readTime: 5
slug: 'url-slug'
---
```

**Supported Categories:**

| slug                 | Display Name       |
| -------------------- | ------------------ |
| `self-improvement`   | Self-Improvement   |
| `super-individual`   | Super Individual   |
| `one-person-company` | One-Person Company |
| `viral-growth`       | Viral Growth       |
| `tools`              | Tools & Practice   |

> Note: Avoid ASCII double quotes inside double-quoted YAML strings — use curly quotes or single-quote the value.

---

## Environment Variables

Create `.env.local` in the project root:

```env
RESEND_API_KEY=your_resend_api_key
```

---

## Deployment

Recommended: deploy to [Vercel](https://vercel.com). Import the repo and set the `RESEND_API_KEY` environment variable.
