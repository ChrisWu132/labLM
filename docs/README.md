# VibeCoding Lab - Documentation

## 🎯 Current Focus: VibeCoding Lab (Standalone Product)

**We are building an AI-powered programming education platform** where complete beginners learn full-stack development by observing AI code in real-time.

**MVP Timeline**: 6 weeks
**Status**: Planning → Development

---

## 📂 Active Documentation

### Core Epic & Stories

**Epic 003: VibeCoding Platform**
→ [`epics/epic-003-vibecoding.md`](./epics/epic-003-vibecoding.md)

**Stories (Implementation Order):**
1. [`stories/story-004.md`](./stories/story-004.md) - WebContainers Platform (Weeks 1-2)
2. [`stories/story-005.md`](./stories/story-005.md) - AI Agent Code Generation (Week 3)
3. [`stories/story-006.md`](./stories/story-006.md) - Auto-Testing & Self-Healing (Week 4)
4. [`stories/story-007.md`](./stories/story-007.md) - Lab Curriculum (Week 5)

### Foundation (Completed)

These support the entire platform:
- [`stories/story-000.md`](./stories/story-000.md) - Database Schema (Supabase)
- [`stories/story-012.md`](./stories/story-012.md) - Landing Page
- [`stories/story-013.md`](./stories/story-013.md) - Authentication

---

## ⏸️ Future Modules (Paused)

Original plan was a 6-module entrepreneurship course. We've **paused** these to focus on VibeCoding Lab as a standalone product:

**Location**: [`future-modules/`](./future-modules/)

**Paused Epics:**
- Epic 002: Problem Discovery
- Epic 004: Go-To-Market
- Epic 005: Iterate & Metrics
- Epic 006: Demo & Certificate

**Why Paused**: Focus on perfecting one experience (VibeCoding) rather than shipping six mediocre modules. These can be revisited if VibeCoding proves successful.

---

## 🏗️ Project Structure

```
docs/
├── README.md (this file)           Project overview & navigation
├── epics/
│   ├── epic-001.md                 Foundation epic
│   ├── epic-003-vibecoding.md      ⭐ ACTIVE - Main epic
│   └── epic-007.md                 Platform epic
├── stories/
│   ├── story-000.md                Database schema (foundation)
│   ├── story-004.md                ⭐ WebContainers platform
│   ├── story-005.md                ⭐ AI Agent
│   ├── story-006.md                ⭐ Auto-testing
│   ├── story-007.md                ⭐ Lab curriculum
│   ├── story-012.md                Landing page (foundation)
│   └── story-013.md                Authentication (foundation)
├── future-modules/                 ⏸️ Paused content
│   ├── README.md                   Why these are paused
│   ├── epics/                      Epic 002, 004, 005, 006
│   └── stories/                    Related stories
├── architecture/                   Technical architecture
├── prd/                           Original product requirements
└── prompts/                       AI prompt templates
```

---

## 🚀 Quick Start for Team

### For Product Team
1. Read [`epics/epic-003-vibecoding.md`](./epics/epic-003-vibecoding.md) - Understand the vision
2. Review stories 004-007 - Implementation plan
3. Check `future-modules/README.md` - Context on paused work

### For Engineering Team
1. Start with [`stories/story-004.md`](./stories/story-004.md) - Week 1-2 work
2. Review [`stories/story-000.md`](./stories/story-000.md) - Database setup
3. Check `architecture/` for system design

### For New Team Members
1. Read this file (you're here!)
2. Read [`epics/epic-003-vibecoding.md`](./epics/epic-003-vibecoding.md)
3. Ask questions in #vibecoding-dev

---

## 📊 Current Status

| Component | Status | Documentation |
|-----------|--------|---------------|
| **VibeCoding Lab** | 🚀 In Development | Epic 003, Stories 004-007 |
| Foundation | ✅ Complete | Stories 000, 012, 013 |
| Future Modules | ⏸️ Paused | `future-modules/` |

---

## 🎯 Success Metrics (MVP)

- **80%+ completion rate** for all 3 labs
- **Students complete labs** in 10/15/20 minutes
- **AI success rate**: 90%+ code generation works
- **Platform performance**: <5s load, <45s prompt-to-app
- **User feedback**: 80%+ "understand how web apps work"

---

## 🔄 Recent Changes

**2025-10-13: Project Refocus**
- ✅ Shifted from 6-module course to standalone VibeCoding Lab
- ✅ Moved Epic 002, 004, 005, 006 to `future-modules/` (paused)
- ✅ Focus: Ship VibeCoding MVP in 6 weeks
- ✅ Simplified documentation structure

**Rationale**: Better to perfect one experience than ship six mediocre modules. VibeCoding Lab can be a complete product on its own.

---

## 📞 Questions?

- **Product questions**: @product-lead
- **Technical questions**: @engineering-lead
- **Documentation issues**: Open issue with "Docs:" prefix

---

**Last Updated**: 2025-10-13
**Project**: VibeCoding Lab MVP
**Timeline**: 6 weeks from kickoff
