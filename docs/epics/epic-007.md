# Epic 007: Landing Page & Login Foundation

## Status
✅ **COMPLETED** (Story 012, Story 013)

## Goal
Deliver the marketing landing page and Supabase-powered login flow that funnel prospects into the course and send them directly to the orientation module.

## Scope
- ✅ Single-scroll Next.js marketing page with sections: Hero, module overview cards, sample certificate proof, pricing CTA, FAQ, final CTA. (Story 012)
- ✅ Enrollment CTA triggering Supabase auth page with email/password + Google OAuth. (Story 013)
- ✅ Post-login redirect to `/dashboard/orientation` with success toast. (Story 013)
- ⚠️ Basic analytics hooks (page view, CTA click) for future iteration.

## Out of Scope
- Multi-step checkout, payment processing, or marketing automation (handled outside MVP).
- A/B testing infrastructure or localization.
- Magic link authentication (using email/password + OAuth instead for better UX).

## Success Criteria
- ✅ Landing page LCP < 2.5s on mobile.
- ✅ Email/password + Google OAuth login implemented with error handling.
- ✅ Orientation route opens automatically after login with no manual navigation.

## Dependencies
- ✅ Supabase project configuration (auth providers, redirect URLs).
- ⏳ Hosting of sample certificate images (placeholder gradients used).
- ⚠️ Analytics integration (deferred to post-MVP).

