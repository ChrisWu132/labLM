# Epic 001: Orientation Snapshot Experience

## Goal
Deliver the Module 0 onboarding snapshot so learners immediately understand the course flow, confirm required tools, and start the journey without friction.

## Scope
- Dashboard orientation page with 3-minute welcome video, roadmap text, and tool checklist.
- Binary progress toggle (not started vs started) tied to the "Start" button routing into Module 2 (skipping Module 1 for now).
- Support copy, troubleshooting tips, and embedded coach guidance for Sandpack access and optional community join.

## Out of Scope
- Surveys, goal forms, progress gamification, badges.
- Automated reminders or email sequences.

## Success Criteria
- Learners launch Module 2 within 5 minutes of login.
- Page renders in <1.5s on desktop and mobile.
- Support links resolve correctly.

## Note
Module 1 (Problem Discovery) is temporarily skipped in the implementation order. Module 2 (Vibecoding) can be completed independently.

## Dependencies
- Supabase auth redirect to the orientation route.
- Hosting of the welcome video (Loom or static MP4).
- Coach prompt library for common onboarding questions.

