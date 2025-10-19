# VibeCode Study - Security & Privacy Practices

**Last Updated**: October 18, 2025

---

## Our Commitment to Student Data Safety

At VibeCode Study, protecting student privacy and data security is our top priority. This document outlines the specific measures we take to keep student data safe.

**Key Principles**:
- 🔒 **Security First**: Enterprise-grade infrastructure and encryption
- 🚫 **Never Sell Data**: We will never sell student data or use it for advertising
- 📜 **Transparency**: Clear documentation of our practices
- 🎓 **Education-Focused**: Data only used to provide educational services
- 🤝 **Partnership**: We work with schools to ensure compliance and safety

---

## What Data We Collect (And Why)

### Student Data Collected

We practice **data minimization** - we only collect what's necessary to provide our service.

| Data Type | What We Collect | Why We Need It | What We DON'T Collect |
|-----------|-----------------|----------------|----------------------|
| **Identity** | Name, Email | Account creation, login | ❌ Date of birth, address, phone number |
| **Progress** | Labs completed, time spent | Track learning progress | ❌ Grades, test scores (not applicable) |
| **Activity** | Exercise attempts, completion | Help teachers identify struggling students | ❌ LLM conversation logs (not stored) |
| **Usage** | Login timestamps | Monitor engagement | ❌ Browsing history, device info |

### What We DON'T Collect

- ❌ Social Security Numbers
- ❌ Home addresses
- ❌ Phone numbers
- ❌ Financial information
- ❌ Biometric data
- ❌ Location/geolocation data
- ❌ Behavioral profiles for advertising

---

## How We Protect Student Data

### 1. Infrastructure Security

**Hosting**:
- ✅ Hosted on **AWS** (Amazon Web Services) - enterprise-grade infrastructure
- ✅ Inherits AWS compliance certifications:
  - SOC 2 Type II
  - ISO 27001
  - HIPAA eligible
- ✅ DDoS protection and redundancy built-in

**Database Security**:
- ✅ Powered by **Supabase** (open-source, PostgreSQL-based)
- ✅ Industry-leading security practices
- ✅ Regular security audits and updates

---

### 2. Data Encryption

**At Rest** (when stored):
- ✅ All databases encrypted with **AES-256** encryption
- ✅ Backup encryption enabled
- ✅ Encryption keys managed securely

**In Transit** (when transmitted):
- ✅ All connections use **TLS 1.2+** (HTTPS)
- ✅ No unencrypted data transmission
- ✅ Secure API connections

**What This Means**: Even if someone intercepts our data, they cannot read it without the encryption keys.

---

### 3. Access Control

**Row-Level Security (RLS)**:
- ✅ Database-level access control (not just application)
- ✅ Students can only see their own data
- ✅ Teachers can only see their own classes
- ✅ Prevents unauthorized data access even if application is compromised

**Authentication**:
- ✅ Secure password hashing (bcrypt)
- ✅ Industry-standard JWT tokens
- ✅ Optional multi-factor authentication (MFA)
- ✅ Password reset with email verification

**Team Access**:
- ✅ Limited to core engineering team only
- ✅ All team members sign confidentiality agreements
- ✅ Two-factor authentication required for admin access
- ✅ Access logs maintained for auditing

---

### 4. Backups & Recovery

**Backup Strategy**:
- ✅ Automated daily backups
- ✅ Backups encrypted
- ✅ 30-day backup retention
- ✅ Regular restore testing

**Disaster Recovery**:
- ✅ Point-in-time recovery available
- ✅ Geographic redundancy
- ✅ RTO (Recovery Time Objective): < 4 hours
- ✅ RPO (Recovery Point Objective): < 24 hours

---

### 5. Application Security

**Input Validation**:
- ✅ All user inputs validated and sanitized
- ✅ Protection against SQL injection
- ✅ Protection against XSS (Cross-Site Scripting)
- ✅ Prepared statements for database queries

**API Security**:
- ✅ Rate limiting to prevent abuse
- ✅ API key permissions restricted
- ✅ CORS (Cross-Origin) policies configured
- ✅ Error messages don't leak sensitive info

**LLM Integration Security**:
- ✅ Content moderation on all LLM outputs
- ✅ Student prompts are transient (not stored long-term)
- ✅ No student data used for LLM model training
- ✅ Separate API keys for dev/production

---

## Privacy Practices

### 1. Data Usage

**What We DO with student data**:
- ✅ Provide personalized learning experience
- ✅ Track progress for students and teachers
- ✅ Improve platform functionality and performance
- ✅ Provide customer support

**What We DON'T DO with student data**:
- ❌ Sell data to third parties
- ❌ Use for targeted advertising
- ❌ Share with other companies (except service providers)
- ❌ Use for purposes unrelated to education
- ❌ Build profiles for marketing

---

### 2. Third-Party Services

We use a limited number of trusted service providers:

| Service | Purpose | Data Shared | Privacy Protection |
|---------|---------|-------------|-------------------|
| **Supabase** | Database & Auth | All student data | DPA signed, FERPA-eligible |
| **OpenAI** | LLM API | Student prompts (transient) | Not used for training, DPA available |
| **Resend** | Email delivery | Email addresses | DPA signed, transactional only |

**Our Requirements for Service Providers**:
- ✅ Sign Data Processing Agreements
- ✅ Comply with FERPA and applicable laws
- ✅ Maintain strong security practices
- ✅ Don't use student data for their own purposes

---

### 3. Data Retention & Deletion

**How Long We Keep Data**:

| Data Type | Retention Period | Deletion Policy |
|-----------|------------------|-----------------|
| Active accounts | Indefinitely | While student is using platform |
| Inactive accounts | 1 year after last login | Then anonymized |
| Deleted accounts | 30-day grace period | Then permanently deleted |
| Backups | 30 days | Deleted from backups after retention period |

**Student/Parent Rights**:
- ✅ Request to view data (via teacher)
- ✅ Request corrections to inaccurate data
- ✅ Request deletion of account and data
- ✅ Receive data export before deletion

**How to Request Deletion**:
1. Contact your teacher or school administrator
2. Or email us at: privacy@vibecodestudy.com
3. We'll process within 30 days
4. You'll receive confirmation when complete

---

## FERPA Compliance

We follow **FERPA (Family Educational Rights and Privacy Act)** compliant data handling practices:

✅ **Parental Rights**: Parents can request access to their child's records
✅ **Consent**: We operate under "school official" exception with signed DPA
✅ **Security**: Appropriate safeguards to protect data
✅ **No Unauthorized Disclosure**: Data not shared without consent
✅ **Data Processing Agreement**: Signed with all schools
✅ **Audit Rights**: Schools can audit our practices

**Our FERPA Commitment**:
> "We treat student data as education records under FERPA and apply the same protections schools are required to maintain. We sign a Data Processing Agreement with every school outlining our specific commitments."

---

## Security Monitoring & Incident Response

### Continuous Monitoring

- ✅ **Uptime monitoring**: 24/7 automated monitoring
- ✅ **Performance alerts**: Unusual activity detection
- ✅ **Error tracking**: All errors logged and reviewed
- ✅ **Security alerts**: Intrusion attempts flagged

### Incident Response Plan

If a security incident occurs:

1. **Detection**: Automated alerts + manual monitoring
2. **Containment**: Immediately stop the breach
3. **Assessment**: Determine scope and impact
4. **Notification**: Inform affected schools within **72 hours**
5. **Remediation**: Fix vulnerability
6. **Documentation**: Full incident report
7. **Review**: Improve security measures

**Security Contact**: security@vibecodestudy.com

---

## Operational Security

### Development Practices

- ✅ **Code reviews**: All code reviewed before deployment
- ✅ **Dependency scanning**: Regular security updates
- ✅ **Separate environments**: Dev/Staging/Production isolated
- ✅ **No production data in dev**: Test with synthetic data only

### Team Security

- ✅ **Background checks**: For team members with data access
- ✅ **Confidentiality agreements**: All team members sign NDAs
- ✅ **Security training**: Regular team training on data protection
- ✅ **Least privilege**: Access limited to what's necessary

### Compliance & Auditing

- ✅ **Audit logs**: Track access to sensitive data
- ✅ **Regular reviews**: Quarterly security reviews
- ✅ **Third-party audits**: Annual security assessments (planned)
- ✅ **Penetration testing**: Regular security testing (planned)

---

## Transparency & Communication

### Public Documentation

- ✅ This security practices page (public)
- ✅ Privacy Policy (published on website)
- ✅ Data Processing Agreement (available on request)
- ✅ Terms of Service (published on website)

### School Communication

- ✅ Available for security questionnaires
- ✅ Open to compliance audits
- ✅ Regular security updates
- ✅ Dedicated support for security questions

**Contact Us**:
- General: support@vibecodestudy.com
- Security: security@vibecodestudy.com
- Privacy: privacy@vibecodestudy.com

---

## Continuous Improvement

We are committed to continuously improving our security practices:

**Recent Improvements**:
- ✅ Enabled Row-Level Security on all tables (Oct 2025)
- ✅ Implemented rate limiting on API endpoints (Oct 2025)
- ✅ Added audit logging for admin actions (Oct 2025)

**Planned Enhancements**:
- 🔄 Third-party penetration test (Q1 2026)
- 🔄 SOC 2 Type I certification (Q2 2026, if scaling)
- 🔄 Enhanced audit logging (Q1 2026)
- 🔄 Parent portal for direct data access (Q2 2026)

---

## Certifications & Compliance Roadmap

**Current Status** (Early Stage Startup):

While we don't yet hold formal certifications (expensive for early-stage startups), we:
- ✅ Follow industry best practices
- ✅ Use certified infrastructure (AWS, Supabase)
- ✅ Implement equivalent security controls
- ✅ Maintain FERPA-compliant practices

**Planned Certifications** (as we scale):
- SOC 2 Type I: Planned at 10,000+ students (~Q2 2026)
- SOC 2 Type II: Planned at 50,000+ students (~2027)
- Student Privacy Pledge: Under consideration

---

## Frequently Asked Questions

### For Schools

**Q: How do you handle student data differently from other companies?**

A: We're an educational service, not a social media or advertising platform. Student data is used ONLY to provide educational services - never for advertising, profiling, or selling to third parties. We're subject to FERPA and treat student data accordingly.

---

**Q: What happens to student data if your company shuts down?**

A: In the unlikely event of business closure, we will:
1. Notify all schools 90 days in advance
2. Provide full data export in standard formats
3. Allow schools to migrate to another platform
4. Securely delete all data after migration period
5. This commitment is in our Data Processing Agreement

---

**Q: Can we audit your security practices?**

A: Yes. We welcome school audits and security questionnaires. We can provide:
- Access to this public documentation
- Responses to security questionnaires
- Infrastructure security documentation (Supabase, AWS)
- Our Data Processing Agreement
- Virtual meetings to discuss security practices

---

**Q: How do you ensure your staff doesn't misuse student data?**

A: Multiple safeguards:
- All staff sign confidentiality agreements
- Access limited to core engineering team only
- All access is logged for auditing
- Row-Level Security prevents broad data access
- Regular security training
- Clear data usage policies

---

### For Parents

**Q: What information can I see about my child?**

A: Through your child's teacher, you can request:
- Labs completed and in progress
- Time spent on platform
- Exercise completion rates
- Overall progress reports

Teachers can export this data and share with you.

---

**Q: How do I delete my child's account?**

A: Contact your child's teacher or email privacy@vibecodestudy.com. We'll:
1. Confirm your identity
2. Provide data export (if requested)
3. Delete account within 30 days
4. Send confirmation

---

**Q: Is my child's information sold to advertisers?**

A: **Absolutely not.** We do not sell student data. We do not use student data for advertising. We do not share student data with advertisers. This is a core principle of our platform.

---

**Q: What if there's a data breach?**

A: We'll notify your school immediately (within 72 hours), and the school will notify affected parents. We have security measures in place to prevent breaches, and an incident response plan if one occurs.

---

## Contact Us

**Questions about security or privacy?**

- 📧 Security: security@vibecodestudy.com
- 📧 Privacy: privacy@vibecodestudy.com
- 📧 General: support@vibecodestudy.com

**Report a security vulnerability?**

- Email: security@vibecodestudy.com
- We appreciate responsible disclosure and will respond promptly

---

## Document Updates

This document is reviewed and updated quarterly.

**Version History**:
- v1.0 (Oct 2025): Initial publication

**Next Review**: January 2026

---

*This page is designed to be shared publicly with schools, parents, and anyone evaluating VibeCode Study for student data safety.*
