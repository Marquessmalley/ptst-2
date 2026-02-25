# AI Features Design Document

## Paul & Tev Shine Time — AI Integration Plan

This document outlines two AI-powered features for the Paul & Tev Shine Time booking platform: a **Customer Support Chatbot** and a **Service & Package Recommender**. Both features use OpenAI's API and are designed to improve the customer experience without adding unnecessary complexity.

---

## Table of Contents

1. [Feature 1: AI Customer Support Chatbot](#feature-1-ai-customer-support-chatbot)
2. [Feature 2: Service & Package Recommender](#feature-2-service--package-recommender)
3. [Architecture Overview](#architecture-overview)
4. [Tools & Technologies](#tools--technologies)
5. [Environment Variables](#environment-variables)

---

## Feature 1: AI Customer Support Chatbot

### Overview

A lightweight, read-only chatbot that answers customer questions about services, pricing, availability, and business information. It does not take any actions (no booking creation, modification, or cancellation). Each conversation is independent with no memory of past sessions.

### Value

- Answers repetitive customer questions 24/7 without owner involvement
- Surfaces accurate pricing and service details grounded in real business data
- Reduces friction for first-time customers unfamiliar with auto detailing
- Provides a direct path to human support when the AI cannot help

### Scope & Boundaries

**The chatbot CAN:**

- Answer questions about packages, pricing, included services, and estimated durations
- Provide vehicle-specific pricing (e.g., "Gold package for a truck is $300")
- Explain the difference between packages
- Answer business questions (location, service area, hours, contact info)
- Answer general auto detailing questions (e.g., "How often should I detail my car?")
- Direct users to the booking page when they express intent to book
- Display the business phone number (616) 226-4109 when a human is needed

**The chatbot CANNOT:**

- Create, modify, or cancel bookings
- Check real-time availability or appointment slots
- Access customer account information
- Process payments or handle billing questions
- Remember previous conversations

### System Prompt Design

The chatbot uses a system prompt that includes:

- Business identity and tone (friendly, professional, representing a family-owned business)
- Complete package and pricing data injected from `placeholder-data.ts`
- Business contact information and service area (West Michigan / Grand Rapids area)
- Strict instructions to never fabricate information
- Instructions to show the phone number (616) 226-4109 and suggest calling when it cannot answer a question or the customer needs human assistance
- Instructions to suggest visiting `/booking` when the customer wants to schedule

```
You are the customer support assistant for Paul & Tev Shine Time, a family-owned
mobile auto detailing business serving the West Michigan area.

Your role is to answer questions about our services, pricing, and business. You are
friendly, helpful, and concise. You do not book appointments or take any actions —
you only provide information.

BUSINESS INFO:
- Location: 318 Beulah St SE, Grand Rapids, MI 49507
- Phone: (616) 226-4109
- Email: ptshimetime@gmail.com
- Service type: Mobile auto detailing (we come to you)

PACKAGES & PRICING:
{Injected from placeholder-data.ts at runtime — all 6 packages with vehicle-specific pricing}

RULES:
- Only answer questions related to auto detailing and our business
- Never make up information. If you don't know, say so.
- When a customer wants to book, direct them to our booking page
- When you cannot help or the customer wants to speak to a person,
  provide our phone number: (616) 226-4109
- Keep responses short — 2-3 sentences when possible
- Do not use markdown formatting in responses
```

### User Flow

```
1. Customer visits any page on the site
2. Sees a chat icon (floating button) in the bottom-right corner
3. Clicks to open the chat widget
4. Greeted with a welcome message:
   "Hi! I'm the Paul & Tev Shine Time assistant. I can answer questions
    about our detailing packages, pricing, and services. How can I help?"
5. Customer types a question
6. AI responds using business data from the system prompt
7. If the customer wants to book → AI responds with a link to /booking
8. If the AI can't help → AI responds with the phone number (616) 226-4109
9. Customer closes the chat or navigates away — conversation is discarded
```

### Component Breakdown

```
components/
  chatbot/
    ChatWidget.tsx          — Floating button + collapsible chat panel
    ChatWindow.tsx          — Message list, input field, send button
    ChatMessage.tsx         — Individual message bubble (user vs. assistant)
    chatSystemPrompt.ts     — Builds the system prompt with injected business data
```

**ChatWidget.tsx**

- Fixed position bottom-right on all pages
- Toggle button to open/close the chat panel
- Renders `ChatWindow` when open
- Lives in the root layout (`app/layout.tsx`) so it appears on every page

**ChatWindow.tsx**

- Manages local message state (`useState` array of `{ role, content }`)
- Sends messages to `/api/openai/chat` and streams the response
- Displays a welcome message on mount
- Input field with send button at the bottom
- Auto-scrolls to latest message

**ChatMessage.tsx**

- Renders a single message bubble
- Visual distinction between user messages (right-aligned) and assistant messages (left-aligned)
- Detects and renders links (e.g., /booking) as clickable

### API Route

```
app/
  api/
    openai/
      chat/
        route.ts            — POST endpoint that proxies to OpenAI
```

**`POST /api/openai/chat`**

- Accepts: `{ messages: [{ role, content }] }`
- Builds the full message array: `[systemPrompt, ...messages]`
- Calls OpenAI Chat Completions API (`gpt-4o-mini` for cost efficiency)
- Streams the response back to the client using OpenAI's streaming mode
- Does not persist any data

Request:
```json
{
  "messages": [
    { "role": "user", "content": "How much is the Gold package for a truck?" }
  ]
}
```

Response (streamed):
```
"The Gold Package for a truck is $300. It includes a full interior and exterior
 detail with an estimated time of 3 hours and 30 minutes. Would you like to
 book an appointment?"
```

---

## Feature 2: Service & Package Recommender

### Overview

A guided recommendation flow embedded inside the booking wizard at Step 2 (Select Package). When a customer is unsure which package to choose, they can click "Help me choose" to answer 3 short questions. The AI analyzes their responses and recommends 1-2 packages with an explanation of why each fits their needs. Selecting a recommendation pre-fills the package selection in the booking context.

### Value

- Reduces decision paralysis for customers facing 6 package options
- Increases average order value by guiding customers toward the right package rather than the cheapest
- Educates first-time customers on what different detailing levels involve
- Provides a personalized experience that a static pricing page cannot

### Scope & Boundaries

**The recommender IS:**

- A short, structured questionnaire (3 questions) followed by an AI-generated recommendation
- Available only inside the booking wizard at Step 2 (Select Package)
- Aware of the customer's already-selected vehicle type from Step 1

**The recommender IS NOT:**

- Part of the chatbot
- Available on the landing page or anywhere outside the booking flow
- A free-form conversation — it is a structured quiz with a single AI response at the end

### Recommendation Logic

**Inputs collected from the user:**

| Question | Purpose | Options |
|----------|---------|---------|
| "When was your last professional detail?" | Gauges current vehicle condition | Never / Within 3 months / 3-6 months ago / Over 6 months ago |
| "What's your main concern?" | Identifies priority area | Dirty/stained interior / Dull or dirty exterior / Both interior and exterior / Just a maintenance wash |
| "What's your budget?" | Constrains the recommendation | Under $100 / $100–$200 / $200+ |

**Additional context (automatic):**

- Vehicle type (already selected in Step 1, pulled from `BookingContext`)
- Vehicle-specific pricing for each package

**AI prompt structure:**

```
Given the following customer profile:
- Vehicle: {selectedVehicle}
- Last detail: {answer1}
- Main concern: {answer2}
- Budget: {answer3}

And the following available packages:
{All 6 packages with pricing for the selected vehicle type}

Recommend 1-2 packages. For each recommendation, include:
- Package name
- Price for their vehicle
- A 1-2 sentence explanation of why this package fits their needs

If their budget doesn't match any suitable package, recommend the closest
option and briefly explain the value. Always recommend the best fit first.

Respond in JSON format:
{
  "recommendations": [
    {
      "packageName": "...",
      "price": "...",
      "reason": "..."
    }
  ]
}
```

### User Flow

```
1. Customer completes Step 1 (Select Vehicle) — e.g., selects "Truck"
2. Customer arrives at Step 2 (Select Package)
3. Sees the 6 package cards AND a "Help me choose" button
4. Clicks "Help me choose"
5. A modal or inline panel appears with 3 multiple-choice questions
6. Customer answers all 3 questions
7. Clicks "Get Recommendation"
8. Loading state while the API call processes
9. AI recommendation appears:
   "Based on your answers, we recommend:"
   ┌─────────────────────────────────────────────┐
   │  Gold Package — $300                        │
   │  Your truck hasn't been detailed in over 6  │
   │  months and needs both interior and exterior │
   │  work. The Gold package is a full detail     │
   │  that covers everything.                     │
   │                                              │
   │  [Select This Package]                       │
   └─────────────────────────────────────────────┘
10. Customer clicks "Select This Package"
11. BookingContext updates with the selected package
12. Recommender closes, package card is highlighted as selected
13. Customer proceeds to Step 3 (Select Date & Time)
```

### Component Breakdown

```
components/
  booking/
    recommender/
      RecommenderModal.tsx      — Modal container for the recommendation flow
      RecommenderQuiz.tsx       — Renders the 3 questions with selectable options
      RecommenderResults.tsx    — Displays AI recommendation cards
      recommenderPrompt.ts      — Builds the prompt with vehicle and package data
```

**RecommenderModal.tsx**

- Triggered by a "Help me choose" button on the `SelectPackage` step
- Renders as a modal overlay
- Manages the flow state: `quiz` → `loading` → `results`
- Close button returns to the package selection grid

**RecommenderQuiz.tsx**

- Renders 3 questions sequentially or all at once
- Each question has selectable option chips/buttons
- "Get Recommendation" button is enabled only when all 3 questions are answered
- Passes answers to the parent on submit

**RecommenderResults.tsx**

- Displays 1-2 recommendation cards
- Each card shows: package name, price for their vehicle, and the AI-generated reason
- "Select This Package" button on each card
- On selection: updates `BookingContext` with the chosen package and closes the modal

### API Route

```
app/
  api/
    openai/
      recommend/
        route.ts            — POST endpoint for package recommendation
```

**`POST /api/openai/recommend`**

- Accepts: `{ vehicleType, lastDetail, mainConcern, budget }`
- Injects the matching package data from `placeholder-data.ts` (filtered by vehicle type)
- Calls OpenAI Chat Completions API (`gpt-4o-mini`) with structured output (JSON mode)
- Returns the parsed recommendation array
- No streaming needed — single response

Request:
```json
{
  "vehicleType": "truck",
  "lastDetail": "Over 6 months ago",
  "mainConcern": "Both interior and exterior",
  "budget": "$200+"
}
```

Response:
```json
{
  "recommendations": [
    {
      "packageName": "Gold Package",
      "price": "$300.00",
      "reason": "Your truck hasn't been detailed in over 6 months and needs both interior and exterior attention. The Gold Package is a comprehensive full detail that covers everything — deep interior cleaning, exterior wash, clay bar, polish, and wax."
    },
    {
      "packageName": "Silver Package",
      "price": "$205.00",
      "reason": "If the Gold Package stretches your budget, the Silver Package is a strong alternative. It includes a thorough interior and exterior detail at a lower price point, covering the essentials without the premium add-ons."
    }
  ]
}
```

---

## Architecture Overview

### How Both Features Fit Into the Existing Application

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                   │
├──────────────────────────────────────────────────────────────────────────┤
│  Root Layout (app/layout.tsx)                                            │
│  ├── All existing pages and components                                   │
│  ├── [NEW] ChatWidget (floating, all pages)                              │
│  │        └── ChatWindow → ChatMessage                                   │
│  │                                                                       │
│  Booking Flow (app/booking/)                                             │
│  ├── Step 1: SelectVehicle                                               │
│  ├── Step 2: SelectPackage                                               │
│  │        └── [NEW] "Help me choose" → RecommenderModal                  │
│  │              ├── RecommenderQuiz (3 questions)                         │
│  │              └── RecommenderResults (AI recommendations)              │
│  ├── Step 3: SelectDateTime                                              │
│  └── Step 4: BookingSummary                                              │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                            API LAYER                                     │
├──────────────────────────────────────────────────────────────────────────┤
│  Existing Routes:                                                        │
│  ├── /api/square/*            (bookings, catalog, availability)          │
│  └── /api/resend/sendEmail    (webhook email notifications)              │
│                                                                          │
│  New Routes:                                                             │
│  ├── [NEW] /api/openai/chat       → Chatbot conversations               │
│  └── [NEW] /api/openai/recommend  → Package recommendations             │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                │
├──────────────────────────────────────────────────────────────────────────┤
│  Square API          │  Resend API         │  [NEW] OpenAI API           │
│  ├── Bookings        │  └── Emails         │  ├── gpt-4o-mini            │
│  ├── Customers       │                     │  ├── Chat Completions       │
│  └── Catalog         │                     │  └── JSON mode (recommender)│
└──────────────────────────────────────────────────────────────────────────┘
```

### New File Structure

```
app/
  api/
    openai/
      chat/
        route.ts                — Chatbot API endpoint
      recommend/
        route.ts                — Recommender API endpoint

components/
  chatbot/
    ChatWidget.tsx              — Floating chat button + panel
    ChatWindow.tsx              — Message list and input
    ChatMessage.tsx             — Individual message bubble
    chatSystemPrompt.ts         — System prompt builder

  booking/
    recommender/
      RecommenderModal.tsx      — Modal wrapper for the quiz + results
      RecommenderQuiz.tsx       — 3-question quiz UI
      RecommenderResults.tsx    — AI recommendation display cards
      recommenderPrompt.ts      — Prompt builder with package data

lib/
  api/
    openai.ts                   — OpenAI client initialization
```

### Data Flow

**Chatbot:**
```
User types question
  → ChatWindow sends { messages } to /api/openai/chat
    → API builds [systemPrompt + messages]
    → API calls OpenAI Chat Completions (streaming)
    → Streamed tokens sent back to client
  → ChatWindow renders response in real-time
```

**Recommender:**
```
User answers 3 questions
  → RecommenderModal sends { vehicleType, answers } to /api/openai/recommend
    → API injects package data filtered by vehicle type
    → API calls OpenAI Chat Completions (JSON mode)
    → Parsed recommendations returned
  → RecommenderResults renders recommendation cards
  → User clicks "Select This Package"
  → BookingContext updated with selected package
  → Modal closes, booking flow continues
```

---

## Tools & Technologies

| Tool | Purpose | Why |
|------|---------|-----|
| **OpenAI API** | LLM provider for both features | Chat Completions API with streaming (chatbot) and JSON mode (recommender) |
| **gpt-4o-mini** | Model selection | Low cost (~$0.15/1M input tokens), fast responses, sufficient quality for Q&A and recommendations |
| **openai (npm)** | Server-side SDK | Official Node.js SDK for OpenAI API calls |
| **AI SDK by Vercel** | Optional — streaming helper | `ai` package simplifies streaming responses in Next.js API routes and consuming them on the client with `useChat` hook. Reduces boilerplate. |

### Cost Estimate

Using `gpt-4o-mini`:

- **Chatbot**: ~500 tokens per exchange (system prompt + question + answer). At $0.15/1M input tokens, ~10,000 conversations costs roughly $0.75.
- **Recommender**: ~800 tokens per recommendation. At the same rate, 10,000 recommendations costs roughly $1.20.
- Both features combined are negligible cost at the scale of a local business.

---

## Environment Variables

Add to `.env.local`:

```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

This single key is all that's needed. The model name (`gpt-4o-mini`) and configuration are set in the API route code, not as environment variables.

---

## Summary

| | Chatbot | Recommender |
|---|---|---|
| **Location** | Floating widget, all pages | Inside booking wizard, Step 2 |
| **Interaction** | Free-form conversation | Structured 3-question quiz |
| **AI response** | Streamed text | Single JSON response |
| **Actions** | None — read-only | Pre-fills package selection in BookingContext |
| **Fallback** | Phone number: (616) 226-4109 | Shows all packages if AI fails |
| **State** | Stateless — no memory | Stateless — no memory |
| **API route** | `/api/openai/chat` | `/api/openai/recommend` |
| **Model** | gpt-4o-mini | gpt-4o-mini |
