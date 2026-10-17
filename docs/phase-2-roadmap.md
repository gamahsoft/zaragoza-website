# Phase 2 Roadmap

Phase 2 is future scope and is **not included in the Phase 1 prototype**. The current code provides a small typed content-access boundary and stable menu identifiers so approved systems can be introduced later without prematurely choosing providers.

## Decisions required before implementation

### Restaurant POS and menu synchronization

- Confirm the restaurant's POS and source of truth for items, pricing, tax categories, and availability.
- Decide sync direction, frequency, failure handling, and manual override ownership.
- Map stable website item IDs to provider identifiers only after a provider is selected.

### CMS workflow

- Define editor roles, permissions, approval steps, preview environments, scheduled publishing, and audit needs.
- Decide which content types belong in a CMS and which deployment configuration remains code-owned.
- Select a CMS only after editorial and integration requirements are approved.

### Guest ordering

- Define dine-in versus pickup ordering, modifiers, item availability, sold-out behavior, lead times, scheduled orders, and cancellation rules.
- Determine guest checkout, account needs, accessibility, and customer support paths.

### Pickup operations

- Confirm preparation-time logic, pickup windows, capacity limits, order throttling, handoff location, late-arrival handling, and holiday overrides.

### Delivery

- Select a delivery model and provider after defining zones, distance rules, fees, minimums, dispatch ownership, live tracking, substitutions, and failed-delivery support.

### Payments, taxes, and refunds

- Confirm merchant of record, processor, tax calculation, tips, gift cards, receipts, partial fulfillment, cancellation, refund, chargeback, and reconciliation workflows.
- Complete security, privacy, and legal reviews before handling customer or payment data.

### Notifications and marketing

- Separate transactional consent from marketing preferences.
- Define email/SMS providers, templates, sender identity, opt-in records, quiet hours, failure handling, unsubscribe behavior, retention, and support escalation.

## Deliberately deferred

No CMS, POS, delivery, payment, email, SMS, authentication, database, ordering backend, or speculative provider interface is installed in Phase 1. Provider evaluation should follow approved operational requirements, not precede them.
