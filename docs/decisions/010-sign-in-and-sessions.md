# 010: Sign-in and sessions

- **Date:** 2026-11-21
- **Status:** Accepted
- **Summary in:** [docs/product/phase-1.md](../product/phase-1.md) ("Sign-in")

## Context

Phase 1 is a small private group (all on Google accounts; the first UPSC user on an Android phone). Users stay signed in on each device, so signing in is rare. Account identity and sessions are hard to change once users exist.

## Choice

- **Sign in with Google** (OpenID Connect), asking only for basic, non-sensitive information (name, email). Google doesn't require app verification for these scopes; Phase 1 runs in Google's testing mode. Public launch needs Google's lighter brand verification (a homepage and privacy policy on our own domain, domain ownership, sign-in button guidelines), which a public launch needs anyway.
- **Passkeys** (fingerprint or face) added at public launch for faster sign-in without Google.
- **Invite-only:** only invited emails can sign in. The invite list lives in the database (the repo is public, and emails are personal data), managed with a small command; no admin app (a Phase 1 non-goal). Anyone else sees "Kiseki is invite-only for now", and no account is created.
- **Identity is Google's permanent account ID** (`sub`), never the email, which can change; the email is kept for contact and invites.
- **A user and their sign-in methods are stored separately**, so one person can have several (Google now, a passkey later) with no rebuild.
- **Server-side sessions for user login, not JWTs:**
  - the session lives in our database; the browser holds only a random ID in a `Secure`, `HttpOnly` cookie that scripts can't read;
  - signing out deletes the session, so "sign out of this device" and "sign out everywhere" work immediately;
  - about 90 days per device, renewed with use;
  - only a **hash** of the session token is stored, so a leaked database can't be used to log in;
  - **CSRF protection:** `SameSite` cookies plus checking that state-changing requests come from our own site.
- **Where JWTs fit (later):** verifying claims between servers (e.g. services split out in future phases), as short-lived tokens (minutes), never as a user's login session.
- **Only name and email** are stored from Google (picture optional).
- The library or service that implements this is agreed at the sign-in build step.

## Alternatives

- **Email and password:** familiar, but we'd store password hashes, build reset emails, and live with weak or reused passwords.
- **Email magic links:** no passwords, but on phones the link often opens in the mail app's browser instead of the installed app, so the user ends up signed in in the wrong place; needs an email service.
- **Phone number and SMS code:** familiar in India, but costs per message, needs DLT template registration, and carries SIM-swap risk.
- **Passkeys only:** the most secure, but still unfamiliar to many people; better added alongside another method.
- **JWTs as the login session:** a JWT can't be revoked before it expires, so logout, "sign out everywhere" and banning a user don't take effect; adding a revocation list turns it into a more complicated session. Often stored where page scripts can read it.
- **A hosted auth service:** less to build, but a vendor and its cost for a small private group; still possible at the build step.

## Why

Google sign-in is one tap for every Phase 1 user and leaves password storage, resets and account security to Google. Server-side sessions are what security guidance recommends for browser login: they can be ended instantly, and the token never reaches page scripts. Keying identity to Google's permanent ID and separating sign-in methods keeps accounts stable when emails change and when passkeys arrive.

## Sources

- OWASP, [JSON Web Token Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html): consider a plain server-side session system; JWTs have no built-in revocation.
- Auth0, [Session tokens vs JWTs](https://auth0.com/intro-to-iam/session-tokens-vs-jwts); Encore, [JWT vs session authentication](https://encore.dev/articles/jwt-vs-session-authentication): sessions for a first-party web app, short-lived JWTs between services.
- Redis, [JWTs are dangerous for user sessions](https://redis.io/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions); DZone, [Stop using JWTs as session tokens](https://dzone.com/articles/stop-using-jwts-as-session-tokens).
- Google, [OAuth production readiness](https://developers.google.com/identity/protocols/oauth2/production-readiness/overview): verification isn't mandatory for apps using only non-sensitive scopes; [OAuth app verification](https://support.google.com/cloud/answer/9110914) and [verification requirements](https://support.google.com/cloud/answer/13464321): brand verification.
