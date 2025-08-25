# RatingX - Frontend

A Next.js App Router frontend for RatingX, an authenticated store ratings/admin dashboard app. It integrates NextAuth (credentials) with a remote REST API and uses server components for data fetching and rendering.

## Features
- Authentication via NextAuth Credentials with JWT sessions
- Role-aware UI (user, storeOwner, systemAdmin)
- Responsive UI with Tailwind and shadcn/ui
- Store listing and details with ratings
- Admin dashboard with analytics and data tabs
- Profile page with password update (own profile)
- Search stores on the home page

## Tech Stack
- Next.js (App Router, Server Components)
- TypeScript
- NextAuth (Credentials provider)
- axios
- Tailwind CSS + shadcn/ui components
- react-hot-toast for feedback

## Project Structure
- `app/`
  - Root layout and global styles, fixed Navbar
  - `page.tsx`: Auth-required home with user card and store list, server-side search (`q`)
  - `dashboard/page.tsx`: Admin-only analytics and `DashboardTab`
  - `user/[userid]/page.tsx`: User profile card; shows UpdatePassword if viewing own profile
  - `store/[id]/page.tsx`: Store details and ratings
  - `(auth)/signin`, `(auth)/signup`: Auth flows (client pages)
  - `api/auth/[...nextauth]/route.ts`: NextAuth route handlers
- `components/`
  - `Navbar.tsx`: Server navbar reads session; responsive, token-safe, logout
  - `USerCard.tsx`: Greets user, shows role and store link for owners
  - `StoreCard.tsx`: Renders list of stores
  - `DashboardTab.tsx`: Tabs for Users/Stores, redesigned responsive cards
  - `AddUser.tsx`, `AddStore.tsx`: Admin actions with toast UX
  - `UpdatePassword.tsx`, `Logout.tsx`
- `auth.ts`: NextAuth configuration (providers, callbacks, exports `auth`, `signIn`, `signOut`)
- `lib/`, `utils/`, `types/`: helpers and types

## Authentication Flow
- Credentials sign-in sends email/password to API `auth/signin`.
- On success, the API returns `user` and `token`. The token is stored in the JWT and exposed on `session.accessToken`.
- `jwt` and `session` callbacks propagate id, role, name, email, address, and `accessToken`.
- Server components call `auth()` to read the session; token is used in API calls as `Authorization: Bearer <token>`.
- Logout uses a server action (`signOut({ redirectTo: "/" })`).

## External API
All data is fetched from `https://fsi-coding-challenge-api.vercel.app/`:
- Stores: list, store by id, create
- Dashboard analytics and combined data
- Users: add, get by id

## Pages Overview
- Home `/`:
  - Shows `USerCard` and `StoreCard` list
  - Search field filters stores by `q` (name or address)
  - Requires authentication
- Dashboard `/dashboard` (admin):
  - Stats for users, stores, ratings
  - `DashboardTab` with redesigned Users and Stores tabs
- Profile `/user/[userid]`:
  - User details card; if own profile, shows `UpdatePassword`
- Store `/store/[id]` (admin):
  - Store details and user ratings
- Auth: `/signin`, `/signup`

## Responsive Design
- Navbar: fixed, `z-50`, responsive links (hidden on small, dropdown items provided)
- Home, Dashboard, and Profile use centered max-width containers with mobile padding
- Tabs render as responsive grids on small/large screens

## Development
- Install deps: `npm install`
- Run dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Environment
- Requires `NEXTAUTH_SECRET` in env (see NextAuth docs)
- The app expects the external API to be reachable

## Notes & Conventions
- Server Components fetch with axios on the server using `auth()` token
- Avoid decoding JWT unless token exists; fall back gracefully when invalid
- Use shadcn/ui primitives; prefer semantic Tailwind classes
- Avoid `any`; prefer minimal structural types where needed (e.g., search filter)

## Screenshots
Place PNG/JPG files under `public/screenshots/` and they will be served at `/screenshots/...`.

For example filenames (replace with your own captures):

- Home (authenticated)
  - `public/screenshots/home.png`
  - `public/screenshots/home-search.png`
- Dashboard (admin)
  - `public/screenshots/dashboard.png`
- Profile
  - `public/screenshots/profile.png`
- Store Details (admin)
  - `public/screenshots/store-details.png`

Markdown references (these will display on GitHub if files exist):

![Home](public/screenshots/home.png)
![Home Search](public/screenshots/home-search.png)
![Dashboard](public/screenshots/dashboard.png)
![Profile](public/screenshots/profile.png)
![Store Details](public/screenshots/store-details.png)
