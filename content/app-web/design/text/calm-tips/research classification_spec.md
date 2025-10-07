# research/classification_spec.yaml

Status: Done

# A-002 — Quiz-based User Classification (MVP) — v1.1 (age modifier)

meta:
version: 1.1
source: questions.json
scope: MVP — no extrapolations beyond quiz tags

tags:
emo: emo_validare
clar: clarificare
act: actiune_pas
indecis: confirmare_or_profil_safe   # signal only (Q1:O4 confirmare, Q2:O4 profil_safe, Q6:O4 indecis)
freq: frequency_index                # derived 0..3 from Q5

questions:
Q1: # Cum te simți după ziua de azi?
O1: { emo: 1 }        # Copleșit(ă)
O2: { clar: 1 }       # Îngrijorat(ă)
O3: { emo: 1 }        # Frustrat(ă)
O4: { indecis: 1 }    # Sunt ok / nu știu

Q2: # Câți ani are copilul?
O1: { }               # <2
O2: { }               # 2–3
O3: { }               # 4–6
O4: { indecis: 1 }    # Prefer să nu spun

Q3: # Ce ți s-a părut cel mai greu?
O1: { clar: 1 }       # Somn
O2: { clar: 1 }       # Limite & tantrumuri
O3: { clar: 1 }       # Cooperare / atenție
O4: { clar: 1 }       # Mese / ritualuri

Q4: # Ce ți-ar prinde bine în seara asta?
O1: { act: 1 }        # Un pas simplu de încercat
O2: { clar: 1 }       # O explicație pe scurt
O3: { emo: 1 }        # Un pic de validare
O4: { act: 1 }        # Un plan scurt pentru mâine

Q5: # Cât de des apar momentele grele?
O1: { clar: 1, freq: 0 }  # Rar
O2: { clar: 1, freq: 1 }  # Uneori
O3: { clar: 1, freq: 2 }  # Des
O4: { clar: 1, freq: 3 }  # Aproape zilnic

Q6: # Vrei sfaturi doar pentru copil sau și pentru tine?
O1: { clar: 1 }       # Doar pentru copil
O2: { act: 1 }        # Și pentru mine
O3: { act: 1 }        # Pentru amândoi
O4: { emo: 1, indecis: 1 } # Nu sunt sigur(ă)

rules:
priority: [OBOSIT, PRAGMATIC, ANALITIC, EMOTIONAL, INDECIS]

OBOSIT:
all:
- "freq >= 2"
- "emo >= 1"
- "act >= 1"

PRAGMATIC:
any:
- "act >= 2"
- "act > max(emo, clar)"

ANALITIC:
any:
- "clar >= 3"
- "clar > max(emo, act)"

EMOTIONAL:
all:
- "emo >= max(clar, act)"

INDECIS:
any:
- "indecis >= 1"
- "max(emo, clar, act) <= 1"

outputs:
types:
OBOSIT:     { id: tired_parent,     label: "Părinte obosit" }
PRAGMATIC:  { id: action_parent,    label: "Părinte pragmatic" }
ANALITIC:   { id: analytic_parent,  label: "Părinte analitic" }
EMOTIONAL:  { id: emotional_parent, label: "Părinte emoțional" }
INDECIS:    { id: indecis_parent,   label: "Părinte indecis" }

profile:

age_band:
"Q2.O1": "<2"
"Q2.O2": "2-3"
"Q2.O3": "4-6"
"Q2.O4": "unknown"

age_index_years:
"<2": 1.0
"2-3": 2.5
"4-6": 5.0
"unknown": null

analytics:

events:
- name: quiz_classified
props: [emo, clar, act, indecis, freq, user_type, age_band, age_index_years]
pii: false

- name: calm_tip_shown
props: [user_type, age_band, tip_id, clicked]
pii: false

topic:
Q3:
O1: sleep
O2: limits
O3: cooperation
O4: meals
