# Emoji Policy: NO EMOJIS ALLOWED

**Status:** Active
**Effective Date:** 2025-01-20
**Applies To:** All content, code, UI, and documentation

---

## Policy Statement

**Emojis are NOT allowed anywhere in the LLM Learning Lab platform.**

This includes:
- Lab content (learn tabs, try-it tabs, quizzes)
- UI components and buttons
- Tab labels and navigation
- Documentation
- Code comments
- Error messages
- Success messages
- Git commit messages
- README files

## Rationale

### 1. Accessibility Issues

Emojis create accessibility barriers:

- **Screen readers**: Emojis are read aloud literally (e.g., "book emoji" instead of "Learn"), disrupting flow
- **Color blindness**: Some emoji colors convey meaning that color-blind users cannot perceive
- **Visual processing**: Students with visual processing disorders may find emojis distracting
- **Assistive technology**: Not all assistive technologies render emojis correctly

### 2. Professionalism

- Emojis appear informal and unprofessional in educational content
- Academic institutions expect professional presentation standards
- Parents and teachers view emoji-heavy content as less serious

### 3. Cultural & Linguistic Issues

- Emoji meanings vary across cultures
- Some emojis have offensive meanings in certain cultures
- Non-native English speakers may misinterpret emoji intent
- Translation systems struggle with emoji context

### 4. Technical Issues

- Encoding problems across different systems (UTF-8, UTF-16)
- Font rendering inconsistencies (different emoji sets: Apple, Google, Microsoft)
- Database storage issues (additional bytes, collation problems)
- Search and indexing challenges
- Copy-paste issues across platforms

### 5. Maintainability

- Hard to search codebase for emoji-related bugs
- Difficult to enforce consistency across team members
- Code review becomes harder with emoji mixed in
- Version control diffs are harder to read

### 6. Age Appropriateness

- Middle school students (grades 6-8) are learning professional communication
- Platform should model professional standards
- Excessive emoji use trains poor writing habits

---

## Allowed Alternatives

Instead of emojis, use:

### Text Labels

✅ **Good:**
```tsx
<button>Learn</button>
<button>Try It</button>
<button>Quiz</button>
```

❌ **Bad:**
```tsx
<button>📖 Learn</button>
<button>🎯 Try It</button>
<button>✅ Quiz</button>
```

### Icons from Icon Libraries

Use Lucide React or other icon libraries:

✅ **Good:**
```tsx
import { BookOpen, Target, CheckCircle } from 'lucide-react'

<Button>
  <BookOpen className="w-4 h-4 mr-2" />
  Learn
</Button>
```

### Semantic HTML + CSS

✅ **Good:**
```tsx
<div className="success-message">
  <div className="status-icon success" />
  Great job! Exercise completed.
</div>
```

```css
.status-icon.success {
  background: green;
  border-radius: 50%;
  width: 16px;
  height: 16px;
}
```

### Text-based Status Indicators

✅ **Good:**
```
Status: Completed
Status: In Progress
Status: Locked
```

❌ **Bad:**
```
Status: ✅ Completed
Status: 🔄 In Progress
Status: 🔒 Locked
```

---

## Exceptions

**There are NO exceptions to this rule.**

Even these cases are NOT allowed:
- User-generated content (must be sanitized)
- Error messages
- Celebration messages
- Marketing content
- Social media posts about the platform

---

## Enforcement

### Automated Checks

1. **Pre-commit Hook** (coming soon)
   - Scans staged files for emojis
   - Blocks commit if emojis detected

2. **CI/CD Pipeline**
   - Runs `scripts/remove-emojis.js --check` to detect emojis
   - Fails build if emojis found

3. **Script Usage**
   ```bash
   # Check for emojis (doesn't modify files)
   node scripts/remove-emojis.js --check

   # Remove emojis from all content files
   node scripts/remove-emojis.js
   ```

### Code Review Checklist

- [ ] No emojis in changed files
- [ ] No emojis in commit messages
- [ ] No emojis in PR description
- [ ] Icon components used instead of emojis where applicable

### Violation Handling

**First Offense:**
- PR blocked until emojis removed
- Developer notified of policy

**Second Offense:**
- PR blocked + required training on accessibility

**Repeated Offenses:**
- Escalated to team lead
- Additional training required

---

## Migration from Emoji-Heavy Code

If you inherit code with emojis:

1. Run the removal script:
   ```bash
   node scripts/remove-emojis.js
   ```

2. Review changes to ensure nothing broke:
   ```bash
   npm run build
   npm run test
   ```

3. Replace emoji functionality with alternatives:
   - Emojis in UI → Icon components
   - Emojis in status → Text labels
   - Emojis in messages → Plain text

4. Update documentation to remove emoji references

---

## Resources

### Icon Libraries (Approved)

- **Lucide React** (primary) - https://lucide.dev/
- **Heroicons** (secondary) - https://heroicons.com/
- **Radix Icons** (UI primitives) - https://www.radix-ui.com/icons

### Accessibility Guidelines

- WCAG 2.1 Level AA compliance
- Screen reader compatibility testing
- Color contrast requirements (4.5:1 minimum)

### Further Reading

- [Why We Don't Use Emojis in Professional Software](https://www.nngroup.com/articles/emoji-professional-communication/)
- [Accessibility Issues with Emojis](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
- [Emoji Encoding Problems](https://unicode.org/reports/tr51/)

---

## Examples

### Bad: Emoji-Heavy Content

```tsx
export default function Learn() {
  return (
    <div>
      <h2>🎯 Learning Objectives</h2>
      <p>📖 In this section, you'll learn:</p>
      <ul>
        <li>✨ Core concepts</li>
        <li>💡 Best practices</li>
        <li>🚀 Advanced techniques</li>
      </ul>
      <div className="success">🎉 Great job!</div>
    </div>
  )
}
```

### Good: Emoji-Free Content

```tsx
import { Target, BookOpen, Sparkles, Lightbulb, Rocket } from 'lucide-react'

export default function Learn() {
  return (
    <div>
      <h2 className="flex items-center gap-2">
        <Target className="w-5 h-5" />
        Learning Objectives
      </h2>
      <p className="flex items-center gap-2">
        <BookOpen className="w-4 h-4" />
        In this section, you'll learn:
      </p>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Core concepts
        </li>
        <li className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-600" />
          Best practices
        </li>
        <li className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-purple-600" />
          Advanced techniques
        </li>
      </ul>
      <div className="success-message">
        <div className="success-icon" />
        Great job!
      </div>
    </div>
  )
}
```

---

## Changelog

- **2025-01-20**: Policy created and enforced across platform
- **2025-01-20**: All 75 lab content files cleaned of emojis
- **2025-01-20**: Scripts created for automated enforcement

---

## Approval

**Approved By:** Product & UX Team
**Review Date:** 2025-01-20
**Next Review:** 2025-07-20 (6 months)
