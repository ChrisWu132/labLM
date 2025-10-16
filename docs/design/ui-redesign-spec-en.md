# VibeCoding Lab UI Redesign Specification

**Version**: 1.0
**Date**: 2025-10-13
**Status**: Pending Implementation
**Design Philosophy**: Fresh, Trustworthy, Encourages Exploration, Rational but Not Cold, Light and Energetic

---

## 📋 Table of Contents

1. [Design Philosophy Comparison](#design-philosophy-comparison)
2. [Color System Restructuring](#color-system-restructuring)
3. [Typography System Updates](#typography-system-updates)
4. [Component Style Adjustments](#component-style-adjustments)
5. [Copywriting Tone Guidelines](#copywriting-tone-guidelines)
6. [Implementation Checklist](#implementation-checklist)

---

## 🎯 Design Philosophy Comparison

### Current Design (Old)

| Dimension | Current State |
|-----------|--------------|
| **Temperament** | Professional, EdTech feel, Business-oriented |
| **Colors** | Blue dominant (#1A5CFF), Navy dark, Teal/Amber accents |
| **Border Radius** | Medium radius (8px / 0.5rem) |
| **Typography** | Geist Sans (tech-focused) |
| **Tone** | Formal, complete sentences, explanatory |

### New Design Direction (Target)

| Dimension | Target |
|-----------|--------|
| **Temperament** | Fresh, light and energetic, encourages exploration |
| **Colors** | Electric Blue (#3A7BFA), Fresh Green/Cyan accents, Amber highlights |
| **Border Radius** | Softer (16-20px) |
| **Typography** | Geometric Sans (Inter/Plus Jakarta Sans) |
| **Tone** | Verb-driven, short sentences, companion-style guidance |

**Core Shift**: From "Professional Education Platform" → "Encouraging Maker Space"

---

## 🎨 Color System Restructuring

### Comparison Table: Old → New

| Purpose | Old Color (Hex) | Old Color (OKLCH) | New Color (Hex) | Color Name |
|---------|----------------|-------------------|----------------|------------|
| **Primary** | `#1A5CFF` | `oklch(0.55 0.22 264)` | `#3A7BFA` | Electric Blue |
| **Secondary-Green** | - | - | `#22C55E` | Fresh Green (New) |
| **Secondary-Cyan** | `#1BC5AE` (Teal) | `oklch(0.7 0.15 180)` | `#06B6D4` | Cyan Blue |
| **Accent** | `#FFB347` (Amber) | `oklch(0.8 0.15 60)` | `#F59E0B` | Amber (Minimal use) |
| **Navy** | `#0E1B3D` | - | ❌ **Removed** | - |
| **Success** | - | - | `#10B981` | Success Green |
| **Warning** | - | - | `#F97316` | Warning Orange |
| **Error** | - | - | `#EF4444` | Error Red |
| **Info** | - | - | `#2563EB` | Info Blue |

### Neutral Color System

| Purpose | Light Mode (New) | Dark Mode (New) | Current (Light) | Current (Dark) |
|---------|-----------------|----------------|----------------|----------------|
| **Base Background** | `#F7F8FA` | `#0B0F14` | `oklch(0.99 0 0)` | `oklch(0.145 0 0)` |
| **Surface/Card** | `#FFFFFF` | `#111827` | `oklch(1 0 0)` | `oklch(0.18 0 0)` |
| **Divider** | `#E5E7EB` | `#1F2937` | `oklch(0.922 0 0)` | `oklch(0.269 0 0)` |
| **Primary Text** | `#111827` | `#E5E7EB` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| **Secondary Text** | `#6B7280` | `#9CA3AF` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |

### Color Usage Rules

#### ✅ Should Do

- **Primary (#3A7BFA)** for:
  - Primary CTA buttons ("Start Learning", "Try Now")
  - Links and active states
  - Focus rings and selected states

- **Fresh Green (#22C55E)** for:
  - Progress bars and completion states
  - "Saved", "Test Passed" success feedback
  - Lab completion badges

- **Cyan Blue (#06B6D4)** for:
  - Explorable elements (tags, secondary links)
  - Info tips, Tips backgrounds
  - Secondary action buttons ("Learn More")

- **Amber (#F59E0B)** for:
  - Achievement badge accents (Lab 2-3 completion)
  - Important notices/new feature markers
  - **Minimal use**, avoid large areas

#### ❌ Prohibited

- High-saturation gradients covering backgrounds
- Neon borders
- Navy dark as primary background (removed)
- Using 3+ accent colors simultaneously

### Gradients (Optional)

```css
/* Subtle background texture - only for large background areas */
background: linear-gradient(135deg, #3A7BFA08 0%, #06B6D408 100%);
/* Opacity ≤ 8%, angle 135° */
```

---

## ✍️ Typography System Updates

### Font Families

| Purpose | Current | New Specification | Notes |
|---------|---------|------------------|-------|
| **Sans-Serif** | Geist Sans | **Inter** or Plus Jakarta Sans | Geometric sans, softer |
| **Monospace** | Geist Mono | Geist Mono / JetBrains Mono | Keep monospace |

**Implementation Recommendation**:
```css
font-family: 'Inter Variable', 'Inter', -apple-system, sans-serif;
```

### Font Weights

| Level | Current | New Specification |
|-------|---------|------------------|
| **Headings** | Semibold (600) | **Medium (500)** |
| **Body** | Regular (400) | Regular (400) |
| **Secondary** | Regular (400) | Regular (400) |
| **Code** | Regular (400) | Regular (400) |

### Copywriting Tone Guidelines

#### ✅ Recommended Phrasing

| Scenario | Old Copy | New Copy (Verb-driven) |
|----------|----------|----------------------|
| **Hero CTA** | "Start Learning Free" | **"Try it Now"** / "Start Building" |
| **Progress Tips** | "Completed" | **"Progress +10%"** / "Well Done!" |
| **Lab Guide** | "Lab 1: Personal Landing Page" | **"Lab 1: Build Your Homepage"** |
| **Error Message** | "Error occurred" | **"Check What's Wrong"** / "Step by Step" |
| **Success Message** | "Lab Completed" | **"Well Done! More Exciting Ahead"** |

#### Copy Vocabulary Bank

**Encouragement**:
- Try it now
- See what happens
- Step by step
- Do, and it happens

**Feedback**:
- Saved
- Progress +10%
- Pro tip
- Keep exploring

**Completion**:
- Well done!
- More exciting ahead
- New skill unlocked

#### ❌ Avoid

- Vague slogans ("Become an excellent developer")
- Overly long complete sentences
- Passive voice
- Hard business terminology

---

## 🧩 Component Style Adjustments

### 1. Button (Button)

#### Border Radius

| Current | New Specification |
|---------|------------------|
| `rounded-md` (6px) | **`rounded-2xl`** (16px) |

#### Variant Colors

| Variant | Current Background | New Background | Hover Effect |
|---------|-------------------|----------------|--------------|
| **default** | `#1A5CFF` | **`#3A7BFA`** | Brightness +3%, slight translateY(-1px) |
| **secondary** | Gray | **`#06B6D4`** (Cyan) | Same as above |
| **success** | - | **`#22C55E`** (Fresh Green) | Same as above |
| **outline** | Border | Border `#E5E7EB` | Border appears |

#### Animation

```
transition: 150-200ms
easing: ease-out (cubic-bezier(0, 0, 0.2, 1))
hover: translateY(-1px), brightness(1.03)
active: translateY(1px)
```

---

### 2. Card (Card)

#### Border Radius & Shadow

| Property | Current | New Specification |
|----------|---------|------------------|
| **Border Radius** | `rounded-xl` (12px) | **`rounded-2xl`** (16-20px) |
| **Shadow** | `shadow-sm` | **Shallow shadow**: `y=2 blur=8 rgba(0,0,0,0.1)` |
| **Hover Shadow** | `shadow-lg` | **Floating shadow**: `y=8 blur=24 rgba(0,0,0,0.14)` |

#### Border

```
border: 1px solid #E5E7EB (light) / #1F2937 (dark)
/* Low-contrast gray, enhances structure */
```

---

### 3. Badge (Badge)

#### Color Mapping

| Purpose | Current | New Color |
|---------|---------|-----------|
| **Primary** | `#1A5CFF` | **`#3A7BFA`** |
| **Success** | - | **`#22C55E`** (Fresh Green) |
| **Info** | - | **`#06B6D4`** (Cyan) |
| **Warning** | - | **`#F59E0B`** (Amber) |

#### Border Radius

```
rounded-full (fully rounded) or rounded-lg (8px)
```

---

### 4. Progress (Progress)

#### Colors

```
background: #E5E7EB (track)
fill: #22C55E (Fresh Green - progress)
```

#### Animation

```
On completion: Brief flash or sweep (≤ 600ms)
transition: width 300ms ease-out
```

---

### 5. Input (Input)

#### Border Radius & Border

| Property | Current | New Specification |
|----------|---------|------------------|
| **Border Radius** | `rounded-md` (6px) | **`rounded-xl`** (12px) |
| **Border** | `#E5E7EB` | Same |
| **Focus Ring** | Primary Blue | **`#3A7BFA` + `#06B6D4` dual ring (optional)** |

#### Focus Visibility

```
focus-visible:
  ring-2 ring-primary ring-offset-2
  or dual ring: ring-2 ring-primary + ring-4 ring-cyan/20
```

---

### 6. Icons (Icons)

#### Style

- **Linear icons** primarily (Lucide Icons compliant)
- Rounded endpoints
- Uniform stroke width (1.5-2px)
- Important states can be filled with primary color

#### Colors

```
default: #6B7280 (secondary text gray)
active: #3A7BFA (primary)
success: #22C55E (fresh green)
```

---

## 🌈 Status Color System

### Complete Status Color Table

| Status | Color (Hex) | Purpose |
|--------|------------|---------|
| **Info** | `#2563EB` | Info notices, Tips |
| **Success** | `#10B981` | Success operations, tests passed |
| **Warning** | `#F59E0B` | Warnings, important notices |
| **Error** | `#EF4444` | Errors, failure states |
| **Neutral** | `#6B7280` | Neutral information |

### Data Visualization Colors (Charts)

```
Series 1: #3A7BFA (primary)
Series 2: #06B6D4 (cyan)
Series 3: #8B5CF6 (purple)
Series 4: #22C55E (fresh green)

Grid Lines: #E5E7EB (light) / #1F2937 (dark)
```

---

## ♿ Accessibility Requirements

### Contrast Standards

| Element Type | WCAG Level | Minimum Contrast |
|--------------|-----------|-----------------|
| **Primary Action Text** | AA | ≥ 4.5:1 |
| **Large Text (≥18pt)** | AA | ≥ 3:1 |
| **Graphics/Icons** | AA | ≥ 3:1 |

### Focus Ring Design

```css
/* Clear visible focus ring */
focus-visible: {
  outline: 2px solid #3A7BFA;
  outline-offset: 2px;
}

/* Optional: Dual ring design */
focus-visible: {
  box-shadow:
    0 0 0 2px #FFFFFF,      /* Inner ring - white spacer */
    0 0 0 4px #3A7BFA;      /* Outer ring - primary color */
}
```

### Color Not Sole Information Carrier

**Example**:
```
❌ Only use red for errors
✅ Red + icon + text description
```

---

## 🎭 Illustration & Decoration

### Illustration Style

- **Flat geometric** + light volumetric feel
- Minimal soft shadows (y=4 blur=12 rgba(0,0,0,0.08))
- Themes: hands, tools, experiment materials, progress bars, energy bars

### Color Constraints

```
Illustration base: #F7F8FA (background gray)
Primary: #3A7BFA
Secondary: #06B6D4, #22C55E
Prohibited: Large areas of high-saturation clashing colors
```

### Empty State Design

```
Illustration: Gentle geometric illustration (64x64 or 96x96)
Copy: "No content yet. Create your first one now!"
Action: Cyan button "Start Building"
```

---

## 🚀 Motion Design Specifications

### Basic Motion Parameters

```
duration: 150-200ms
easing: cubic-bezier(0, 0, 0.2, 1) /* ease-out */
hover: brightness(1.03), translateY(-1px)
active: translateY(1px)
```

### Progress/Completion Animation

```
Completion flash:
  - duration: 600ms
  - keyframes: scale(1) → scale(1.05) → scale(1)
  - opacity: 1 → 0.8 → 1

Sweep effect:
  - White semi-transparent bar sweeps left to right
  - duration: 400ms
```

### Loading Animation

```
Spinner: Linear rotation, #3A7BFA primary
Skeleton:
  - background: #F7F8FA
  - shimmer: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)
  - duration: 1500ms infinite
```

---

## 📝 Brand Details

### Tagline

**English**: Build by Doing.
**Chinese**: 做,就会发生。

**Usage Scenarios**:
- Landing Page Hero section below
- Footer
- Empty state pages

### Achievement/Badge Visual

```
Shape: Circle or hexagon
Color: #F59E0B (amber) + small metallic feel
Size: 48x48 (small) / 64x64 (medium) / 96x96 (large)
Shadow: y=4 blur=16 rgba(245, 158, 11, 0.3)
```

**Prohibited**: Large areas of gold background

---

## 🚫 Prohibited Items List

### Visual Level

❌ High-saturation gradients covering backgrounds
❌ Strong glassmorphism blur effects
❌ Neon borders
❌ Excessive noise textures
❌ Too many fonts (≤ 2 font families)
❌ Using 3+ accent colors simultaneously

### Motion Level

❌ Exaggerated celebration animations (>1s)
❌ Long flashing (>800ms)
❌ Frequent sound prompts (require user opt-in)

### Copywriting Level

❌ Slogans, empty without guiding action
❌ Passive voice
❌ Overly long complete sentences (>15 characters, split if possible)

---

## ✅ Implementation Checklist

### Phase 1: Color System Restructuring (Priority P0)

- [ ] Update color variables in `globals.css`
  - [ ] Primary: `#1A5CFF` → `#3A7BFA`
  - [ ] Add Success: `#10B981`
  - [ ] Add Warning: `#F59E0B`
  - [ ] Add Info: `#2563EB`
  - [ ] Add Secondary-Green: `#22C55E`
  - [ ] Update Secondary-Cyan: `#1BC5AE` → `#06B6D4`
  - [ ] Remove Navy
  - [ ] Update neutral color system

- [ ] Update dark mode colors
  - [ ] Base background: `#0B0F14`
  - [ ] Surface: `#111827`
  - [ ] Primary brightness increase 8-12%

### Phase 2: Typography System Updates (Priority P0)

- [ ] Switch font to Inter Variable
  - [ ] Update `layout.tsx` font import
  - [ ] Update `globals.css` font family

- [ ] Adjust font weights
  - [ ] Headings: Semibold (600) → Medium (500)

### Phase 3: Component Style Adjustments (Priority P1)

- [ ] Button component
  - [ ] Border radius: `rounded-md` → `rounded-2xl`
  - [ ] Update Primary color
  - [ ] Add Success variant
  - [ ] Update motion parameters (150-200ms ease-out)

- [ ] Card component
  - [ ] Border radius: `rounded-xl` → `rounded-2xl`
  - [ ] Update shadow hierarchy

- [ ] Badge component
  - [ ] Update color mapping
  - [ ] Border radius: `rounded-full`

- [ ] Input component
  - [ ] Border radius: `rounded-md` → `rounded-xl`
  - [ ] Update focus ring color

- [ ] Progress component
  - [ ] Progress color: Fresh Green `#22C55E`
  - [ ] Completion animation

### Phase 4: Copywriting Tone Updates (Priority P1)

- [ ] Landing Page
  - [ ] Hero CTA: "Start Learning Free" → "Try it Now"
  - [ ] Lab titles: Add verb prefixes

- [ ] Dashboard
  - [ ] Progress tips: "Completed" → "Progress +10%"
  - [ ] Success tips: "Lab Completed" → "Well Done!"

- [ ] Global copy review
  - [ ] Remove vague slogans
  - [ ] Shorten long sentences

### Phase 5: Accessibility Enhancement (Priority P1)

- [ ] Contrast check
  - [ ] All text ≥ 4.5:1
  - [ ] Icons ≥ 3:1

- [ ] Focus ring optimization
  - [ ] All interactive elements clear focus ring
  - [ ] Consider dual ring design

- [ ] Color information redundancy
  - [ ] Add icons to error states
  - [ ] Add text descriptions to success states

### Phase 6: Motion & Micro-interactions (Priority P2)

- [ ] Button hover/press animations
- [ ] Progress completion flash/sweep
- [ ] Card hover shadow transitions
- [ ] Page loading Skeleton

### Phase 7: Brand Details (Priority P2)

- [ ] Add brand tagline
  - [ ] Landing Page Hero
  - [ ] Footer

- [ ] Achievement badge design
  - [ ] Lab completion badges (amber)

---

## 📊 Implementation Timeline

| Phase | Content | Estimated Time | Priority |
|-------|---------|---------------|----------|
| **Phase 1** | Color System Restructuring | 2-3 hours | P0 |
| **Phase 2** | Typography System Updates | 1-2 hours | P0 |
| **Phase 3** | Component Style Adjustments | 4-5 hours | P1 |
| **Phase 4** | Copywriting Tone Updates | 2-3 hours | P1 |
| **Phase 5** | Accessibility Enhancement | 2-3 hours | P1 |
| **Phase 6** | Motion & Micro-interactions | 3-4 hours | P2 |
| **Phase 7** | Brand Details | 1-2 hours | P2 |

**Total**: Approximately 15-22 hours

---

## 🔍 Acceptance Criteria

### Visual Level

- [ ] All primary/secondary colors correctly applied
- [ ] Border radius unified to 16-20px (cards, buttons)
- [ ] Shadow hierarchy clear (shallow y=2, floating y=8)
- [ ] Dark mode fully adapted

### Interaction Level

- [ ] All buttons have hover feedback (brightness +3% + position)
- [ ] Focus rings clearly visible
- [ ] Motion duration 150-200ms
- [ ] Progress completion has celebration animation

### Content Level

- [ ] Copy uses verb-driven, short sentences
- [ ] Remove vague slogans
- [ ] Brand tagline embedded

### Accessibility Level

- [ ] WCAG AA contrast compliance
- [ ] Keyboard navigation smooth
- [ ] Color not sole information carrier

---

## 📚 Reference Resources

### Color Tools

- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Hex Converter](https://oklch.com/)

### Font Resources

- [Inter Variable Font](https://rsms.me/inter/)
- [Google Fonts: Inter](https://fonts.google.com/specimen/Inter)

### Icon Library

- [Lucide Icons](https://lucide.dev/) (currently in use)
- Style: Linear, rounded endpoints, 1.5-2px stroke

---

**Document Owner**: UX Expert (Sally)
**Last Updated**: 2025-10-13
**Review Status**: Pending Review
**Next Step**: Begin Phase 1 Implementation
