# 🧭 **CALM TIPS — TECH SPEC v1.0**

> **Scope:** defines deterministic mapping between quiz outputs (Q1–Q6) and Calm Tips content.  
> **Usage:** backend logic for `calm_tip_shown` event + frontend rendering of personalised advice.  
> **Version:** MVP (20 deterministic scenarios)  
> **Source:** `/research/classification_spec.yaml`, `/topics/*.md`, `/questions.json`  

---

## 🧩 1. LOGIC FLOW

### 🎯 Goal  
Generate **1 Calm Tip** immediately after quiz submission, using only quiz answers (no extrapolation).

### ⚙️ Step-by-Step Process

| Step | Description | Input | Output |
|------|--------------|--------|---------|
| 1️⃣ | User answers Q1–Q6 | 6 answers | raw responses |
| 2️⃣ | Derive tags | from `questions.json` | `{emo, clar, act, indecis, freq}` |
| 3️⃣ | Compute `user_type` | using rules from `classification_spec.yaml` | `"emotional" / "analytic" / "pragmatic" / "tired" / "indecis"` |
| 4️⃣ | Map `topic` | Q3 → topic id | `"sleep" / "limits" / "cooperation" / "meals"` |
| 5️⃣ | Map `age_band` | Q2 → `<2`, `2–3`, `4–6` | `"age_band"` |
| 6️⃣ | Fetch Calm Tip | from topic markdown | exact `user_type + age_band` match |
| 7️⃣ | Emit analytics | `event: calm_tip_shown` | `{user_type, topic, age_band, tip_id, clicked}` |

---

## 🧮 2. USER TYPE RULES (from `classification_spec.yaml`)

| Type | Logic | Label |
|------|--------|--------|
| **OBOSIT (tired)** | `freq >= 2` AND `emo >= 1` AND `act >= 1` | “Părinte obosit” |
| **PRAGMATIC (action)** | `act >= 2` OR `act > max(emo, clar)` | “Părinte pragmatic” |
| **ANALITIC (analytic)** | `clar >= 3` OR `clar > max(emo, act)` | “Părinte analitic” |
| **EMOȚIONAL (emotional)** | `emo >= max(clar, act)` | “Părinte emoțional” |
| **INDECIS (safe/undecided)** | `indecis >= 1` OR `max(emo, clar, act) <= 1` | “Părinte indecis” |

---

## 🧱 3. DATA MODEL (for DB / JSON seed)

```json
{
  "user_type": "emotional",
  "topic": "sleep",
  "age_band": "2-3",
  "calm_tip_text": "It’s tiring when bedtime turns into protest — I get it. ...",
  "lang": "en",
  "tip_id": "sleep_emotional_2_3",
  "metadata": {
    "source": "TOPIC - SLEEP.md",
    "created_by": "research_team_v1.0",
    "version": "1.0"
  }
}
```

---

## 🧠 4. FULL SCENARIO MAP (20 deterministic entries)

*(Truncated for brevity – full table provided earlier in chat)*

---

## 🧠 5. ANALYTICS INSTRUMENTATION

| Event | Trigger | Payload Example |
|--------|----------|----------------|
| `quiz_classified` | after computing `user_type` | `{emo:2, act:1, clar:3, indecis:0, freq:1, user_type:"analytic", age_band:"4-6"}` |
| `calm_tip_shown` | Calm Tip displayed | `{user_type:"analytic", age_band:"4-6", topic:"sleep", tip_id:"sleep_analytic_4_6", clicked:false}` |

---

## 🪶 6. FRONT-END DISPLAY GUIDELINES

| UI Element | Requirement |
|-------------|--------------|
| **Header text** | “Here’s something for tonight” (localized) |
| **Body** | Full Calm Tip (as plain text, no markdown headings) |
| **CTA (optional)** | “Try this tonight” → logs `clicked:true` |
| **Animation** | 300 ms fade-in |
| **Font size** | Body: 16 px; Line height: 150%; Margin-bottom: 8 px |
| **Tone enforcement** | must match brand tone (Soothing × Empathetic × Trustworthy) |

---

## 🧰 7. IMPLEMENTATION NOTES

- **Language:** English only (MVP) → future i18n via `lang` key  
- **Storage:** JSON / Firestore collection `calm_tips`  
- **Key:** `tip_id` (unique, lowercase, underscore-delimited)  
- **Fallback:** if `age_band` = unknown → show `2–3` default  
- **Extensibility:** new topics can be added via same schema  

---

## ✅ 8. DELIVERABLES FOR DEV

| File | Purpose |
|------|----------|
| `/data/calm_tips.json` | contains the 20 objects above |
| `/functions/classifyUser.ts` | implements logic from section 2 |
| `/functions/getCalmTip.ts` | input: `{answers}` → output: `{tip_id, calm_tip_text}` |
| `/events/logCalmTip.ts` | sends analytics events per section 5 |
| `/components/CalmTipCard.tsx` | renders Calm Tip with fade-in |

---

✅ **Ready for Handoff**  
This document = canonical reference for `calm_tips` MVP logic.
