# KenaKata — Modern E-Commerce Storefront


## Project overview

KenaKata is a structured e-commerce storefront that includes a home page with featured products and categories, a product catalog with search and filters, a shopping cart with local persistence, and a checkout form with validation.

This repository demonstrates App Router architecture, server and client component boundaries, reusable UI components, and a layered API abstraction.

## Features implemented

- Home page with hero section, category cards, and featured products
- Product listing page with search, category filtering, price range filtering, and pagination
- Cart page with add, remove, increase/decrease quantity; localStorage cart persistence
- Checkout page with shipping form validation and order confirmation UI
- Responsive layout with Tailwind CSS styling and modern card-based design
- Theme toggle support via context provider
- Auth context scaffolding supporting login state, session persistence, and logout
- Server-side data fetching for products and categories with caching
- Empty states, error handling, and fallback image handling

## Tech stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- React 19
- Framer Motion
- Lucide React icons

## Architecture

- `app/`: App Router pages and layouts
- `components/`: reusable UI patterns and page-specific components
- `context/`: global state providers for cart, auth, and theme
- `lib/api/`: centralized API layer and fetch utilities
- `types/`: shared TypeScript type definitions

Root layout composes providers in this order:

1. `ThemeProvider`
2. `AuthProvider`
3. `CartProvider`

The global navigation and page layout are handled in `app/layout.tsx`, while interactive UI is isolated to client components.

## Rendering strategy

- Server components are used for data-driven pages and sections such as category grids and featured products.
- Client components are used only where browser state or event handling is required: navbar, cart page, checkout, search bar, theme toggle, and contexts.
- Data fetching uses `fetch(..., { next: { revalidate: 3600 }})` where appropriate to enable caching and revalidation.
- URL search parameters drive product search and pagination, keeping page state linkable and shareable.

## Tradeoffs and choices

- The app uses `https://api.escuelajs.co` as the product API source, which provides accessible product and category data for this project.
- Cart state is persisted in `localStorage` and partitioned by authenticated user, but backend cart syncing is not yet implemented.
- Authentication is implemented via context and localStorage token persistence; full login/signup page flows are scaffolded but may need additional backend behavior.
- Server-side rendering was prioritized for catalog pages, while interactive cart and form features remain client-side.

## Performance considerations

- Minimal client bundle size by restricting `use client` to interactive sections
- Next/Image used for image rendering with fallback placeholders
- Cached API fetches reduce repeated network requests
- Tailwind utility classes keep styling compact and composable

## Challenges faced

- Coordinating App Router search params with debounced client-side input and server side pagination
- Preserving cart contents across guest and authenticated user sessions
- Handling API data shape and image fallbacks consistently across product cards
- Managing type safety with React 19 and current TypeScript definitions
- Implementing the theme toggle late in the process, which made adapting other folders and components harder as the global state and layout needed to be updated afterward

## Future improvements

- Add full login/signup pages, protected routes, and middleware-based access control
- Extend product detail page with related products, reviews, and wishlist actions
- Implement wishlist and admin dashboard CRUD features
- Add unit and integration tests with Vitest or Playwright
- Add deployment URL and environment-specific config for private APIs

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment variables

- None required for local development at this time.
- If switching to a private or custom API, add environment variables such as `NEXT_PUBLIC_API_BASE_URL`.

## Notes

- The assignment requirements include project overview, architecture explanation, rendering strategies, tradeoffs, performance considerations, challenges, future improvements, setup instructions, and a deployment URL.
- This README is intended as the submission document for the KenaKata capstone storefront.
