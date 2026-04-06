# Getting Started with Digikala Automation Platform

## Architecture

This monorepo contains the Digikala Automation Platform built on Activepieces core:

```
digikala-monorepo-automation/
  apps/
    activepieces/              # Activepieces core (forked)
      packages/
        web/                   # React UI (customized with Digikala branding + RTL)
        server/api/            # Fastify backend API
        server/worker/         # Background job worker
        server/engine/         # Sandboxed flow execution engine
        pieces/custom/         # Digikala custom pieces
          digikala-order-api/  # Order management integration
          kavenegar-sms/       # Iranian SMS via Kavenegar
        pieces/community/      # 500+ community integrations
        shared/                # Shared types and utilities
  docs/                        # Project documentation
  evaluation/                  # Migration evaluation documents
  docker-compose.yml           # Local development with Docker
  package.json                 # Root monorepo scripts
```

## Prerequisites

- **Bun** 1.3+ (package manager used by Activepieces)
- **Node.js** 24+ 
- **Docker** and **Docker Compose** (for infrastructure)
- **Git**

## Quick Start (Docker — Recommended)

```bash
# Clone the repository
git clone https://github.com/majidAbt98/digikala-monorepo-automation.git
cd digikala-monorepo-automation

# Start all services (app + PostgreSQL + Redis)
docker compose up -d

# Access the UI at http://localhost:8080
```

## Development Mode (Local)

### 1. Start infrastructure

```bash
# Start only PostgreSQL and Redis
docker compose up -d postgres redis
```

### 2. Install dependencies

```bash
cd apps/activepieces
bun install
```

### 3. Set up environment

```bash
cp .env.dev .env
# Edit .env with your local settings
```

### 4. Run the platform

```bash
# From the repo root:
npm run dev          # Full stack (frontend + backend)
# OR separately:
npm run dev:frontend # React UI on http://localhost:4200
npm run dev:backend  # API server on http://localhost:3000
```

### 5. Initial Setup

1. Open http://localhost:4200 (dev) or http://localhost:8080 (Docker)
2. Create an admin account
3. The UI is in Farsi (RTL) by default — switch to English via settings if needed

## Custom Pieces

Digikala-specific pieces live in `apps/activepieces/packages/pieces/custom/`:

| Piece | Description |
|---|---|
| `digikala-order-api` | Order management (get, list, new order trigger) |
| `kavenegar-sms` | SMS via Kavenegar (send, verify, template) |

### Creating a New Piece

```bash
# From repo root
npm run create-piece
# Follow the prompts to scaffold a new piece
```

### Building a Piece

```bash
npm run build-piece -- --name=digikala-order-api
```

See [Custom Pieces Guide](./custom-pieces-guide.md) for detailed instructions.

## Key Customizations

### Digikala Branding
- Theme colors: `apps/activepieces/packages/web/src/styles/digikala-theme.css`
- Primary color: Digikala Red (#EF394E)
- Secondary color: Teal (#00BFA5)

### RTL Support
- RTL stylesheet: `apps/activepieces/packages/web/src/styles/digikala-rtl.css`
- HTML dir attribute: `<html lang="fa" dir="rtl">`
- Code blocks and flow builder remain LTR

### Farsi Translation
- Translation file: `apps/activepieces/packages/web/public/locales/fa/translation.json`
- Default language set to `fa` in `i18n.ts`
- Locale enum updated in `packages/shared/src/lib/core/common/locale.ts`

### Vazirmatn Font
- Persian web font loaded from CDN (Vazirmatn by Saber Rastikerdar)
- Applied automatically in RTL mode

## Upstream Sync

To pull updates from Activepieces upstream:

```bash
cd apps/activepieces
git remote add upstream https://github.com/activepieces/activepieces.git
git fetch upstream main
# Cherry-pick or merge specific commits/tags
```

Keep customizations minimal in core files — prefer building features as custom pieces.
