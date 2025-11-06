# Angple Project

A minimal SvelteKit project setup for frontend and backend development.

## Project Structure

```
angple/
├── apps/
│   ├── web/        # Main SvelteKit web application
│   └── admin/      # Admin dashboard (SvelteKit)
├── packages/       # Shared packages (if needed)
├── node_modules/   # Dependencies
└── package.json    # Root package configuration
```

## Tech Stack

- **SvelteKit 5** - Full-stack web framework
- **Svelte 5** - Component framework
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Vite 7** - Build tool

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start admin dashboard
npm run dev:admin
```

### Available Commands

```bash
npm run dev         # Start web app dev server
npm run dev:admin   # Start admin dev server
npm run build       # Build web app for production
npm run build:admin # Build admin for production
npm run format      # Format code with Prettier
npm run lint        # Run ESLint
npm run test        # Run tests
npm run clean       # Clean and reinstall dependencies
```

## Development

### Web Application

The main web application is located in `apps/web/`. To work on it:

```bash
cd apps/web
npm run dev
```

Access at: http://localhost:5173

### Admin Dashboard

The admin dashboard is located in `apps/admin/`. To work on it:

```bash
cd apps/admin
npm run dev
```

## MCP Tools

This project is configured to work with:
- Serena MCP
- Context7 MCP
- Task Manager MCP

## License

MIT