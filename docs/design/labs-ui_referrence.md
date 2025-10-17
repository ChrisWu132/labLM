VibeCoding Labs UI Design Guide

Version: 1.0
Last Updated: 2025-10-16
Guiding Principle: A clean, professional, and encouraging learning environment that is modern and approachable for young learners. The design prioritizes clarity, readability, and focused interaction.

1. Design Philosophy

The UI is built on a minimalist and clean aesthetic. It uses a primarily monochrome color scheme with a single, vibrant accent color to guide attention and indicate interactivity. Generous whitespace, soft shadows, and rounded corners create a friendly and uncluttered "soft tech" feel, making complex topics feel accessible.

2. Color Palette

The color system is simple and strict to maintain a consistent and professional look.

Role

Color Name

Hex

Tailwind Class

Usage

Accent/Primary

Electric Blue

#3A7BFA

bg-electric-blue

Buttons, links, focus rings, key element borders

Background

Main Background

#F8F9FE

bg-bg-main

Overall page background for a soft, off-white feel

Surface

Surface White

#FFFFFF

bg-surface

Card backgrounds, inputs, and primary content areas

Text

Primary Text

#1A202C

text-slate-800

Headings, strong text, and key content

Text

Secondary Text

#4A5568

text-slate-600

Body paragraphs, descriptions, and less emphasized text

Borders

Standard Border

#E2E8F0

border-slate-200

Default borders for cards, tables, and dividers

Surface

Muted Background

#F8FAFC

bg-slate-50

Background for content sections and table headers

3. Typography

The typography system uses two distinct font families to create a clear hierarchy between headings and body text.

Font Families

Display (Headings): Nunito (Bold, ExtraBold) - A rounded, friendly sans-serif used for all <h1> to <h6> tags to give the page a welcoming feel.

Body (Sans-serif): Inter (Regular, Medium, SemiBold) - A highly readable sans-serif for all paragraphs, lists, and other body content.

Hierarchy

Element

Font Family

Weight

Size (Example)

Color

Page Title <h1>

Nunito

ExtraBold

3rem / 3.75rem

Primary Text

Section <h2>

Nunito

Bold

1.875rem

Primary Text

Subsection <h3>

Nunito

Bold

1.5rem

Primary Text

Paragraph <p>

Inter

Regular

1rem

Secondary Text

Strong <strong>

Inter

SemiBold

1rem

Primary Text

Link <a>

Inter

Medium

1rem

Electric Blue

4. Component Library

This section details the standard components used to build a lab page.

4.1 Cards

Cards are the primary method for structuring content. There are two main variants.

A. Key Information Card

Used for high-importance sections like "Learning Objectives" and "Key Discoveries".

Background: bg-surface (#FFFFFF)

Border Radius: rounded-3xl (1.5rem)

Border: border-2 border-slate-100 with a border-t-4 border-t-electric-blue top accent.

Shadow: shadow-soft-lg

Padding: p-8

B. Content Section Card

Used to group related content blocks, such as interactive experiments and exercises.

Background: bg-slate-50/70 (A slightly muted surface)

Border Radius: rounded-3xl (1.5rem)

Border: border-2 border-slate-200/80

Padding: p-8

4.2 Interactive Editor

The component for user input and interaction with the AI.

Container: A div with bg-white, rounded-2xl, border-2 border-slate-300/50, and shadow-soft-lg.

Focus State: On focus-within, the border color changes to border-electric-blue.

Text Area: No border, no resize handle, transparent background.

Button: See Button component below.

4.3 Buttons

The primary call-to-action element.

Style: Solid background, fully rounded.

Background Color: bg-electric-blue

Text Color: text-white

Font: Bold Inter.

Padding: py-3 px-6 for a comfortable click target.

Border Radius: rounded-full

Interaction:

Hover: hover:scale-105 hover:-translate-y-0.5

Active: active:scale-95

4.4 Tables

Used for structured data comparison.

Container: rounded-2xl with overflow-hidden.

Header <thead>: bg-slate-50. Text is font-semibold.

Rows <tr>: Separated by a border-t border-slate-200.

4.5 Feedback Banners

Used to provide confirmation after a user action.

Style: A banner appearing above the AI response.

Background: bg-blue-100/70

Border: border border-blue-200

Text Color: text-blue-800

Font: font-semibold

5. Interactivity & Feedback

Focus Indication: All interactive elements (especially the text editor) must have a clear focus state, indicated by the electric-blue border.

Positive Reinforcement: Upon successful completion of an exercise, a confetti animation is triggered. This provides a moment of delight and encourages progress. The confetti colors should be based on the brand palette: ['#3A7BFA', '#93C5FD', '#60A5FA', '#E5E7EB'].

Loading State: When waiting for an AI response, a loading spinner (SVG animation) should be displayed within the response container to provide clear feedback that the system is working.