# Claude Code Guidelines for This Project

## Language Policy

**IMPORTANT: This project uses ENGLISH ONLY.**

When working on this codebase:

1. ✅ **All code must be in English**
   - Variable names
   - Function names
   - Comments
   - Documentation strings

2. ✅ **All content must be in English**
   - UI text
   - Lab materials
   - Error messages
   - User-facing strings

3. ✅ **All documentation must be in English**
   - README files
   - Architecture docs
   - PRD documents
   - Code comments

4. ✅ **All commits must be in English**
   - Commit messages
   - Branch names
   - PR descriptions

### When Adding New Content

- Write everything in English from the start
- Do not use Chinese or any other language
- If you see non-English content, flag it for translation

### When Modifying Existing Content

- If you encounter Chinese or non-English text, translate it to English
- Maintain the same meaning and tone
- Update any references to match the new English content

### Examples

#### Code
```typescript
// ✅ Correct
const userAuthenticated = checkUserStatus()

// ❌ Incorrect
const 用户已认证 = checkUserStatus()
```

#### UI Components
```tsx
// ✅ Correct
<h1>Welcome to Prompt Engineering Lab</h1>

// ❌ Incorrect
<h1>欢迎来到 Prompt Engineering 实验室</h1>
```

## Project-Specific Guidelines

### Architecture
- Next.js 15 App Router
- TypeScript strict mode
- Server Actions for backend logic
- Supabase for database and auth

### Code Style
- Use TypeScript for all new code
- Follow existing component structure
- Use Tailwind CSS for styling
- Keep components small and focused

### Testing
- Add tests for critical functionality
- Test server actions thoroughly
- Verify UI components render correctly

### Documentation
- Keep README.md up to date
- Document complex logic with comments
- Update architecture docs when making structural changes

---

**Remember**: English only, always!
