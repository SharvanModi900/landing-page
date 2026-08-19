# Contributing to PoPP Landing Page

Thank you for your interest in contributing to the **Proof of Problem Protocol (PoPP)** website. This project is open source under the [MIT License](LICENSE), and we welcome contributions of all kinds — from bug reports to feature implementations.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Coding Standards](#coding-standards)
- [Styling Guidelines](#styling-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Community](#community)

---

## Code of Conduct

By participating, you agree to keep interactions respectful and constructive. Harassment, discrimination, or disruptive behavior will not be tolerated.

---

## How Can I Contribute?

| Area | Description |
|------|-------------|
| **Bug Reports** | Found a broken link, layout issue, or runtime error? Open an issue. |
| **Feature Requests** | Have an idea for a new page or improvement? Start a discussion. |
| **Code Contributions** | Fix bugs, implement features, or improve performance. |
| **Documentation** | Improve README, inline comments, or this guide. |
| **Design & UX** | Suggest UI/UX improvements with mockups or descriptions. |
| **Translations** | Help localize content for broader reach. |

---

## Development Setup

### Prerequisites

- **Node.js** 18 or later
- **npm** 9+ (ships with Node.js)

### Getting Started

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/SharvanModi900/landing-page.git
cd landing-page

# 3. Install dependencies
npm install

# 4. Start the development server (runs on port 3021)
npm run dev
```

Open [http://localhost:3021](http://localhost:3021) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3021 with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint checks |
| `npm test` | Run test suite with Jest |

---

## Project Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Root landing page
│   ├── layout.tsx          # Root layout (metadata, fonts)
│   ├── globals.css         # Global styles (Tailwind)
│   ├── explorer/           # Problem explorer + detail view
│   ├── tokenomics/         # Token economics dashboard
│   ├── wallet/             # Wallet management
│   ├── validator-panel/    # Validator dashboard
│   └── ...                 # 60+ feature pages
├── components/             # Shared React components
│   ├── Navigation.tsx      # Main navigation bar
│   ├── Footer.tsx          # Site footer
│   ├── DarkSelect.tsx      # Reusable dark-themed select
│   └── ...
├── lib/                    # Utilities and providers
│   ├── wallet/             # Wallet connection context
│   └── ...
├── data/                   # Static data files
├── proto/                  # Protobuf definitions
└── store/                  # Redux store (if applicable)
```

### Key Technologies

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **Lucide React** | Icon library |
| **Redux Toolkit** | State management |
| **CosmJS** | Cosmos SDK wallet integration |
| **Leaflet** | Interactive maps |

### Path Aliases

Use `@/` to import from `src/`:

```tsx
import { useWallet } from "@/lib/wallet";
import DarkSelect from "@/components/DarkSelect";
```

---

## Coding Standards

### TypeScript

- Use **TypeScript** for all new files (`.tsx` for components, `.ts` for utilities).
- Define explicit types for props, state, and API responses — avoid `any` where possible.
- Use interfaces for object shapes, types for unions/aliases.

```tsx
// ✅ Good
interface Submission {
  id: string;
  title: string;
  status: "submitted" | "validating" | "resolved";
}

// ❌ Avoid
const data: any = await res.json();
```

### Component Patterns

- Use **functional components** with hooks.
- Add `"use client"` directive at the top for client components.
- Keep components focused — split large files into smaller, reusable pieces.
- Use descriptive names: `ValidatorDashboard` not `ValDash`.

```tsx
"use client";
import { useState } from "react";

interface Props {
  submissionId: string;
}

export default function SubmissionDetail({ submissionId }: Props) {
  const [data, setData] = useState<Submission | null>(null);
  // ...
}
```

### API Integration

- Backend API base URL: define as a constant at the top of the file.
- Always use `Promise.allSettled` for parallel API calls (graceful degradation).
- Handle loading, error, and empty states in every data-fetching component.

```tsx
const BACKEND_API = "https://popp.thharko.com";

const [statusRes, dataRes] = await Promise.allSettled([
  fetch(`${BACKEND_API}/api/status`),
  fetch(`${BACKEND_API}/api/data`),
]);
```

### Error Handling

- Wrap async operations in `try/catch`.
- Never let API failures crash the page — show graceful fallbacks.
- Use `console.warn` for non-critical failures.

---

## Styling Guidelines

### Tailwind CSS

- Use **Tailwind utility classes** — avoid custom CSS when possible.
- Follow the existing dark theme palette:

| Token | Class | Usage |
|-------|-------|-------|
| Background | `bg-[#030712]` | Page background |
| Card | `bg-white/5 border border-white/10` | Card surfaces |
| Primary | `from-cyan-500 to-blue-600` | Gradient CTAs |
| Text | `text-white`, `text-gray-400` | Primary/secondary text |
| Accent | `text-cyan-400`, `text-emerald-400` | Highlights |

### Responsive Design

- Mobile-first: start with base styles, add `sm:`, `md:`, `lg:` breakpoints.
- Test all pages at 320px, 768px, and 1440px widths.
- Use `max-w-5xl mx-auto px-4 sm:px-6` for content containers.

### Animations

- Use Framer Motion `motion.div` with `initial`/`animate`/`transition`.
- Keep animations subtle: `y: 10` offsets, `opacity: 0→1`, 0.3–0.5s durations.
- Use `viewport={{ once: true }}` for scroll-triggered animations.

---

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) for clear history:

```
feat: add fee recycling form to tokenomics page
fix: correct chain validations endpoint URL
style: improve dropdown contrast with DarkSelect component
docs: update contributing guidelines
refactor: extract chain lookup into reusable hook
perf: parallelize API calls in explorer detail page
chore: update dependencies
```

**Format:** `<type>: <short description>`

| Type | Usage |
|------|-------|
| `feat` | New feature or page section |
| `fix` | Bug fix |
| `style` | UI/visual changes (no logic change) |
| `docs` | Documentation only |
| `refactor` | Code restructure without behavior change |
| `perf` | Performance improvement |
| `chore` | Config, deps, tooling |

---

## Pull Request Process

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make changes** following the coding standards above.

3. **Test locally**:
   ```bash
   npm run lint    # No errors
   npm run build   # Builds successfully
   ```

4. **Commit** with a conventional commit message.

5. **Push** and open a Pull Request against `main`.

6. **Describe** your PR:
   - What changed and why
   - Screenshots for UI changes (before/after)
   - Any breaking changes or new dependencies

7. **Wait for review** — at least one approval is required before merge.

### PR Checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] New pages are responsive (mobile + desktop)
- [ ] API calls handle loading/error/empty states
- [ ] No hardcoded secrets or credentials
- [ ] Commit messages follow convention

---

## Reporting Bugs

Open an issue with:

1. **Title** — Clear, descriptive summary
2. **Steps to Reproduce** — Numbered list
3. **Expected vs Actual** behavior
4. **Environment** — OS, browser, Node.js version
5. **Screenshots** — If applicable

---

## Requesting Features

Open a discussion or issue with:

1. **Problem** — What problem does this solve?
2. **Proposal** — How should it work?
3. **Alternatives** — Other approaches considered
4. **Mockups** — Visual references if applicable

---

## Community

- **Discord**: [Join our server](https://discord.gg/u6GqfJBsm) for real-time discussion
- **X (Twitter)**: [@ShravanModi8](https://x.com/ShravanModi8) for announcements
- **Issues**: Use GitHub Issues for bugs and feature requests

## Related Repositories

- **[Website](https://github.com/SharvanModi900/landing-page)** — This repository (landing page, web interfaces)
- **[Protocol Research](https://github.com/SharvanModi900/proof-of-problem-protocol)** — Whitepaper, chapters, architecture blueprints, and protocol documentation

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for helping build a more transparent and accountable digital infrastructure.
