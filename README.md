# GreenTrack — AI-Powered Student Carbon Footprint Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![GHG-Protocol](https://img.shields.io/badge/GHG--Protocol-DEFRA%20%26%20EPA-059669.svg)](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**GreenTrack** is a full-featured, sustainability-focused web application engineered specifically for university students to measure, simulate, understand, and reduce their academic-year carbon footprints.

---

## 🌟 Key Features

1. **Public Landing Page & Instant Estimator**
   - High-impact hero with interactive mini-calculator for commute and dietary choices.
   - Comprehensive breakdowns of platform capabilities and methodology transparency.
2. **Deterministic Carbon Calculation Engine**
   - Mathematical calculations powered by verified **UK DEFRA 2023** and **US EPA eGRID** emission factors.
   - Separate calculations for Transportation, Housing/Electricity, Dining, Shopping, and Solid Waste.
3. **Multi-Step Onboarding Questionnaire**
   - 5-step guided wizard that establishes the student's baseline annual footprint with confetti celebration.
4. **Interactive Student Dashboard**
   - 4 high-level KPI cards (Annual Footprint, Monthly Average, Trees Needed to Offset, Logged Activities).
   - Category-wise donut visualization and monthly trajectory bar charts using **Recharts**.
   - Quick-add activity modal for instantaneous trip and meal logging.
5. **Activity Ledger (Full CRUD & CSV Export)**
   - Complete table view with category filtering and keyword search.
   - Edit, delete, and add activities with live recalculated CO₂e values.
   - Direct CSV download for coursework or reporting.
6. **What-If Scenario Simulator**
   - Interactive adjustment levers (Commute shifts, Meatless Mondays, Dorm energy savings, Thrifting).
   - Side-by-side comparative Recharts visualizations projecting annual carbon and dollar reductions.
7. **AI Sustainability Coach**
   - Conversational assistant grounded in the student's personal carbon data.
   - Pre-populated prompt chips and practical dorm/cafeteria hacks.
8. **Sustainability Goals & Badges**
   - Goal progress tracking with interactive increment buttons and completion status.
   - Campus eco-badges (Pedal Pioneer, Leaf Eater, Thrift Master, etc.).
9. **Campus Admin Dashboard**
   - Privacy-preserving aggregated analytics showing faculty-level participation and total avoided carbon.
   - Zero exposure of private student itineraries (IRB compliant).

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v24+`
- npm `v10+`

### Installation
Clone or navigate to the project directory:
```bash
cd EcoSphere
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```
Verify the production build locally:
```bash
npm run preview
```

---

## 🧪 Testing
Run the automated deterministic calculations test suite:
```bash
node -e "
import('./src/services/carbonEngine.js').then(engine => {
  console.log('Testing factors:');
  console.assert(engine.calculateActivityEmission('transport', 'bus', 10) === 0.89);
  console.assert(engine.calculateActivityEmission('transport', 'bicycle', 20) === 0);
  console.assert(engine.calculateActivityEmission('food', 'vegan', 1) === 1.5);
  console.log('All carbon engine checks passed!');
});
"
```

---

## 🌿 Carbon Methodology Sources
- **Transportation:** UK Department for Energy Security and Net Zero (DESNZ) / DEFRA Greenhouse Gas Conversion Factors 2023.
- **Electricity:** US EPA Emissions & Generation Resource Integrated Database (eGRID) and IEA regional averages.
- **Diet & Food:** Poore, J., & Nemecek, T. (2018). *Reducing food's environmental impacts through producers and consumers*. Science, 360(6392), 987-992.
- **Apparel & Waste:** WRAP UK Textiles Carbon Assessment & US EPA Waste Reduction Model (WARM).
