# Pigmento: Project Plan

An overview tool for a small, solo tattoo shop. It is **not** a customer-facing booking system. Communication stays on Instagram. The app is where the owner records what was agreed, so nothing gets lost in DMs.

## Goals

- One place to see all appointments, consultations and open inquiries
- Fast capture: adding a booking takes under 20 seconds
- Entry on PC, viewing on phone (PWA)
- A learning project for the developer, built to a standard that is safe to use daily

## Non-goals

- Instagram API integration (a handle and a link only)
- Customer self-service booking or payments
- Multi-artist / multi-tenant support (may come later)

## Users

A single owner. One account, with Row Level Security enforcing `user_id = auth.uid()` on all tables.

## Tech stack

| Area | Choice |
|---|---|
| Frontend | SvelteKit (TypeScript), PWA |
| Backend / DB | Supabase (Postgres, Auth, Storage) |
| Hosting | Vercel (Supabase in an EU region) |
| Calendar | FullCalendar first; custom Svelte views only if needed |
| Tests | Vitest (logic), Playwright (main flows) |
| CI | GitHub Actions: lint, typecheck, test on every PR |

## Data model (draft)

- `clients`: id, user_id, name, ig_handle, phone, email, notes, health_notes, created_at
- `appointments`: id, user_id, client_id, type, starts_at, ends_at, status, price, deposit_amount, deposit_paid, notes, created_at
- `attachments` (v2): id, user_id, client_id / appointment_id, file_path, kind

Enums:
- `appointment_type`: consultation, session, touch_up, other
- `appointment_status`: inquiry, confirmed, completed, cancelled, no_show

## Early decisions

1. **Time zones:** store `timestamptz`, display in `Europe/Oslo`.
2. **Deposit:** tracked as amount + boolean, not as a status.
3. **Overlaps:** warn, never hard-block.
4. **GDPR:** EU hosting, a delete-client action that truly deletes, minimal health data in v1, and a short note on what is stored and why.

## Milestones

### M0: Foundation
- [ ] SvelteKit scaffold, ESLint, Prettier, TypeScript strict
- [ ] GitHub Actions CI
- [ ] Vercel deploy
- [ ] Supabase project and local dev via CLI, first migration
- [ ] Email login for one owner, protected routes

### M1: Clients
- [ ] `clients` table with RLS
- [ ] List, search, create, edit, delete
- [ ] Tests for RLS and the main flow

### M2: Appointments
- [ ] `appointments` table with RLS
- [ ] Create / edit forms, with inline "new client"
- [ ] Validation (end after start) and overlap warning

### M3: Calendar
- [ ] Day, week and month views
- [ ] Colour by type and status
- [ ] Click slot to create, click event to edit
- [ ] Mobile: agenda/list view

### M4: Overview
- [ ] "Today and next 7 days" home page
- [ ] Open inquiries list
- [ ] Quick-add button and keyboard shortcuts

### M5: PWA and polish
- [ ] Installable, with a read-only offline cache
- [ ] Accessibility pass, empty and error states
- [ ] Optional iCal feed

### M6: Pilot
- [ ] Owner uses it for 2 weeks with real bookings
- [ ] Collect feedback, fix the top friction points
- [ ] Decide on v2

## v2 ideas

- Deposit and income overview
- Reminders (push or SMS)
- Reference and healed-photo uploads
- Digital consent and health form
- Aftercare message templates to paste into Instagram
- Multiple artists

## Risks

| Risk | Mitigation |
|---|---|
| Owner stops updating it | Fast capture, early feedback, a useful phone view |
| Sensitive data / GDPR | EU region, RLS, minimal health data, real deletion |
| Time zone bugs | `timestamptz` everywhere, one display helper, tests |
| Scope creep | Keep to "overview tool, not a booking platform" |
| Unclear ownership/maintenance | Agree up front who owns and maintains the code |

## Next steps

1. Sit down with the owner and sketch 3-4 screens on paper
2. Create GitHub issues for M0-M6
3. Start M0
