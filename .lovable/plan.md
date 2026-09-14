# Feasto — Discover. Order. Enjoy.

A colorful, premium food discovery and ordering app with a customer experience, a restaurant-owner portal, and an admin dashboard.

## One important note on architecture

You asked for React + separate Express backend + PostgreSQL/Prisma + Nginx + Docker Compose. This project runs on a fixed hosting setup: React frontend plus a built-in server layer and a managed PostgreSQL database. That gives you the same three logical tiers (UI → API → database) with real REST endpoints and real SQL tables, but a separate Express container, Prisma, and Nginx cannot run here. Everything else — the API surface, auth, roles, the schema, seeded demo data — will be built for real. If you specifically need the Express/Docker/Nginx repo layout, that is a job for a local repo outside this environment.

## Brand and design system

- Palette: warm coral, vibrant orange, raspberry pink, golden yellow, fresh green, deep purple, white surfaces, charcoal text — all as design tokens, used strategically against generous whitespace.
- Tasteful gradients, large rounded cards, soft shadows, restrained micro-animations, glass effects on sticky bars.
- Original wordmark 🍴 FEASTO with the tagline "Discover. Order. Enjoy." Generated food photography and illustrations for hero, categories, restaurants, and dishes.

## Phase 1 — Frontend experience

Reusable components: navbar (desktop + mobile bottom nav), category strip, restaurant card, dish card, cart drawer, filter panel, skeletons, toasts, empty/error states, floating cart button.

Pages:
- Home: hero with headline, location + search, suggestions, popular searches, category strip, "Popular near you"
- Restaurants list with filters (rating, delivery time, price, cuisine, veg, offers) and sorting
- Restaurant detail: cover, logo, stats, tabs Overview/Menu/Reviews/Photos, menu sections, animated Add buttons
- Search experience with recent/popular searches and live suggestions
- Offers page with big promotional cards
- Cart drawer → Checkout (address, payment method, summary) → Order tracking timeline with live-map placeholder
- Customer dashboard: profile, recent orders, favorites, addresses, payment methods, offers, settings
- Auth: login, register, forgot password (email/phone + social-style buttons, validated forms)
- Polished 404, error page, loading screens

## Phase 2 — Database

PostgreSQL tables with keys, indexes, constraints, timestamps and row-level security: users/profiles, user_roles (customer, restaurant_owner, admin), restaurants, categories, menu_items, addresses, cart_items, orders, order_items, payments, reviews, favorites, offers, notifications, delivery_partners.

Seeded demo data: 20+ restaurants, 100+ menu items, categories, offers, reviews, sample orders and favorites, so the app looks alive on first load.

## Phase 3 — API layer

REST-style endpoints under `/api/v1/...` for health, restaurants, menu, cart, orders, reviews, offers, users, admin — plus typed server functions for authenticated in-app calls. Includes auth, role-based authorization, input validation, pagination, filtering, sorting, consistent error handling, and security headers.

## Phase 4 — Dashboards

- Restaurant owner: manage restaurant, CRUD menu items and prices, order queue with accept/reject/status updates, revenue and analytics, today's metrics, popular dishes.
- Admin: totals for users/restaurants/orders/revenue, active and today's orders, charts for revenue/orders/users/popular cuisines, management sections for users, restaurants, menu items, orders, payments, offers, reviews.

## Phase 5 — Verification

Walk the app in a browser: register, login, browse, search, filter, restaurant detail, add to cart, checkout, order creation, tracking, review, favorite, both dashboards, and mobile layout. Fix anything broken. Accessibility pass: semantic markup, labels, keyboard focus, contrast.

## Delivery

This is large, so it ships in phases — the customer experience first, then data and API, then the dashboards. You will see working pages as each phase lands.
