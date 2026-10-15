# GreenTrack — Phase 1: Research & Requirements Specification

## 1. Environment & Workspace Findings (Step 1.1)
- **Operating System:** Windows (PowerShell environment)
- **Workspace Path:** `c:\Users\Lenovo\Documents\VS code\EcoSphere`
- **Folder State:** Completely empty, no pre-existing files or configurations to preserve.
- **Node.js:** v24.15.0 (Installed and verified)
- **npm:** v11.12.1 (Installed and verified)
- **Git:** v2.52.0.windows.1 (Installed and verified)
- **User Directive:** "For now just do the frontend dont think about backend and database."
- **Architecture Strategy:** The frontend will be built as a full, standalone, high-fidelity single page application (SPA) using React + Vite. All data management, state transitions, emissions calculation engines, simulation logic, and deterministic sustainability intelligence will run locally with full mock/persisted local storage layers so the user can experience, test, and interact with the entire platform smoothly without needing a local database or backend server running.

---

## 2. Environmental Methodology & Emission Factors Research (Step 1.2)

To ensure scientific credibility, GreenTrack uses traceable, recognized emission factors based on the **GHG Protocol Corporate and Personal Footprint Guidelines**, **UK DEFRA/DESNZ 2023/2024 Conversion Factors**, and **US EPA GHG Emission Factors Hub**.

### 2.1 Emission Factors Table
| Category | Activity / Subtype | Emission Factor | Unit | Source & Reference | Assumptions / Limitations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Transportation** | Walking / Bicycle | 0.000 | kg CO₂e / km | GHG Protocol | Zero tailpipe and life-cycle operational emissions considered. |
| **Transportation** | Electric Bicycle / Scooter | 0.015 | kg CO₂e / km | DEFRA 2023 | Based on average regional grid electricity charging. |
| **Transportation** | City Bus / Transit | 0.089 | kg CO₂e / passenger-km | UK DEFRA / EPA | Average local occupancy bus travel. |
| **Transportation** | Metro / Subway / Tram | 0.035 | kg CO₂e / passenger-km | UK DEFRA 2023 | Light rail / metro electric transit. |
| **Transportation** | Rideshare / Taxi | 0.170 | kg CO₂e / passenger-km | EPA 2023 | Passenger car average fuel mix. |
| **Transportation** | Personal Car (Gasoline, solo) | 0.192 | kg CO₂e / km | EPA Hub 2023 | Standard compact passenger vehicle. |
| **Transportation** | Personal Car (Carpool, 2+ people) | 0.096 | kg CO₂e / passenger-km | EPA Hub 2023 | 50% allocation based on 2-passenger carpool. |
| **Transportation** | Short-haul Flight (<3 hrs) | 0.255 | kg CO₂e / passenger-km | DEFRA 2023 (with RF) | Radiative forcing included. |
| **Transportation** | Long-haul Flight (>3 hrs) | 0.190 | kg CO₂e / passenger-km | DEFRA 2023 (with RF) | High altitude cruising efficiency. |
| **Electricity** | Campus Dorm / Room | 0.385 | kg CO₂e / kWh | US EPA eGRID / IEA Avg | National average grid carbon intensity. |
| **Electricity** | Off-campus Apartment (shared) | 0.385 | kg CO₂e / kWh | US EPA eGRID | Per student allocated share. |
| **Food & Diet** | Vegan (100% plant-based) | 1.500 | kg CO₂e / day | Poore & Nemecek (Science 2018) | Agricultural supply chain, excludes high air-freight outliers. |
| **Food & Diet** | Vegetarian (dairy & eggs) | 2.500 | kg CO₂e / day | Poore & Nemecek | Typical college vegetarian diet. |
| **Food & Diet** | Pescatarian (fish/seafood) | 3.200 | kg CO₂e / day | Poore & Nemecek | Farmed and wild catch average. |
| **Food & Diet** | Low Meat / Flexitarian | 3.800 | kg CO₂e / day | Poore & Nemecek | Meat consumed 1-3 times a week. |
| **Food & Diet** | High Meat (Daily red/poultry) | 7.200 | kg CO₂e / day | Poore & Nemecek | High beef/lamb consumption profile. |
| **Shopping & Goods** | Fast fashion / New clothing | 15.000 | kg CO₂e / item | WRAP / Carbon Trust | Life cycle production, dyeing, distribution. |
| **Shopping & Goods** | Second-hand / Thrifted | 1.200 | kg CO₂e / item | WRAP 2022 | Washing and distribution overhead only. |
| **Shopping & Goods** | Electronics (Laptop, Phone) | 85.000 | kg CO₂e / unit amortized | Apple/Dell Environmental Reports | Amortized embedded carbon per purchase. |
| **Waste & Recycling** | Landfill Waste (unrecycled) | 0.580 | kg CO₂e / kg waste | EPA WARM Model | Methane generation in non-flared landfill. |
| **Waste & Recycling** | Composted Organic Waste | 0.050 | kg CO₂e / kg waste | EPA WARM Model | Aerobic decomposition. |
| **Waste & Recycling** | Recycled Material (paper/plastic/can) | 0.080 | kg CO₂e / kg waste | EPA WARM Model | Reprocessing energy minus virgin material credit. |

---

## 3. Minimum Viable Product (MVP) Definition (Step 1.3)

### 3.1 Core Deliverables
1. **Public Landing Page:**
   - Hero section with high-impact sustainability value proposition.
   - Live carbon impact preview calculator.
   - Feature highlights (Calculations, What-If simulator, AI Assistant, Goal Tracker).
   - "How GreenTrack Works" 3-step breakdown.
   - Clean, modern emerald-green design system.
2. **Student Authentication & Onboarding:**
   - Registration and Login with role selection (Student vs. Campus Admin).
   - Multi-step onboarding questionnaire capturing baseline student lifestyle (transportation commute, housing/electricity, diet type, consumption, and waste habits).
3. **Interactive Student Dashboard:**
   - Key Metrics Cards: Total estimated CO₂e (kg/year and kg/month), comparison against national student average (~3,200 kg CO₂e/year).
   - Category Breakdown (Interactive Recharts Donut/Pie Chart).
   - Historical footprint trends (Interactive Recharts Bar/Area Chart over months).
   - Recent activities feed with quick-add actions.
4. **Activity Management (CRUD):**
   - Log commute trips, meal choices, energy usage, and item purchases.
   - Edit, delete, and filter activities by category and date range.
   - Real-time recalculation of footprint totals upon activity mutation.
5. **What-If Carbon Reduction Simulator:**
   - Interactive sliders and toggles (e.g., "Switch 3 bus commutes to walking/cycling", "Adopt Meatless Mondays", "Reduce air travel", "Dry clothes naturally").
   - Instant visual comparison of Baseline vs. Simulated scenario.
   - Carbon savings projection (kg CO₂e saved and trees equivalent).
6. **AI Sustainability Assistant:**
   - Context-aware recommendations grounded in the student's actual highest-emission categories.
   - Interactive conversational assistant interface with prompt suggestions ("How can I reduce my commute footprint?", "Cheapest dorm energy hacks").
   - Verified deterministic calculations backing recommendations.
7. **Sustainability Goals & Badges:**
   - Set personal reduction targets (e.g. "Cut footprint by 15% this semester").
   - Progress bar towards target.
   - Sustainable habit streak counters and achievement badges.
8. **Campus Admin Dashboard (Aggregated & Privacy-Preserving):**
   - Aggregate statistics: Total participating students, cumulative CO₂e avoided, campus-wide average by category.
   - No individual private trip logs or personal details exposed.
9. **UI Polish & Quality:**
   - Toast notifications for user actions.
   - Responsive design for mobile, tablet, and desktop.
   - Zero console errors, crisp emerald-green styling, accessible contrast.
