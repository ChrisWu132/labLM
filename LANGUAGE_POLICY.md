# Language Policy

## English Only

This project uses **English only** for all content, code, documentation, and communications.

### What This Means

- ✅ **All code** - Variable names, function names, comments, documentation
- ✅ **All content** - Lab materials, UI text, error messages, tooltips
- ✅ **All documentation** - README, architecture docs, PRDs, guides
- ✅ **All commits** - Commit messages, PR descriptions, issue titles
- ✅ **All communications** - Team discussions, user support, feedback

### Why English Only?

1. **Global accessibility** - English is the lingua franca of software development
2. **Open source readiness** - Makes the project accessible to international contributors
3. **Consistency** - Avoids mixing languages and confusion
4. **Best practices** - Follows industry standards for professional software projects
5. **SEO and discoverability** - Better search engine optimization for documentation

### Implementation Guidelines

#### Code
```typescript
// ✅ Good
function calculateUserScore(answers: Answer[]): number {
  return answers.reduce((sum, answer) => sum + answer.points, 0)
}

// ❌ Bad
function 计算用户分数(answers: Answer[]): number {
  return answers.reduce((总分, 答案) => 总分 + 答案.分数, 0)
}
```

#### UI Content
```tsx
// ✅ Good
<Button>Start Lab</Button>
<p>Welcome to the Learning Platform</p>

// ❌ Bad
<Button>开始实验</Button>
<p>欢迎来到学习平台</p>
```

#### Documentation
```markdown
✅ Good:
# Architecture Overview
This document describes the system architecture...

❌ Bad:
# 架构概览
本文档描述了系统架构...
```

#### Commit Messages
```bash
✅ Good:
git commit -m "Add user authentication flow"

❌ Bad:
git commit -m "添加用户认证流程"
```

### Exceptions

The only acceptable use of non-English content is:
- **Example data** for testing (e.g., testing multilingual input)
- **Localization files** (if implementing i18n in the future)
- **User-generated content** (if users can input their own language)

### Enforcement

- **Pre-commit hooks** - Consider adding linters to check for non-English characters
- **Code reviews** - Reviewers should flag non-English content
- **Documentation audits** - Periodic checks to ensure compliance
- **AI assistance** - Use tools like Claude Code to help translate existing content

### Migration from Chinese

This project was originally developed with Chinese content. As of **2025-10-16**, all core content has been migrated to English:

- ✅ Lab content files (lab1-5.mdx)
- ✅ UI components and pages
- ✅ README and documentation
- ✅ Code comments and variable names

### Questions?

If you're unsure whether something should be in English, the answer is: **Yes, use English.**

---

**Last Updated**: 2025-10-16
**Policy Status**: Active
