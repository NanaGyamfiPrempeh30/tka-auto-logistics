# Product Requirements Document
## TKA Auto's & Logistics — Web App v1

**Prepared for:** Build in Claude Code
**Stack:** Next.js (React) + Vercel (hosting) + GitHub (source control/CI)
**Client:** TKA Auto's & Logistics — Atlanta, GA. Auction car sourcing (Copart, IAAI, Manheim) + USA→Ghana shipping.

---

## 0. Scope Reality Check (read this first)

The client's ask ("latest auction/logistics components, but simple") implies live inventory search like Copart.com. **That is not v1.** Copart/IAAI/Manheim don't hand out public search APIs to buying agents — that needs a paid data license or dealer-scrape, both expensive and legally messy. Confirmed v1 scope instead:

- ✅ Marketing site + lead/quote capture (no live auction data)
- ✅ Customer accounts with a shipment tracking dashboard
- ✅ Online deposit payments (Stripe + Paystack)
- ✅ Staff/admin panel to manually create and update customer orders

This means v1 is a **lead-gen site + lightweight CRM + client portal**, not a brochure site. Treat it as such when estimating.

**Open decision, defaulted below — confirm with client before building:** Stripe handles USD deposits (auction purchase price), Paystack handles GHS/mobile money (Ghana-side shipping/customs fees). If the client actually wants one processor only, this cuts scope — ask before Phase 3.

---

## 1. Goal

Give TKA a professional web presence that:
1. Converts visitors into quote requests / auction purchase leads
2. Lets existing customers log in and see their car's status (Auction → Container → RoRo → State Towing → Ghana Delivery — mirrors their existing 5-step process)
3. Lets TKA staff manage orders without touching code (admin panel)
4. Takes deposit payments online instead of only WhatsApp/bank transfer

## 2. Users

| User | Needs |
|---|---|
| Prospect (Ghana or US-based buyer) | See services, get a quote, trust the company, contact fast (WhatsApp is primary channel per current flyer) |
| Existing customer | Log in, see order status, see photos/docs, pay remaining balance |
| TKA staff/admin | Create orders, update status, upload documents/photos, view leads, mark payments received |

## 3. Information Architecture

```
/                      Home (hero, services, trust signals, CTA)
/services              5-step process detail (Auction → Container → RoRo → Towing → Door delivery)
/inventory             "Cars we've recently sourced" — manually curated showcase, NOT live search
/how-it-works          Explainer for first-time buyers (auction bidding basics)
/get-a-quote           Lead capture form (multi-step)
/about                 Company info, trust badges, WhatsApp/Instagram/Snapchat links
/contact               Contact form + WhatsApp click-to-chat + hours (Mon-Sat 9-7, Sun 11-5)
/login /register       Auth
/dashboard             Customer portal (order list → order detail → status timeline)
/dashboard/orders/[id] Single shipment tracker + documents + pay balance
/admin                 Staff-only: leads, orders, customers, payments (role-gated)
```

## 4. Feature Specs

### 4.1 Public Marketing Site
- Hero section using existing brand assets (logo, port/crane imagery, car renders)
- "We Buy From" trust bar: Copart, IAAI, Manheim, CarGurus (from flyer)
- 5-step service visual (Auction, Container Shipping, RoRo Shipping, State-to-State Towing, Door-to-Door Ghana) — reuse flyer's icon set as inspiration, rebuild as real icons/SVG, not screenshots
- USA → Ghana flag motif (already in brand)
- Sticky WhatsApp click-to-chat button (both numbers from flyer: +1 470-662-7765 US, +233 59 854 1516 Ghana)
- Instagram/Snapchat links (kwame_asid, Tkaautoslogistics)

### 4.2 Get a Quote (lead capture)
Multi-step form, NOT a single wall of fields (dyslexia/mobile-friendly, higher completion rate):
1. What do you need? (Source a car / Ship a car I already bought)
2. Vehicle basics (make, model, year, auction site if known, VIN if known)
3. Ghana delivery city
4. Contact info (name, phone/WhatsApp, email)
→ Submits to admin panel as a "Lead," triggers email/WhatsApp notification to TKA staff.

### 4.3 Customer Dashboard
- Auth (email/password + optional Google login)
- Order list → order detail page
- Status timeline (5 stages, matches their real process) with dates + photos staff upload at each stage
- Documents tab (bill of lading, title, customs docs — PDF upload/download)
- "Pay Balance" button → Stripe (USD) or Paystack (GHS) depending on what's owed

### 4.4 Admin Panel (staff-only, role-gated)
- Leads inbox (from quote form)
- Orders: create new order from a lead, assign vehicle info, update status stage, upload photos/docs
- Payments: see deposit/balance status per order (synced from Stripe/Paystack webhooks)
- Simple — no need for analytics/reporting in v1

### 4.5 Payments
- Stripe: USD deposit at order creation — majority of volume, build this first
- Paystack: GHS/MTN MoMo balance or shipping fee payment — build second, after Stripe is live and tested
- Both via webhook → auto-update order payment status, no manual reconciliation
- Paystack payout account confirmed: MTN MoMo Merchant account
- **Build note (builder is new to payment integration):** use each provider's hosted checkout page (Stripe Checkout, Paystack Checkout/Inline), not a custom payment form. You redirect the customer to the provider's page, they pay, the provider redirects back and fires a webhook. This avoids handling card data directly and cuts integration time significantly. Do not attempt a custom-styled payment form in v1 — that's a v2 polish item once both integrations work.
- **Fallback if behind schedule:** ship Phase 4 with Stripe only. GHS-paying customers use WhatsApp/bank transfer manually until Paystack is added — this does not block launch.

## 5. Data Model (high-level)

```
User          { id, name, email, phone, role[customer|admin], passwordHash }
Lead          { id, name, contact, vehicleInterest, ghanaCity, status[new|contacted|converted], createdAt }
Order         { id, userId, vehicleMake, vehicleModel, vehicleYear, auctionSource, vin,
                stage[auction|container|roro|towing|delivered], depositAmount, balanceAmount,
                depositPaid, balancePaid, createdAt }
OrderUpdate   { id, orderId, stage, note, photoUrls[], createdAt }   // staff-posted timeline entries
Document      { id, orderId, type, fileUrl, uploadedAt }
Payment       { id, orderId, provider[stripe|paystack], amount, currency, status, providerRef }
```

## 6. Design Direction

- Base palette: black + white (matches existing logo — dark, high-contrast, automotive/premium feel)
- One accent color for CTAs/links — recommend a strong red or gold pulled from the "auction" energy (Copart red / gold accents already sit naturally next to the brand). **Pick one, don't use both** — two accents fights the monochrome logo.
- Ghana/USA flag colors used only as small motif elements (route icons, badges), never as a background or dominant palette — keeps it premium, not gimmicky
- Typography: bold condensed sans-serif for headings (matches the logo's wordmark), clean readable sans for body
- Mobile-first: majority of Ghana-side customers will view on phone
- Reuse the two flyer layouts' actual content (trust badges, "We Buy From" logos, 5-step icons) but rebuild as proper responsive components — don't screenshot the flyer

## 7. Non-Functional Requirements

- Hosting: Vercel (client's chosen stack)
- Source control: GitHub, main branch auto-deploys to Vercel
- Auth: NextAuth or Clerk (pick one — Clerk is faster to ship for a v1 with roles)
- Database: Supabase (Postgres + Auth + Storage in one — covers users, orders, payments, and document uploads)
- File storage: Supabase Storage for documents/photos
- Must be mobile-responsive — assume 70%+ traffic is mobile
- Basic SEO: meta tags, sitemap, OG images for social sharing

## 8. Explicitly Out of Scope (v1)

- Live auction search/bidding integration
- Multi-language support
- In-app messaging/chat (WhatsApp handles this today — don't rebuild it)
- Analytics dashboards for admin
- Automated VIN decode / damage report pulling

## 9. Build Phases (for Claude Code execution order)

1. **Phase 1:** Marketing site (static pages, no auth/db) — deploy first, gets client something live fast
2. **Phase 2:** Quote form + admin leads inbox (adds database)
3. **Phase 3:** Auth + customer dashboard (read-only order status, no payments yet)
4. **Phase 4:** Payments (Stripe + Paystack) + document uploads
5. **Phase 5:** Polish — admin order creation flow, notifications, QA pass

## 10. Open Questions for Client (resolve before Phase 3+)

1. ~~Confirm Stripe (USD) + Paystack (GHS) split is correct — or do they want one processor only?~~ **Resolved:** Both, confirmed — client says most customers pay in USD, so Stripe carries the majority of volume, Paystack covers GHS/MoMo customers.
2. ~~Does TKA have a Ghana business bank account for Paystack payouts?~~ **Resolved:** Paystack payouts go to an MTN MoMo Merchant account. No bank account needed.
3. ~~Who manually enters order data — one admin user, or multiple staff logins needed?~~ **Resolved:** Single admin login. No need for role/permission tiers in v1 — one `admin` role is enough, skip building a staff-management screen.
4. ~~Any existing customer data to migrate, or starting from zero?~~ **Resolved:** Starting clean. No migration script needed.
