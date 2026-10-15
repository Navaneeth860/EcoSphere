# GreenTrack — Phase 2: Architecture & Implementation Plan

## 1. Technical Architecture (Step 2.1)
- **Frontend Stack:** React 18 / 19, Vite, Tailwind CSS / Vanilla Utility CSS for modern emerald styling, Lucide React (feather icons), Recharts (data visualizations), React Router DOM (v6/v7).
- **Client Architecture:**
  - `src/context/AuthContext.jsx`: Session state (mock logged-in student, admin, or guest), demo credentials preloaded, profile persistence in localStorage.
  - `src/context/CarbonContext.jsx`: Central state management for user's logged activities, onboarding baseline responses, goals, recalculations, and simulated scenarios.
  - `src/services/carbonEngine.js`: Pure, deterministic calculation engine using DEFRA/EPA factors. Unit testable and 100% reproducible.
  - `src/services/aiAssistantService.js`: Sustainability advisor that computes smart insights from actual user breakdown and answers queries with actionable tips and math-backed projections.
  - `src/services/storageService.js`: LocalStorage layer pre-seeded with realistic student starter records so the dashboard looks vibrant immediately, while supporting full CRUD.

---

## 2. UI / UX Design Specifications (Step 2.2)
- **Color Palette:**
  - Primary: Emerald `#059669` (Tailwind emerald-600)
  - Primary Dark / Hover: `#047857` (emerald-700)
  - Light Background: Soft mint tint `#f0fdf4` / Pure white `#ffffff`
  - Accent / Warnings: Amber `#d97706`, Coral/Danger `#ef4444`, Blue/Transit `#0284c7`
  - Dark Slate for text: `#0f172a`, Muted: `#64748b`
- **Typography & Cards:** Rounded-2xl cards with subtle borders (`border-emerald-100`), smooth elevation (`shadow-sm hover:shadow-md transition-all`), pill badges for emission categories.
- **Key Views:**
  1. `/`: Public Landing Page with interactive mini-calculator, features, testimonials, how-it-works, footer.
  2. `/login` & `/register`: Auth portals with quick one-click demo credentials ("Sign in as Demo Student" / "Sign in as Campus Admin").
  3. `/onboarding`: 5-step interactive questionnaire for first-time baseline establishment.
  4. `/dashboard`: Comprehensive student hub with 4 KPI cards, Recharts Donut category breakdown, monthly footprint area chart, quick activity logger, and recent activity feed.
  5. `/activities`: Dedicated activity ledger with search, category filtering, add modal, edit modal, delete confirmation, and export feature.
  6. `/simulator`: "What-If" carbon reduction lab with live interactive sliders (commute shift, meatless days, laundry temperature, recycling).
  7. `/ai-assistant`: Conversational green lifestyle coach with quick prompt chips ("How to save $ and CO₂ in dorm?", "Best low-carbon meals").
  8. `/goals`: Sustainability milestones, active targets, badge collection, and streak trackers.
  9. `/admin`: Campus-wide sustainability analytics portal (aggregated, anonymized).

---

## 3. Implementation Backlog & Work Breakdown (Step 2.4)
- **Task 1: Vite React Project Scaffolding:** Initialize Vite React in current root, install `lucide-react`, `recharts`, `react-router-dom`, configure styles.
- **Task 2: Core Carbon Calculation Engine:** Write `carbonEngine.js` with all emission factors, unit conversions, and validation.
- **Task 3: State Management & Seed Storage:** Implement `CarbonContext.jsx` and `AuthContext.jsx` with persistent localStorage and seed activities.
- **Task 4: Public Landing Page:** Build responsive, rich landing page with hero, live preview calculator, feature cards, and navigation.
- **Task 5: Authentication & Onboarding Views:** Build login/register views and the step-by-step onboarding wizard.
- **Task 6: Student Dashboard:** Build KPI overview cards, category charts, trend charts, and quick-add actions.
- **Task 7: Activity Management:** Build activities table, category filters, add/edit/delete modals.
- **Task 8: What-If Simulator:** Build scenario comparison sliders and tree-planting equivalents.
- **Task 9: AI Assistant:** Build conversational assistant with context-driven responses and prompt suggestions.
- **Task 10: Goals & Badges:** Build goal tracker with progress bars and unlocked sustainability achievements.
- **Task 11: Admin Analytics:** Build privacy-preserving campus overview dashboard.
- **Task 12: Production Build & End-to-End Verification:** Verify zero errors, responsive layouts, and full user journey.
