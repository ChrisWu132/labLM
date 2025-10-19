# FERPA Compliance Checklist

**Platform**: VibeCode Study
**Last Updated**: 2025-10-18
**Status**: In Progress

---

## What is FERPA?

The **Family Educational Rights and Privacy Act (FERPA)** is a US federal law that protects the privacy of student education records. It applies to all schools that receive federal funding.

**Key Point**: FERPA is NOT a certification you obtain. It's a law you comply with through your practices and agreements.

---

## FERPA Compliance Checklist for VibeCode Study

### 1. Data Classification

**What Data Qualifies as "Education Records" Under FERPA?**

For our platform:
- ✅ Student name + email
- ✅ Lab progress/completion data
- ✅ Exercise attempt history
- ✅ Time spent on platform
- ✅ LLM interaction logs (if we store them)
- ❌ De-identified/anonymized data (not covered by FERPA)

**Our Data Collection** (as of MVP):
```yaml
Student PII:
  - name: Required
  - email: Required
  - student_id: Optional (school-provided)
  - date_of_birth: NOT collected
  - address: NOT collected

Education Records:
  - lab_progress: Collected
  - exercise_attempts: Collected
  - timestamps: Collected
  - llm_conversations: NOT stored (privacy by design)
  - grades: NOT applicable (self-paced learning)
```

**Compliance Status**: ✅ We minimize data collection

---

### 2. Parent Rights

**FERPA requires parents to have certain rights over student records.**

#### Right 1: Inspect and Review
**Requirement**: Parents can request to see their child's education records

**Our Implementation**:
- [ ] **TODO**: Build data export feature (parent can request from teacher)
- [ ] **TODO**: Teacher can export individual student report
- ✅ Data is accessible to teachers (who share with parents)

**Process**:
1. Parent requests records from teacher
2. Teacher exports student report (PDF/CSV)
3. Teacher shares report with parent (within 45 days)

#### Right 2: Request Amendments
**Requirement**: Parents can request corrections to inaccurate records

**Our Implementation**:
- ✅ Teachers can manually delete incorrect submissions
- ✅ Students can retry exercises (self-correction)
- [ ] **TODO**: Document amendment request process

**Process**:
1. Parent/student identifies error
2. Contact teacher or support@vibecodestudy.com
3. We investigate and correct if warranted
4. Notify parent of outcome within 30 days

#### Right 3: Consent for Disclosure
**Requirement**: Schools must have parental consent to share education records with third parties (with exceptions)

**Our Implementation**:
- ✅ We are a "school official" (service provider exception)
- ✅ Schools sign Data Processing Agreement authorizing our access
- ✅ We don't share data with other third parties
- ✅ We don't sell student data

**Exceptions We Rely On**:
- School official exception (most common for edtech)
- No disclosure to other parties, so no consent needed

---

### 3. Data Processing Agreement (DPA)

**Requirement**: Schools need a written agreement with vendors handling student data

**Our DPA Must Include**:
- ✅ Purpose of data access (provide educational services)
- ✅ Types of data collected
- ✅ How data will be used (only for service provision)
- ✅ Security measures in place
- ✅ No selling or sharing of student data
- ✅ Data retention and deletion policy
- ✅ Data breach notification procedures
- ✅ Subprocessors (Supabase, OpenAI)

**Status**:
- [ ] **TODO**: Create DPA template (see dpa-template-guidance.md)
- [ ] **TODO**: Have DPA reviewed by legal (budget: $500-1000)
- [ ] **TODO**: Make DPA available for schools to sign

---

### 4. Security Safeguards

**Requirement**: Protect student data with appropriate administrative, technical, and physical safeguards

#### Administrative Safeguards
- ✅ Data access limited to authorized personnel only
- ✅ Employee/contractor confidentiality agreements
- [ ] **TODO**: Security awareness training for team
- [ ] **TODO**: Incident response plan documented

#### Technical Safeguards
- ✅ Encryption at rest (Supabase AES-256)
- ✅ Encryption in transit (TLS 1.2+)
- ✅ Row-Level Security (RLS) policies
- ✅ Secure authentication (bcrypt/JWT)
- ✅ Regular security updates
- [ ] **TODO**: Enable MFA for admin accounts
- [ ] **TODO**: Audit logging for data access

#### Physical Safeguards
- ✅ Cloud-hosted (AWS physical security)
- ✅ No local storage of student data
- N/A: No physical servers to secure

**Compliance Status**: ✅ Strong technical safeguards in place

---

### 5. Data Retention & Deletion

**Requirement**: Don't keep student data longer than necessary

**Our Policy**:
```yaml
Active Accounts:
  retention: Indefinite (while student is using platform)

Inactive Accounts:
  definition: No login for 90 days
  action: Send email reminder to student/teacher
  retention: Keep data for 1 year after last activity

Deleted Accounts:
  student_request: Immediate anonymization
  teacher_request: Immediate deletion of class enrollment
  hard_delete: After 30-day grace period
  backups: Removed from backups after 90 days

Graduated/Withdrawn Students:
  teacher_removes: Immediate class disenrollment
  data_retention: 1 year for records, then anonymize
  parent_request: Immediate deletion upon request
```

**Implementation**:
- [ ] **TODO**: Build account deletion flow (student/teacher initiated)
- [ ] **TODO**: Build data export before deletion (required)
- [ ] **TODO**: Scheduled job to anonymize old data
- [ ] **TODO**: Document retention policy in Privacy Policy

**Compliance Status**: ⚠️ In Progress (MVP will implement deletion flow)

---

### 6. No Selling or Sharing Data

**Requirement**: Cannot sell student data or use for targeted advertising

**Our Commitment**:
- ✅ We DO NOT sell student data - ever
- ✅ We DO NOT use student data for advertising
- ✅ We DO NOT share data with third parties (except subprocessors)
- ✅ LLM interactions are transient (not stored for training)

**Subprocessors** (vendors who process student data):
1. **Supabase**: Database and authentication
   - Purpose: Data storage
   - Data: All student data
   - DPA: Available from Supabase

2. **OpenAI** (or other LLM provider):
   - Purpose: LLM API for educational exercises
   - Data: Prompts submitted by students (transient)
   - DPA: Required (OpenAI offers DPA for API customers)
   - **Critical**: Ensure API calls opt-out of training data usage

3. **Resend** (or email service):
   - Purpose: Transactional emails (invitations, password resets)
   - Data: Email addresses, names
   - DPA: Check if available

**Action Items**:
- [ ] **TODO**: Review OpenAI terms to ensure student data not used for training
- [ ] **TODO**: Sign DPAs with all subprocessors
- [ ] **TODO**: List subprocessors in our Privacy Policy and DPA

**Compliance Status**: ✅ Policy in place, ⚠️ Need to formalize DPAs

---

### 7. Data Breach Notification

**Requirement**: Notify schools/parents promptly in case of data breach

**Our Incident Response Plan**:

**Definition of Breach**:
- Unauthorized access to student PII
- Accidental exposure of student data
- Loss of student data (e.g., backup failure)

**Response Process**:
1. **Discover** breach (internal detection or external report)
2. **Contain** breach (disable access, revoke keys, etc.)
3. **Assess** impact (what data? how many students? how severe?)
4. **Notify** affected parties:
   - Schools: Within 72 hours
   - Parents: Via school, within 72 hours
   - Authorities: If required by state law
5. **Remediate** vulnerability
6. **Document** incident and response
7. **Review** and improve security measures

**Notification Contact**:
- Email: security@vibecodestudy.com
- Phone: [TODO: Set up security hotline]

**Status**:
- [ ] **TODO**: Document full incident response plan
- [ ] **TODO**: Set up security contact email
- [ ] **TODO**: Create breach notification email templates
- [ ] **TODO**: Train team on breach response

**Compliance Status**: ⚠️ Process defined, needs formalization

---

### 8. Transparency & Notice

**Requirement**: Inform schools/parents about data practices

**Our Implementation**:

#### Privacy Policy
- [ ] **TODO**: Create comprehensive Privacy Policy
- [ ] **TODO**: Include section specifically for schools/parents
- [ ] **TODO**: Explain data collection, use, retention, deletion
- [ ] **TODO**: List subprocessors
- [ ] **TODO**: Link to Privacy Policy from signup page

#### Terms of Service
- [ ] **TODO**: Create Terms of Service for schools
- [ ] **TODO**: Specify FERPA compliance commitment
- [ ] **TODO**: Reference DPA

#### Public Security Documentation
- [ ] **TODO**: Create public-facing security practices page (see security-practices-public.md)
- [ ] **TODO**: Make security page easily discoverable

**Compliance Status**: ⚠️ In Progress (MVP will include Privacy Policy)

---

## FERPA Compliance Summary

### ✅ What We're Doing Right

1. **Minimal Data Collection**: Only collect necessary data
2. **Strong Security**: Encryption, RLS, secure auth
3. **No Selling Data**: Clear policy against selling/sharing
4. **Subprocessor Transparency**: Disclose Supabase, OpenAI, email service
5. **Purpose Limitation**: Data only used for educational services

### ⚠️ What We Need to Complete (MVP)

1. **Data Processing Agreement**: Template created and available
2. **Privacy Policy**: Comprehensive policy published
3. **Data Export**: Feature for parents to request data
4. **Account Deletion**: Feature to delete student accounts
5. **Incident Response Plan**: Formalized and documented
6. **Subprocessor DPAs**: Signed with all vendors

### 🔄 Post-MVP Enhancements

1. **Automated Data Retention**: Scheduled jobs for data anonymization
2. **Audit Logging**: Enhanced logging for all data access
3. **Parent Portal**: Direct parent access (instead of via teacher)
4. **Compliance Audits**: Annual third-party security review

---

## How to Demonstrate FERPA Compliance to Schools

### During Sales Conversations

**School asks**: "Are you FERPA compliant?"

**Answer**:
> "Yes, we follow FERPA-compliant data handling practices. We sign a Data Processing Agreement with all schools that outlines our data protection commitments, including encryption, access controls, and no selling of student data. Our platform is hosted on FERPA-eligible infrastructure (AWS/Supabase), and we only collect the minimum data necessary to provide our educational services."

**Follow up with**:
- Share our public security practices page
- Provide DPA for review
- Offer to complete their security questionnaire
- Reference Supabase's security documentation

### Common School Questions & Answers

**Q: What student data do you collect?**
> "We collect only what's necessary: student name, email, and learning progress (labs completed, time spent). We do NOT collect date of birth, address, or other sensitive personal information. LLM interactions are transient and not stored long-term."

**Q: Who has access to our student data?**
> "Only your teachers (for your students), our core engineering team (for platform maintenance), and our infrastructure providers (Supabase for hosting, OpenAI for LLM API). We maintain strict access controls and all team members sign confidentiality agreements."

**Q: How long do you keep student data?**
> "We keep data while the student is actively using the platform. For inactive accounts, we retain data for up to 1 year, then anonymize. Schools or parents can request immediate deletion at any time, and we'll provide an export of the data first."

**Q: What happens if there's a data breach?**
> "We have an incident response plan that includes immediate containment, assessment, and notification within 72 hours. We'll notify the school immediately and work with you to inform affected parents. Our security measures (encryption, access controls) are designed to prevent breaches in the first place."

**Q: Do you sell student data or use it for advertising?**
> "Absolutely not. We do not sell student data, ever. We do not use student data for advertising or any purpose other than providing educational services. This is explicitly stated in our Privacy Policy and Data Processing Agreement."

---

## Resources

### Official FERPA Guidance
- US Dept of Education FERPA page: https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html
- FERPA for Vendors: https://studentprivacy.ed.gov/resources/ferpa-and-vendors

### Tools & Templates
- FERPA Sherpa (community): https://ferpasherpa.org/
- Student Privacy Pledge: https://studentprivacypledge.org/
- CoSN Trusted Learning Environment: https://www.cosn.org/

### State-Specific Laws
Note: Some states have additional student privacy laws beyond FERPA:
- California: SOPIPA, AB 1584
- New York: Education Law 2-d
- Check state-specific requirements for your target markets

---

## Next Steps

### Immediate (Before First School Sale)
1. [ ] Create DPA template
2. [ ] Create Privacy Policy
3. [ ] Create public security practices page
4. [ ] Review OpenAI terms (ensure no training on student data)

### Short-Term (First 3 Months)
1. [ ] Build data export feature
2. [ ] Build account deletion flow
3. [ ] Document incident response plan
4. [ ] Sign DPAs with subprocessors

### Medium-Term (6-12 Months)
1. [ ] Annual security audit
2. [ ] Consider Student Privacy Pledge
3. [ ] Evaluate state-specific laws (if expanding)
4. [ ] Parent portal (direct access)

---

**Compliance Owner**: [TODO: Assign team member]
**Review Frequency**: Quarterly
**Last Review**: 2025-10-18
**Next Review**: 2026-01-18
