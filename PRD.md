# the-rmo-stat — Product Requirements Document

**Version:** 1.0  
**Date:** May 27, 2026  
**Status:** Draft for Development  
**Platform:** Chișinău, Moldova (RMO Regional Identifier)

---

## 1. Project Overview

### 1.1 Concept Statement

**the-rmo-stat** is a multi-layered urban climate and infrastructure intelligence platform designed for Chișinău, Moldova. The application aggregates satellite imagery, real-time ground sensor data, and crowdsourced civic reports into an interactive digital twin of the capital city, enabling citizens, environmental NGOs, urban planners, and real-estate platforms to access hyper-local environmental intelligence.

### 1.2 Project Name

| Field | Value |
|-------|-------|
| **Name** | the-rmo-stat |
| **Type** | Urban Climate Intelligence Platform |
| **Region** | Chișinău, Moldova (RMO identifier) |
| **Coordinate Center** | Lat: 47.0105, Lng: 28.8638 |

### 1.3 Target Audiences

| Audience | Primary Use Case |
|----------|------------------|
| **Citizens** | Environmental awareness, shade routing, incident reporting |
| **Local Environmental NGOs** | Data-driven advocacy, pollution monitoring |
| **Urban Planners** | Heat mitigation, green infrastructure planning |
| **Real-Estate Platforms** | Eco-Score integration for property listings |

### 1.4 Core Value Proposition

> A living digital twin of Chișinău that transforms satellite, sensor, and civic data into actionable urban intelligence—enabling smarter, greener, and more resilient city living.

---

## 2. Tech Stack

### 2.1 Frontend Architecture

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js (App Router) | Latest |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Animation | Framer Motion | 11.x |
| State Management | React Context + useReducer | — |

### 2.2 Mapping Engine

| Component | Technology | Configuration |
|-----------|------------|---------------|
| Map Engine | Mapbox GL JS | Custom Light/Monochrome base style |
| Routing | Mapbox Directions API | Pedestrian shade routing |
| Tiles | Mapbox Vector Tiles | Custom minimalist style |

### 2.3 Backend & Database

| Component | Technology | Extension |
|-----------|------------|-----------|
| Database | Neon Serverless Postgres | PostGIS enabled |
| API Layer | Next.js API Routes (Route Handlers) | REST/JSON |
| External Data | OpenAQ API v3 | Real-time air quality |

### 2.4 External Data Sources

| Source | Data Type | Update Frequency |
|--------|-----------|------------------|
| Google Earth Engine | Landsat 8/9 LST | 8-day rolling composite |
| Sentinel-2 | NDVI / Tree Canopy | Monthly |
| OpenAQ API v3 | PM2.5, atmospheric data | Real-time |
| Crowdsourced | Civic incidents | On-demand |

---

## 3. UI/UX Design System

### 3.1 Theme Specification

**Theme:** Strict Light Theme

The aesthetic must feel **clean, minimalist, crisp, and organic**. All UI elements should prioritize readability, whitespace, and subtle depth through soft shadows rather than dark glows or heavy contrast.

### 3.2 Color Palette

#### Base Colors

| Role | Color | Hex |
|------|-------|-----|
| Background Primary | Pure White | `#FFFFFF` |
| Background Secondary | Soft Gray | `#F8F9FA` |
| Border | Light Gray | `#E5E7EB` |
| Text Primary | Charcoal | `#1F2937` |
| Text Secondary | Medium Gray | `#6B7280` |
| Text Muted | Light Gray | `#9CA3AF` |

#### Accent 1: Water / Air / Cooling

| Role | Color | Hex |
|------|-------|-----|
| Primary | Sky Blue | `#38BDF8` |
| Secondary | Pastel Cyan | `#A5F3FC` |
| Hover | Light Sky | `#7DD3FC` |
| Active | Deep Sky | `#0EA5E9` |

#### Accent 2: Nature / Ecology

| Role | Color | Hex |
|------|-------|-----|
| Primary | Emerald | `#10B981` |
| Secondary | Light Emerald | `#6EE7B7` |
| Hover | Soft Emerald | `#34D399` |
| Active | Deep Emerald | `#059669` |

#### Semantic Colors

| State | Color | Hex |
|-------|-------|-----|
| Warning | Amber | `#F59E0B` |
| Error | Red | `#EF4444` |
| Info | Blue | `#3B82F6` |

### 3.3 Visual Effects

#### Frosted Glass Panels

Floating control panels must use:
- `backdrop-filter: blur(12px)`
- `background-color: rgba(255, 255, 255, 0.85)`
- `border: 1px solid rgba(229, 231, 235, 0.5)`
- `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`

#### Transitions

| Element | Animation | Duration |
|---------|-----------|----------|
| Panel slide | Framer Motion spring | 0.4s |
| Layer fade | Opacity transition | 0.3s |
| Hover states | ease-out | 0.15s |

### 3.4 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Heading 1 | Inter | 700 | 32px |
| Heading 2 | Inter | 600 | 24px |
| Heading 3 | Inter | 600 | 18px |
| Body | Inter | 400 | 14px |
| Caption | Inter | 400 | 12px |

### 3.5 Spacing System

Base unit: 4px

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

### 3.6 Component Specifications

#### Floating Control Panel

- Position: Fixed, bottom-right or top-right
- Border radius: 16px
- Padding: 16px
- Max width: 320px
- Z-index: 1000

#### Layer Toggle Item

- Height: 44px
- Padding: 12px horizontal
- Icon + Label + Toggle switch
- Hover background: `#F8F9FA`

#### Crowdsourced Pin Marker

- Size: 32px diameter
- Animation: Subtle pulse (scale 1.0 → 1.1 → 1.0)
- Colors: Category-coded (flood=red, tree=green, utility=blue)

---

## 4. Data Pipeline & Layer Specifications

### 4.1 Layer Architecture Overview

The map must support **stacking and blending** multiple environmental data layers, each with configurable opacity and toggle controls.

```
┌─────────────────────────────────────────────┐
│           Crowdsourced Layer (Top)          │  ← Z-index: 4
├─────────────────────────────────────────────┤
│           Live Air Quality Layer            │  ← Z-index: 3
├─────────────────────────────────────────────┤
│           Tree Canopy Cover (NDVI)           │  ← Z-index: 2
├─────────────────────────────────────────────┤
│           Structural Heat Map (LST)         │  ← Z-index: 1
├─────────────────────────────────────────────┤
│      Mapbox Light/Monochrome Base Map        │  ← Z-index: 0
└─────────────────────────────────────────────┘
```

### 4.2 Layer 1: Structural Heat Map (Slow Layer)

| Property | Specification |
|----------|---------------|
| **Name** | Structural Heat Map |
| **Display Name** | Urban Heat Island |
| **Data Source** | Landsat 8/9 via Google Earth Engine |
| **Metric** | Land Surface Temperature (LST) |
| **Processing** | 8-day rolling median composite |
| **Cloud Masking** | Enabled (eliminates weather interference) |
| **Render Style** | Smooth thermal gradient (blue → white → red) |
| **Update Frequency** | Every 8 days |
| **Cache Strategy** | Server-side caching with ISR |

**Gradient Color Ramp:**

| Temperature Range | Color | Hex |
|-------------------|-------|-----|
| Cool | Sky Blue | `#38BDF8` |
| Moderate | Light Cyan | `#A5F3FC` |
| Warm | Light Yellow | `#FEF3C7` |
| Hot | Soft Orange | `#FDBA74` |
| Extreme | Light Red | `#FCA5A5` |

### 4.3 Layer 2: Tree Canopy Cover (Eco Layer)

| Property | Specification |
|----------|---------------|
| **Name** | Tree Canopy Cover |
| **Display Name** | Green Canopy |
| **Data Source** | Sentinel-2 |
| **Metric** | NDVI (Normalized Difference Vegetation Index) |
| **Processing** | Monthly composite, vegetation density index |
| **Render Style** | Rich green overlays with variable opacity |
| **Update Frequency** | Monthly |
| **NDVI Range** | -1.0 to +1.0 (displayed as 0.0 to 1.0) |

**NDVI Color Mapping:**

| NDVI Range | Label | Color | Hex |
|------------|-------|-------|-----|
| 0.0 – 0.2 | Bare/Impervious | — | Transparent |
| 0.2 – 0.4 | Low Vegetation | Light Green | `#86EFAC` |
| 0.4 – 0.6 | Moderate Vegetation | Medium Green | `#22C55E` |
| 0.6 – 0.8 | High Vegetation | Deep Green | `#16A34A` |
| 0.8 – 1.0 | Dense Canopy | Dark Green | `#15803D` |

### 4.4 Layer 3: Live Air Quality (Fast Layer)

| Property | Specification |
|----------|---------------|
| **Name** | Live Air Quality |
| **Display Name** | Air Quality Index |
| **Data Source** | OpenAQ API v3 |
| **Metrics** | PM2.5 (primary), PM10, O₃, NO₂, CO |
| **Render Style** | Pulsing vector points with dynamic color |
| **Update Frequency** | Real-time (polling interval: 5 minutes) |
| **Animation** | Subtle pulse effect on markers |

**PM2.5 Color Coding:**

| AQI Level | PM2.5 (μg/m³) | Color | Hex |
|-----------|---------------|-------|-----|
| Good | 0 – 12 | Emerald | `#10B981` |
| Moderate | 12.1 – 35.4 | Yellow | `#F59E0B` |
| Unhealthy (Sensitive) | 35.5 – 55.4 | Orange | `#F97316` |
| Unhealthy | 55.5 – 150.4 | Red | `#EF4444` |
| Very Unhealthy | 150.5 – 250.4 | Purple | `#A855F7` |
| Hazardous | 250.5+ | Maroon | `#7F1D1D` |

### 4.5 Layer 4: Flash Flood & Civic Incidents (Crowdsourced Layer)

| Property | Specification |
|----------|---------------|
| **Name** | Civic Incidents |
| **Display Name** | Community Reports |
| **Data Input** | Topographic elevation + user-reported pins |
| **Storage** | Neon Postgres with PostGIS |
| **Coordinates** | PostGIS spatial geometry (POINT) |
| **Categories** | Flooding, Sick Tree, Broken Utility, Other |

**Pin Categories:**

| Category | Icon | Color | Hex |
|----------|------|-------|-----|
| Flash Flood | 💧 | Red | `#EF4444` |
| Sick Tree | 🌿 | Amber | `#F59E0B` |
| Broken Water Utility | 🔧 | Blue | `#3B82F6` |
| Other | 📍 | Gray | `#6B7280` |

**Crowdsourced Pin Schema (PostGIS):**

```sql
CREATE TABLE civic_incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    geom GEOMETRY(Point, 4326) NOT NULL,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    verified_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(255)
);

CREATE INDEX idx_incidents_geom ON civic_incidents USING GIST(geom);
CREATE INDEX idx_incidents_category ON civic_incidents(category);
```

---

## 5. Feature Specifications (MVP Scope)

### 5.1 Interactive Layer Control

#### Description

A floating control panel allowing users to toggle and mix multiple environmental layers seamlessly. Users can adjust individual layer opacity and visibility without navigating away from the map view.

#### UI Components

| Component | Type | Location |
|-----------|------|----------|
| Layer Panel | Frosted glass card | Bottom-right corner |
| Layer Toggle | Switch component | Inside panel |
| Opacity Slider | Range input | Per-layer when expanded |
| Layer Info Tooltip | Hover tooltip | On layer label hover |

#### User Interactions

1. User clicks layer toggle → Layer visibility switches (0 → 1 or 1 → 0)
2. User drags opacity slider → Layer opacity updates in real-time
3. User clicks info icon → Modal shows layer data source and last updated
4. Panel can be collapsed to icon-only state

#### Technical Requirements

- Layer state persisted to localStorage
- Smooth Framer Motion transitions for all visibility changes
- Maximum 3 layers can be active simultaneously (performance)

### 5.2 Crowdsourced Pinning System

#### Description

A secure public feature allowing users to double-click the map to log localized infrastructure or environmental incidents. Each pin includes a community verification/upvote counter.

#### User Flow

```
Double-click Map → Category Selection Modal → Title + Description Form 
→ Submit → Pin Appears → Community Upvotes
```

#### Pin Submission Form

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Category | Select dropdown | Predefined list | Yes |
| Title | Text input | 5-100 characters | Yes |
| Description | Textarea | 0-500 characters | No |
| Location | Auto (map click) | Valid coordinates | Auto |

#### Security Measures

- Rate limiting: 5 pins per user per day
- Basic spam detection on submission
- No authentication required for viewing
- Optional name/email for submission

#### Upvote System

| Action | Behavior |
|--------|----------|
| Upvote | +1 to verified_count |
| Remove upvote | -1 from verified_count |
| One vote per user per pin | Enforced via localStorage + database |

### 5.3 Pedestrian 'Shade Router' (Prototype)

#### Description

A basic implementation utilizing the Mapbox Directions API, optimized via PostGIS queries to prioritize walking paths covered by high tree canopy or building shade over the absolute fastest concrete route.

#### Algorithm

1. Calculate base route using Mapbox Directions API (Walking profile)
2. Query PostGIS for tree canopy coverage along route segments
3. Calculate "shade score" per segment based on NDVI data
4. Re-weight route segments to maximize cumulative shade score
5. Return enhanced route with shade annotations

#### Shade Score Calculation

```
Segment Shade Score = (segment_NDVI_avg * 0.6) + (building_shadow_factor * 0.4)
```

#### UI Presentation

| Element | Description |
|---------|-------------|
| Route Line | Dashed green line indicating shaded segments |
| Route Line | Solid gray line for unshaded segments |
| Shade Indicator | Percentage of route with "good" shade coverage |
| ETA Comparison | "Standard" vs "Shaded" route time difference |

#### Limitations (MVP)

- Prototype only; may not cover all pedestrian paths
- Building shade data derived from OSM building footprints
- Maximum route distance: 5km

---

## 6. Data Pipeline & Layer Logic

### 6.1 Data Flow Architecture

```
┌─────────────────┐
│  Satellite Data │     ┌──────────────────┐
│  (GEE/Sentinel) │────▶│  Processing      │
└─────────────────┘     │  Pipeline        │
                        │  (Cloud Run)     │
┌─────────────────┐     └────────┬─────────┘
│  OpenAQ API     │              │
└────────┬────────┘              ▼
         │              ┌────────────────┐
         └─────────────▶│  API Routes    │
                        │  (Next.js)     │
┌─────────────────┐     └────────┬────────┘
│  User Reports   │              │
└────────┬────────┘              ▼
         │              ┌────────────────┐
         └─────────────▶│  Neon/PostGIS │
                        └────────────────┘
```

### 6.2 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/layers/heat` | Returns cached LST tile data |
| GET | `/api/layers/canopy` | Returns NDVI tile data |
| GET | `/api/layers/air-quality` | Returns current AQI data from OpenAQ |
| GET | `/api/incidents` | Returns all civic incidents |
| POST | `/api/incidents` | Creates new civic incident |
| PATCH | `/api/incidents/[id]/upvote` | Upvotes an incident |
| GET | `/api/route/shade` | Returns shade-optimized route |

### 6.3 Caching Strategy

| Layer | Cache Duration | Storage |
|-------|----------------|---------|
| Heat Map | 8 days | ISR with revalidation |
| Tree Canopy | 30 days | ISR with revalidation |
| Air Quality | 5 minutes | API route cache |
| Incidents | Real-time | Database query |
| Shade Route | 1 hour | API route cache |

---

## 7. Future Monetization Playbook

### 7.1 Real Estate Integration

#### Eco-Score API

**Description:** An embeddable widget/API offering a certified "Eco-Score" for property listings based on surrounding air quality and canopy density.

**Score Calculation:**

```
Eco-Score = (Air_Quality_Score * 0.5) + (Canopy_Density_Score * 0.3) + (Shade_Access_Score * 0.2)

Air_Quality_Score = 100 - (avg_PM25 * 2)
Canopy_Density_Score = (property_NDVI_avg / 0.8) * 100
Shade_Access_Score = (shaded_path_length_within_500m / 500) * 100
```

**Deliverable:**

| Product | Description |
|---------|-------------|
| **Embed Widget** | iframe snippet for property listing pages |
| **API Endpoint** | `/api/eco-score?lat={lat}&lng={lng}` |
| **Certification Badge** | Branded Eco-Score badge assets |

**Pricing Tiers:**

| Tier | Price | Requests/Month |
|------|-------|----------------|
| Starter | Free | 1,000 |
| Growth | €49/mo | 10,000 |
| Enterprise | Custom | Unlimited |

### 7.2 Corporate CSR Portfolios

#### Branded Eco-Layers

**Description:** Dedicated branded layers highlighting tree-planting initiatives funded by local enterprises for their annual European ESG reporting standards.

**Features:**

| Feature | Description |
|---------|-------------|
| **Branded Overlay** | Corporate logo + tree icon on planted areas |
| **Impact Dashboard** | Trees planted, CO₂ offset, area coverage |
| **ESG Report Export** | PDF/CSV of annual environmental impact |
| **Dedicated subdomain** | `{company}.the-rmo-stat.com |

**Layer Visibility:**

- Publicly visible on main platform with branding
- Toggle to show/hide corporate layers independently
- Corporate layer has lower z-index than base data layers

**CSR Layer Schema (PostGIS):**

```sql
CREATE TABLE csr_initiatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    company_logo_url VARCHAR(512),
    geom GEOMETRY(Polygon, 4326) NOT NULL,
    trees_planted INTEGER,
    species VARCHAR(100),
    planted_at DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_csr_geom ON csr_initiatives USING GIST(geom);
```

**Pricing:**

| Package | Trees | Duration | Price |
|---------|-------|----------|-------|
| Bronze | 100–500 | 1 year | €2,500 |
| Silver | 501–2,000 | 1 year | €7,500 |
| Gold | 2,001–10,000 | 2 years | €20,000 |
| Platinum | 10,000+ | 3 years | Custom |

---

## 8. Non-Functional Requirements

### 8.1 Performance

| Metric | Target |
|--------|--------|
| Initial Page Load | < 3s on 3G |
| Map Interaction Response | < 100ms |
| Layer Toggle Animation | 60fps |
| API Response (cached) | < 200ms |
| API Response (uncached) | < 2s |

### 8.2 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation for all controls
- Screen reader support for layer information
- High contrast mode support

### 8.3 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest + 1 previous |
| Firefox | Latest + 1 previous |
| Safari | Latest + 1 previous |
| Edge | Latest |

---

## 9. Appendix

### 9.1 Glossary

| Term | Definition |
|------|------------|
| **LST** | Land Surface Temperature |
| **NDVI** | Normalized Difference Vegetation Index |
| **PM2.5** | Particulate Matter ≤ 2.5 micrometers |
| **PostGIS** | PostgreSQL extension for geographic objects |
| **ISR** | Incremental Static Regeneration |
| **CSR** | Corporate Social Responsibility |
| **ESG** | Environmental, Social, Governance |
| **AQI** | Air Quality Index |

### 9.2 External API References

| Service | Documentation |
|---------|---------------|
| Mapbox GL JS | https://docs.mapbox.com/mapbox-gl-js/ |
| OpenAQ API v3 | https://api.openaq.org/v3 |
| Google Earth Engine | https://developers.google.com/earth-engine |
| Sentinel-2 | https://sentinel.esa.int/web/sentinel/missions/sentinel-2 |

### 9.3 Project Repository

```
https://github.com/vtoool/theRMOstat.git
```

---

**Document Owner:** the-rmo-stat Development Team  
**Last Updated:** May 27, 2026  
**Next Review:** Upon completion of MVP development phase
