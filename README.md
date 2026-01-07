# Paul & Tev Shine Time

A modern, full-stack mobile auto detailing booking platform built with Next.js 14+, integrated with Square for appointments and Resend for email notifications.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Square](https://img.shields.io/badge/Square-API-green?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📖 Project Overview

**Paul & Tev Shine Time** is a family-owned mobile car detailing business serving the West Michigan area. This web application provides customers with a seamless booking experience, allowing them to:

- Browse available detailing packages (Bronze, Silver, Gold, Interior, Exterior)
- Select their vehicle type for accurate pricing
- Choose available appointment slots in real-time
- Complete bookings with automatic email confirmations

The platform integrates directly with **Square Bookings API** for scheduling and customer management, and **Resend** for transactional emails via webhooks.

---

## ✨ Key Features

| Feature                       | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| **Multi-Step Booking Wizard** | Guided 4-step process: Vehicle → Package → Date/Time → Confirmation      |
| **Dynamic Pricing**           | Prices adjust based on vehicle type (Sedan, Truck, SUV 2-Row, SUV 3-Row) |
| **Real-Time Availability**    | Fetches live appointment slots from Square Bookings API                  |
| **Webhook-Driven Emails**     | Automatic confirmation emails triggered by Square booking events         |
| **Responsive Design**         | Mobile-first UI with glassmorphism effects and modern aesthetics         |
| **CI/CD Pipeline**            | Automated testing, linting, and Vercel deployment via GitHub Actions     |

---

## 🏗️ System Design

### Architecture Overview

The application follows a **client-server architecture** with Next.js App Router handling both the frontend and API routes. External services (Square, Resend) are integrated via RESTful APIs and webhooks.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  Next.js App Router (React 19)                                              │
│  ├── Landing Page (Hero, Pricing, Gallery, FAQ, Contact)                    │
│  ├── Booking Flow (Multi-step wizard with context state)                    │
│  └── Confirmation Page (Dynamic route /booking/confirmation/[id])           │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Next.js API Routes (/app/api/)                                             │
│  ├── /square/listServices      → GET catalog items                          │
│  ├── /square/searchAvailabilities → POST check time slots                   │
│  ├── /square/createBooking     → POST create appointment                    │
│  ├── /square/updateBooking     → PUT modify appointment                     │
│  ├── /square/cancelBooking     → PUT cancel appointment                     │
│  └── /resend/sendEmail         → POST webhook receiver (Square → Email)     │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL SERVICES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Square API                          │  Resend API                          │
│  ├── Bookings (appointments)         │  └── Transactional Emails            │
│  ├── Customers (CRM)                 │                                      │
│  └── Catalog (services/pricing)      │                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### State Management

The booking flow uses **React Context** for state management:

- **`BookingContext`** — Stores selected vehicle, package, date/time, and user info
- **`StepperContext`** — Tracks current step in the booking wizard (0-3)

### Component Structure

```
components/
├── booking/           # Booking flow components
│   ├── BookingStepper.tsx      # Main wizard controller
│   ├── SelectVehicle.tsx       # Step 0: Vehicle selection
│   ├── SelectPackage.tsx       # Step 1: Package selection
│   ├── SelectDateTime.tsx      # Step 2: Date/time picker
│   ├── BookingSummary.tsx      # Step 3: Review & customer info
│   └── confirmation/           # Post-booking components
├── sections/          # Landing page sections
├── ui/                # Reusable UI components
└── contact/           # Contact form
```

---

## 🔄 Booking System Flow

```mermaid
flowchart TD
    subgraph Customer["👤 Customer Journey"]
        A[Visit Website] --> B[Browse Services & Pricing]
        B --> C[Click 'Book Now']
    end

    subgraph BookingWizard["📋 Multi-Step Booking Wizard"]
        C --> D["Step 1: Select Vehicle Type<br/>(Sedan, Truck, SUV 2-Row, SUV 3-Row)"]
        D --> E["Step 2: Select Package<br/>(Bronze, Silver, Gold, Interior, Exterior)"]
        E --> F["Step 3: Select Date & Time"]
        F --> G["Step 4: Enter Customer Info<br/>(Name, Email, Address)"]
    end

    subgraph APILayer["⚙️ API Processing"]
        E -->|"GET /api/square/listServices"| H[(Square Catalog API)]
        F -->|"POST /api/square/searchAvailabilities"| I[(Square Bookings API)]
        G -->|"POST /api/square/createBooking"| J[Create Customer in Square]
        J --> K[Create Booking in Square]
    end

    subgraph WebhookFlow["📧 Email Notification Flow"]
        K -->|"Webhook: booking.created"| L["/api/resend/sendEmail"]
        L --> M{Verify Square Signature}
        M -->|Valid| N[Fetch Customer Details]
        N --> O[Send Confirmation Email via Resend]
        M -->|Invalid| P[401 Unauthorized]
    end

    subgraph Confirmation["✅ Confirmation"]
        K --> Q[Redirect to /booking/confirmation/:id]
        Q --> R[Display Booking Details]
        O --> S[Customer Receives Email]
    end

    style Customer fill:#e1f5fe
    style BookingWizard fill:#fff3e0
    style APILayer fill:#f3e5f5
    style WebhookFlow fill:#e8f5e9
    style Confirmation fill:#fce4ec
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant C as Customer
    participant UI as Next.js Frontend
    participant API as Next.js API Routes
    participant SQ as Square API
    participant RS as Resend API

    C->>UI: Select Vehicle Type
    C->>UI: Select Package
    UI->>API: GET /api/square/listServices
    API->>SQ: catalog.list({ types: 'ITEM' })
    SQ-->>API: Service catalog data
    API-->>UI: Available packages with pricing

    C->>UI: Select Date
    UI->>API: POST /api/square/searchAvailabilities
    API->>SQ: bookings.searchAvailability()
    SQ-->>API: Available time slots
    API-->>UI: Filtered available slots

    C->>UI: Select Time & Enter Info
    C->>UI: Submit Booking
    UI->>API: POST /api/square/createBooking
    API->>SQ: customers.create()
    SQ-->>API: Customer ID
    API->>SQ: bookings.create()
    SQ-->>API: Booking confirmation
    API-->>UI: Booking ID
    UI->>C: Redirect to confirmation page

    Note over SQ,RS: Webhook triggered
    SQ->>API: POST /api/resend/sendEmail (booking.created)
    API->>API: Verify HMAC signature
    API->>SQ: customers.get()
    SQ-->>API: Customer details
    API->>RS: emails.send() with React template
    RS-->>C: Confirmation email delivered
```

---

## 🛠️ Tech Stack

| Category             | Technology                                |
| -------------------- | ----------------------------------------- |
| **Framework**        | Next.js 14+ (App Router, Turbopack)       |
| **Language**         | TypeScript 5.7                            |
| **Styling**          | Tailwind CSS 3.4, HeroUI                  |
| **State**            | React Context API                         |
| **Animations**       | Framer Motion, Animate.css                |
| **Date Handling**    | Day.js, @internationalized/date           |
| **Payments/Booking** | Square SDK (Bookings, Customers, Catalog) |
| **Email**            | Resend (React Email Templates)            |
| **Maps**             | Mapbox Search                             |
| **Validation**       | Zod                                       |
| **Testing**          | Jest, React Testing Library               |
| **CI/CD**            | GitHub Actions, Vercel                    |

---

## 📁 Project Structure

```
ptst-2/
├── app/
│   ├── api/
│   │   ├── resend/sendEmail/       # Webhook endpoint for emails
│   │   └── square/                 # Square API integrations
│   │       ├── createBooking/
│   │       ├── listServices/
│   │       ├── searchAvailabilities/
│   │       ├── updateBooking/
│   │       └── cancelBooking/
│   ├── booking/
│   │   ├── page.tsx                # Booking wizard page
│   │   └── confirmation/[id]/      # Dynamic confirmation page
│   └── page.tsx                    # Landing page
├── components/
│   ├── booking/                    # Booking flow components
│   ├── sections/                   # Landing page sections
│   └── ui/                         # Reusable UI components
├── context/                        # React Context providers
├── hooks/                          # Custom React hooks
├── lib/
│   ├── api/                        # API client configurations
│   ├── data/                       # Static data & fetch functions
│   ├── definitions/                # TypeScript type definitions
│   └── utils/                      # Utility functions
└── public/                         # Static assets
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Square Developer Account
- Resend Account

### Environment Variables

Create a `.env.local` file:

```env
# Square API
SQUARE_SANDBOX_ACCESS_TOKEN=your_square_sandbox_token
SQUARE_LOCATION_ID=your_location_id
SQUARE_TEAM_MEMBER_ID=your_team_member_id
SQUARE_SIGNATURE_KEY=your_webhook_signature_key
SQUARE_NOTIFICATION_URL=your_webhook_url

# Resend
RESEND_API_KEY=your_resend_api_key

# Mapbox
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ptst-2.git

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## 🧪 Testing

The project uses **Jest** and **React Testing Library** for unit and integration tests:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Test files are co-located with their components in `__tests__/` directories.

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) automates:

1. **Lint** — ESLint + Prettier checks
2. **Test** — Jest test suite
3. **Build** — Next.js production build
4. **Deploy** — Vercel (preview on branches, production on `main`)

---

## 📄 License

This project is private and proprietary to Paul & Tev Shine Time.

---

## 👥 Authors

- **Tevin Williams** — Owner & Publisher
- **Marques Smalley** — Developer & Creator

---

<p align="center">
  <em>In loving memory of Paul Williams ❤️</em>
</p>
