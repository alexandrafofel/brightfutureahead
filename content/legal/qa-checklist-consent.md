# QA Checklist – Parental Consent Flow

This checklist helps QA verify that the parental consent flow meets all compliance, functional, and UX requirements.

---

## ✅ 1. Legal Copy Validation (EN + RO)
- [ ] Text matches exactly the approved version from `parental-consent_RO-EN.md`
- [ ] Includes both English and Romanian if applicable
- [ ] No spelling, grammar or formatting errors

---

## ✅ 2. Functional Behaviour
- [ ] Checkbox is present and **default UNCHECKED**
- [ ] User cannot proceed unless the checkbox is ticked
- [ ] Clicking "Delete child data" removes all related data and disables personalisation
- [ ] Privacy Policy and Terms links are functional and open in a new tab
- [ ] No tracking or advertising scripts triggered on consent screen

---

## ✅ 3. Technical & Security
- [ ] Consent status is stored securely (encrypted at rest)
- [ ] Consent is logged with timestamp and user reference
- [ ] Personal data auto-deletes after 24 months of inactivity (or sooner on request)

---

## ✅ 4. UI Consistency
- [ ] Checkbox label is visible and legible on all screen sizes
- [ ] Text is accessible (color contrast, readable font size)
- [ ] Responsive layout works on iPhone SE and similar devices
- [ ] Icons or illustrations (if any) are respectful and child-friendly

---

Maintainer: privacy@heartnest.app  
Last updated: 2025-06-26
