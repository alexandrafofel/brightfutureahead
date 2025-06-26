# GDPR / COPPA – Parental Consent Template

**Document Title:** GDPR-COPPA_Parental_Consent_Template.md  
**Project:** HeartNest  
**Purpose:** Legal template for verifying compliance of parental consent flow in onboarding (children aged 0–6).  
**Maintainer:** privacy@heartnest.app  
**Last updated:** 2025-06-26

---

## 1. Legal Basis

### 🛡️ GDPR (EU Regulation 2016/679)
- **Art. 6(1)(a)** – Lawful basis: consent  
- **Art. 7** – Conditions for valid consent  
- **Art. 8** – Protection of children's data (under 16)

### 🇺🇸 COPPA (Children’s Online Privacy Protection Act)
- **§312.5** – Verifiable parental consent required  
- **§312.6** – Parents’ rights: review, delete, revoke consent

---

## 2. Consent Requirements Checklist

| Requirement                                       | Status | Notes |
|--------------------------------------------------|--------|-------|
| Data minimisation (only age & routine)           | ✅     | No names, photos, location or tracking |
| Clear, specific purpose                          | ✅     | Personalised content via AI |
| Behavioural/commercial profiling explicitly denied | ✅     | “We create no commercial or behavioural profiles.” |
| Rights to access / erase                         | ✅     | “Delete child data” stops all processing |
| Consent via explicit action                      | ✅     | Checkbox, default unchecked |
| Child-first framing                              | ✅     | Framed as benefit to child's development |
| Consent tied to specific use only                | ✅     | “...for this limited use of data to generate personalised content…” |
| Data security (encryption)                       | ✅     | In transit and at rest |
| Retention policy                                 | ✅     | Auto-delete after 24 months inactivity or on request |

---

## 3. Final Consent Text (English)

```
By ticking the box, you confirm that you are the child’s parent, guardian, or a trusted professional, and give informed consent for this limited use of data to generate personalised content based on age and daily routine, in the child’s best interest, under GDPR and COPPA.
```

---

## 4. Implementation Details

- **Displayed in:** onboarding screen for parents  
- **Language:** English + Romanian  
- **Checkbox:** default `unchecked`, opt-in only  
- **Policy links:** [Privacy Policy] and [Terms] (must be functional)  
- **Figma ref:** attach final legal-reviewed screen  
- **Code branch:** `content/legal`  
- **Consent record stored in:** [insert DB/table or privacy log system]

---

## 5. Audit trail

- Reviewed & approved: ✅ Legal review (Sonia, Denham, Chester)  
- Ticket: `JIRA-XXX`  
- Version: v1.0 – compliant as of 2025-06-26

---

*This document is for internal compliance use. It does not constitute legal advice.*
