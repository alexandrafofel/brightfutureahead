# research/user-types

Status: Done

# User Types — Quiz-Derived (MVP)

> Scope: tipologii 100% deduse din questions.json (Q1–Q6, tag-uri: emo_validare, clarificare, actiune_pas, profil_safe/confirmare). Fără extrapolări.
> 
> 
> Personalizare: fiecare tip se **modifică** după `age_band` (<2, 2–3, 4–6; fallback: unknown).
> 

---

## 1) Părinte care caută validare emoțională (“Emoțional”)

**Detectare (Q/Opțiuni):**

- Q1 = O1 Copleșit(ă) / O3 Frustrat(ă)
- Q4 = O3 Un pic de validare
- (Secundar) Q6 = O4 Nu sunt sigur(ă)
**Nevoi:** siguranță emoțională, normalizare, zero judecată**Pattern calm-tip (≤160c):** “You’re safe / You’re not alone / Small kindness today.”

---

## 2) Părinte care vrea explicații scurte (“Analitic”)

**Detectare (Q/Opțiuni):**

- Q3 = O1/O2/O3/O4 (tema grea)
- Q4 = O2 O explicație pe scurt
- Q5 și/sau Q6 pot întări `clarificare`**Nevoi:** “de ce se întâmplă” + logică scurtă, aplicabilă**Pattern calm-tip:** “Understand what’s behind → calm follows.”

---

## 3) Părinte orientat spre acțiune (“Pragmatic”)

**Detectare (Q/Opțiuni):**

- Q4 = O1 Un pas simplu **sau** O4 Plan scurt pentru mâine
- Q6 = O2 Și pentru mine **/** O3 Pentru amândoi
**Nevoi:** next-step clar, azi; fără jargon**Pattern calm-tip:** “Start small. One gentle step tonight.”

---

## 4) Părinte obosit, dar cooperant (“Obosit”)

**Detectare (Q/Opțiuni):**

- Q5 = O3 Des **sau** O4 Aproape zilnic (uzură)
- + Q1 cu emo (O1/O3) și Q4 cu acțiune (O1/O4)
**Nevoi:** pauză emoțională + acțiune minimă, fără presiune**Pattern calm-tip:** “Pause and breathe — one small step is enough.”

---

## 5) Părinte indecis / profil safe (“Indecis”)

**Detectare (Q/Opțiuni):**

- Q1 = O4 Sunt ok/nu știu **sau**
- Q2 = O4 Prefer să nu spun **sau**
- Q6 = O4 Nu sunt sigur(ă)
**Nevoi:** explorare blândă, ton neutru-cald, zero presiune**Pattern calm-tip:** “Take your time. You’re already learning.”

---

## Personalizare după vârstă (modificator, nu tipologie)

- **`age_band`** din Q2: `<2`, `2–3`, `4–6`, `unknown`
- **Ghid copy (exemplificativ):**
    - `<2` → co-reglare & ritm lent: “Hold, breathe, slow transitions.”
    - `2–3` → rutină & repetiție: “One tiny, repeatable step tonight.”
    - `4–6` → autonomie & limite blânde: “Offer two choices, then follow through.”
