# Legal Compliance Checklist – Parental Consent (GDPR + COPPA)

Versiune v1.0   ·   2025‑06‑27  
Responsabil principal: **Legal / Compliance**

| # | Cerință (scurt) | Se aplică la | Bază legală | Responsabil | ✅ Status |
|---|-----------------|--------------|-------------|-------------|-----------|
| **CONSENT CONDITIONS** ||||| |
| 1 | VPC obținut înainte de colectare | Părinți | COPPA §312.5 · GDPR Art. 8 | Dev & UX | ☐ |
| 2 | School Exception contract instituție‑părinte | Educatori / Școli | COPPA FAQ I‑2 · GDPR Art. 6(1)(b)/(e) | Legal & Dev | ☐ |
| 3 | Terapeut trimite invitație VPC părintelui | Terapeuți / Clinici | COPPA §312.5 · GDPR Art. 6(1)(b)/(f) | Dev | ☐ |
| **DATA MINIMISATION & PURPOSE** ||||| |
| 4 | Colectăm doar vârstă aproximativă + rutină | Toți | GDPR Art. 5(1)(c) | Dev & UX | ☐ |
| 5 | Fără profilare / advertising | Toți | GDPR Recit. 38 · COPPA §312.4 | Dev | ☐ |
| **TRANSPARENȚĂ (COPY)** ||||| |
| 6 | Copy clar (nivel B2): cine, ce, de ce, drepturi | Toți | GDPR Art. 12 · COPPA §312.4 | Legal & UX | ☐ |
| **USER RIGHTS** ||||| |
| 7 | Părinte poate accesa & șterge date ≤ 30 zile | Toți | GDPR Art. 17 · COPPA §312.6 | Dev & QA | ☐ |
| 8 | Endpoint `DELETE /child-data` funcțional | Toți | GDPR Art. 17 | Dev | ☐ |
| **LOGGING & AUDIT** ||||| |
| 9 | Consent log (user_id, rol, metodă, timp) păstrat ≥ 1 an | Toți | GDPR Art. 5(2) · COPPA §312.10 | Dev | ☐ |
| **STORE COMPLIANCE** ||||| |
|10 | App Store / Play: “Made for Families”, declarații VPC & School Exception | Toți | App Store / Play policies | Dev & Legal | ☐ |

---

### Cum se folosește

1. **Notion** → Copiază tabelul; adaugă coloana „Notes” pentru comentarii.  
2. **Bifare**: fiecare echipă bifează „Status” după implementare și testare.  
3. **Export final**: Legal semnează checklistul (Subtask 1.6) și îl salvează semnat în repo.

*Acest checklist este informativ și nu constituie consultanță juridică.*
