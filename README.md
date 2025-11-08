<div align="center">

# Devlog AI

Developer logging & journaling companion with AI-powered insights.

</div>

---

## TL;DR

- **Stack**: Next.js 15 · TypeScript · Bun · Tailwind 4 · SCSS modules · shadcn/ui · Prisma (PostgreSQL) · NextAuth v5
- **Architecture**: MVW separation — data/services → stores → hooks/providers → views
- **Key Libs**: axios (HTTP), zustand (state), zod + react-hook-form (validation/forms), sonner (toasts), lodash (utilities)
- **Themes**: Single Tailwind config + SCSS globals powering tokens, custom ThemeProvider with system/light/dark support
- **Goal**: Capture developer work logs, manage projects, surface insights, and keep the UI fast, accessible, and responsive.

---

## Project Structure

```
app/                      # Next.js App Router
  (auth)/                 # Public auth routes (login/register)
  (dashboard)/            # Protected dashboard shell + feature routes
  api/                    # Route handlers (NextAuth, CRUD endpoints)
components/
  providers/              # Global providers (theme, toast, etc.)
  ui/                     # Shared UI primitives (folder + index.tsx)
  features/               # Feature-level view components (per domain)
hooks/                    # Reusable hooks (e.g., useMediaQuery)
lib/
  db/                     # Prisma client singleton
  http/                   # Axios client instances
  services/               # Server/client service layer (data fetching)
  validations/            # Zod schemas
  utils/                  # Cross-cutting utilities (cn, dates, etc.)
stores/                   # Zustand stores (per domain)
styles/                   # Global SCSS + tokens
prisma/                   # Prisma schema + migrations
```

> 📁 **Naming**: folder names state the topic (`components/features/biometric/index.tsx`). Implementation lives in `index.ts[x]` to keep imports clean (`@/components/features/biometric`).

---

## Architecture & Conventions

### MVW Layers

- **Model/Data**: Prisma models + `lib/services/*` (server actions, route handlers, axios requests). No UI logic here.
- **Store**: Zustand slices in `stores/*` encapsulate view-friendly state. Stores never fetch directly; they rely on services.
- **View**: Components/hooks consume data via stores and service hooks. Views are primarily composition + styling.

### Styling & Themes

- Tailwind 4 acts as the design token source. Custom tokens defined in `tailwind.config.ts` and `styles/globals.scss`.
- Component-level styling uses SCSS modules with Tailwind utilities (e.g., `components/features/.../index.module.scss`).
- Theme switching handled by `components/providers/theme` with data attributes + CSS variables.

### Async & Errors

- Wrap every async operation in `try/catch`; surface failures via `sonner` toasts and error boundaries.
- Global `app/error.tsx` plus feature-specific boundaries (upcoming) to provide graceful fallbacks.

### Accessibility & Responsiveness

- Ensure keyboard navigation, focus management, ARIA labeling, and semantic markup.
- Use Tailwind responsive utilities and shared hooks (`hooks/useMediaQuery`) for layout shifts.

---

## Tooling & Scripts

| Command                                   | Description              |
| ----------------------------------------- | ------------------------ |
| `bun install`                             | Install dependencies     |
| `bun dev`                                 | Start Next.js dev server |
| `bun run build`                           | Build for production     |
| `bun run lint` / `bun run lint:fix`       | ESLint checks / auto-fix |
| `bun run format` / `bun run format:check` | Prettier formatting      |
| `bun run type-check`                      | TypeScript validation    |
| `bunx prisma generate`                    | Generate Prisma client   |
| `bunx prisma db push`                     | Apply schema to database |

Husky + lint-staged ensure linting/formatting on commit.

---

## Environment Setup

1. **Install dependencies**
    ```bash
    bun install
    ```
2. **Start PostgreSQL**
    ```bash
    docker compose up -d
    ```
3. **Configure environment**
    - Copy `.env.example` → `.env`
    - Provide `DATABASE_URL`, `NEXTAUTH_SECRET`, etc.
4. **Prisma**
    ```bash
    bunx prisma generate
    bunx prisma db push
    ```
5. **Run**
    ```bash
    bun dev
    ```
    Visit `http://localhost:3000`.

---

## Implementation Roadmap

### 1. Authentication (in progress)

- Credential-based NextAuth v5 with Prisma adapter
- Login/Register forms using `react-hook-form` + Zod
- Service layer + store for auth session state
- Feedback via toasts and accessible inline errors

### 2. Protected Dashboard Shell

- Shared layout, navigation, theme toggle, toast provider
- Error boundaries + loading states
- Responsive, accessible design

### 3. Projects & Logs

- CRUD flows with Prisma + server actions/API routes
- Zustand stores + feature hooks for data access
- Calendar/search/export views for historical analysis

### 4. AI Insights (later)

- Summaries, patterns, recommendations layered over logs

---

## Coding Guidelines Checklist

- [ ] Use folder + `index.ts[x]` structure for components, hooks, stores, services.
- [ ] Keep services (<-> data fetching) free of UI/state logic.
- [ ] Keep stores ignorant of networking; services hydrate stores.
- [ ] Always wrap async/await in `try/catch`; log & toast failures.
- [ ] Add tests or TODO comments when behavior is non-obvious.
- [ ] Prefer composition over inheritance; keep components focused.
- [ ] Ensure new UI is responsive and accessible on first pass.

---

## License

MIT © 2025 Devlog AI
