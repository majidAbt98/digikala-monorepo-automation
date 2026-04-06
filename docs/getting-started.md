# Getting Started with Digikala Automation Platform

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for custom piece development)
- Git

## Quick Start

### 1. Start the Platform

```bash
# Clone the repository
git clone https://github.com/majidAbt98/digikala-monorepo-automation.git
cd digikala-monorepo-automation

# Start all services
docker compose up -d

# Access the UI at http://localhost:8080
```

### 2. Initial Setup

1. Open http://localhost:8080 in your browser
2. Create an admin account
3. Create your first project (e.g., "Digikala Operations")

### 3. Install Custom Pieces

Custom Digikala pieces are in the `pieces/` directory:

- `pieces/digikala-order-api` — Order management integration
- `pieces/kavenegar-sms` — Iranian SMS via Kavenegar

To build and install a custom piece:

```bash
cd pieces/digikala-order-api
npm install
npm run build
# Upload the built piece via the Activepieces admin panel
```

### 4. Create Your First Automation

Example: "Notify customer when order ships"

1. Create a new flow
2. Add trigger: **Digikala Order API > New Order**
3. Add action: **Kavenegar SMS > Send Template Message**
4. Configure the SMS template with order details
5. Test and publish

## Development

### Custom Piece Development

See the [Activepieces Piece Development Guide](https://www.activepieces.com/docs/build-pieces/misc/build-piece) for the full framework documentation.

Quick reference:

```bash
# Create a new piece
mkdir -p pieces/my-piece/src/lib/actions
mkdir -p pieces/my-piece/src/lib/triggers

# Develop with hot-reload (when running in dev mode)
cd pieces/my-piece
npm run dev
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `AP_POSTGRES_PASSWORD` | PostgreSQL password | `activepieces_dev` |
| `AP_ENCRYPTION_KEY` | 32-char encryption key | Change for production! |
| `AP_JWT_SECRET` | JWT signing secret | Change for production! |
| `AP_FRONTEND_URL` | Public-facing URL | `http://localhost:8080` |

## Production Deployment

For production, ensure you:

1. Generate strong values for `AP_ENCRYPTION_KEY` and `AP_JWT_SECRET`
2. Use a managed PostgreSQL instance
3. Use a managed Redis instance
4. Deploy behind a reverse proxy with TLS
5. Set `AP_FRONTEND_URL` to your production domain
