# 012: Notifications machinery

- **Date:** 2026-11-21
- **Status:** Accepted
- **Summary in:** [docs/product/phase-1.md](../product/phase-1.md) ("Notifications machinery"; what each notification says is in "Study mode and phone distractions")

## Context

v0.1 sends a nudge when each study session starts, in the user's own time zone, and a reminder to turn Do Not Disturb off after study mode. A nudge depends on the user's routine, which can change at any time. Missing a nudge breaks the habit we're trying to build; sending one twice is noise.

## Choice

- **Delivery:** the browser **Web Push** standard (works for the installed app on Android and desktop), behind our own interface, so a service like Firebase could replace it without changes elsewhere. Each notification opens the exact screen it's about.
- **The routine is the intent:** no nudge is scheduled in advance; edits to the routine apply automatically.
- **A sweep every minute:** a cron job in a Postgres-based queue (which runs once even with several servers) finds study sessions starting now in each user's own time zone. Time zones are stored by full name (e.g. `Asia/Kolkata`), never as a bare hour, with defined behaviour when clocks change.
- **One record per occurrence**, with a uniqueness rule on user + session + date, so an overlapping or repeated sweep can't create a second one.
- **Outbox:** the record and its delivery job are written in one transaction, so nothing is lost between deciding and queueing.
- **Delivery worker:** sends, retries on failure, marks "sent" only after success, and removes a device's subscription when the browser reports it gone.
- **Catch-up window:** a delayed nudge is still sent up to 10 minutes late, otherwise skipped (a late "start studying" nudge is noise).
- **Likely tool:** pg-boss (Postgres only, no Redis; cron and adding jobs in the same transaction), confirmed at the build step.
- **Platforms:** Android works fully; iPhones need iOS 16.4+ with the app on the home screen, and Chrome on iPhone has no push. This doesn't affect Phase 1 users.

## Alternatives

- **Timers inside the server** (`setTimeout`): lost on every restart or deploy.
- **Scheduling every nudge ahead as a job:** exact times, but every routine edit means finding and cancelling old jobs; stale jobs fire at the wrong time.
- **A hosted scheduling service:** a vendor and its cost for a simple, low-volume job.
- **A Redis-based queue (BullMQ):** more features and throughput than we need, plus an extra server; Postgres is already in the stack.
- **A push vendor as the base** (e.g. Firebase Cloud Messaging): unnecessary for web push on our platforms; still possible behind the interface.

## Why

Keeping the intent in the database and sweeping for what's due is the common design for per-user recurring reminders at low volume: it heals itself when routines change, survives restarts, and is easy to reason about. The uniqueness rule and the outbox give "never twice, never lost". A Postgres queue avoids adding Redis.

## Sources

- MagicBell, [Notification system design](https://www.magicbell.com/blog/notification-system-design); DEV, [per-user reminder scheduling with cron fallback](https://dev.to/fitzgeraldblake3561/seven-day-per-user-reminder-scheduling-explained-with-queue-limits-and-cron-fallback-4521) and [per-user notification scheduling](https://dev.to/wilhelmknight8435/per-user-notification-scheduling-queue-delay-cron-and-https-webhook-design-2m6a): durable schedule as the source of truth, periodic sweep, per-occurrence idempotency, time zones stored by name.
- KodeKloud, [the duplicate trap](https://notes.kodekloud.com/docs/System-Design-for-Interview-Prep/Fan-Out-One-Event-Many-Readers/Notification-System-The-Duplicate-Trap/page); OneUptime, [transactional outbox](https://oneuptime.com/blog/post/2026-07-22-transactional-outbox-duplicate-events/view): uniqueness rules, mark sent only after sending, the outbox pattern.
- [pg-boss](https://github.com/timgit/pg-boss); DEV, [Postgres instead of Redis for job queues](https://dev.to/aws-builders/i-removed-redis-from-my-stack-and-used-postgresql-for-job-queues-instead-2lp5).
- MagicBell, [PWA iOS limitations](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide); MobiLoud, [PWA push notifications](https://www.mobiloud.com/blog/pwa-push-notifications).
