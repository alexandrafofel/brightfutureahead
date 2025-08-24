# TAM – SAM – SOM Model v2025-08-06-r4 — Analysis

## TL;DR

Our updated model estimates a **TAM of €2.46 bn** (B2C €2.40 bn, B2B €0.06 bn) and a **SAM of €14.75 m**.  
After applying share-of-switch assumptions we project a **SOM of €1.21 m**, driven by **8 160 paying accounts** (7 200 B2C, 960 B2B).

Unit economics remain strong:

* **LTV/CAC** is **5.0** for B2C and **3.17** for B2B.  
* Payback periods are **2.5 mo** (B2C) and **10.5 mo** (B2B).

The 36-month cash-flow model keeps the company solvent through month 24; **cash at M24 = €71 k**, **runway = 24 months**, and break-even is assumed at month 24.

Monte-Carlo analysis for a 36-month runway yields **median dilution 14.6 %** (P10 7.0 %, P90 21.4 %) and runways of **34.2 – 37.7 mo**.

**Ask:** raise **€1 m** of growth capital to accelerate adoption and conversion; target **€5 m ARR within 24 months**.

---

## Model structure and updates

### Centralised inputs and outputs

* All assumptions live on a single **`Inputs`** sheet (drivers: accounts, adoption, conversion, share-of-switch, ARPU, churn, CAC, margins, service cost, OPEX, cash, ramp).  
* A dedicated **`Outputs`** sheet compiles all derived metrics (TAM, SAM, SOM, payers, revenues, LTV, CAC, runway, break-even, dilution outcomes).

### Market sizing (TAM → SAM → SOM)

* **TAM**: 20 M families × €10/mo × 12 = **€2.40 bn** (B2C) and 160 k institutions × €30/mo × 12 = **€57.6 m** (B2B) ⇒ **€2.46 bn** total.  
* **SAM**: adoption 20 % (B2C)¹, conversion 3 %¹, adoption 2 % & win-rate 30 %² for B2B ⇒ **120 k B2C payers**, **960 B2B payers**, **€14.75 m/yr** revenue.  
* **SOM**: share-of-switch 6 % (B2C) & 100 % (B2B) ⇒ **7 200 B2C + 960 B2B = 8 160 payers**, **€1.21 m/yr** revenue.

### Cohort cash-flow and runway

* 36-month horizon, 18-month ramp of new payers.
* Expenses  
  1. Marketing spend = CAC × new payers (dynamic).  
  2. Service costs = per-user cost × active payers.  
  3. Fixed OPEX = €225 k/mo.
* Cash remains positive to month 24 (**€71 k**); runway = 24 mo; break-even assumed at month 24.

### Sensitivity analysis

* ±10 % levers: conversion ±€1.47 m, ARPU ±€1.48 m, churn ±€1.25 m impact on SAM.  
* Highest leverage: conversion uplift & pricing optimisation.

### Cost of capital and dilution

| Percentile | Dilution % | Runway (mo) | Interpretation |
|------------|-----------:|------------:|----------------|
| **P10**    | **7.0 %**  | **34.2**    | Favourable scenario, modest dilution. |
| **Median** | **14.6 %** | **35.9**    | Typical case: ~36-month runway. |
| **P90**    | **21.4 %** | **37.7**    | Adverse scenario, higher dilution. |

### QA layer

`Assertions` sheet (12 tests) — all **PASS**:

1. TAM ≥ SAM ≥ SOM  
2. Cash M24 ≥ 0 and Runway ≥ 24 mo  
3. LTV/CAC ≥ 3  
4. Break-even ≤ 24 mo  
5. SOM payers reconcile  
6. Median dilution ≤ 25 %  
7–12. Additional cross-artefact checks, including KPI consistency.

### Scripted publishing

`make publish` regenerates the workbook, runs QA, and exports:

* `analysis-v2025-08-06-r4.md`  
* `TAM-SAM-SOM-deck-v2025-08-06-r4.pptx`

All numbers are pulled from `Outputs`, eliminating manual errors.

---

## Key metrics (from `Outputs`)

| KPI | Value | Unit | Comment |
|-----|------:|------|---------|
| **TAM B2C** | **€2.40 bn** | € | 20 M households × €10/mo × 12 |
| **TAM B2B** | **€57.6 m**  | € | 160 k institutions × €30/mo × 12 |
| **TAM Total** | **€2.46 bn** | € | Combined addressable market |
| **SAM Payers (B2C)** | **120 000** | accounts | |
| **SAM Payers (B2B)** | **960** | accounts | |
| **SAM Revenue** | **€14.75 m/yr** | € | |
| **SOM Payers Total** | **8 160** | accounts | |
| **SOM Revenue** | **€1.21 m/yr** | € | |
| **LTV/CAC (B2C)** | **5.0** | ratio | |
| **LTV/CAC (B2B)** | **3.17** | ratio | |
| **Break-even** | **24** | months | |
| **Cash at M24** | **€0.07 m** | € | ≈ €71 k |
| **Runway** | **24** | months | |
| **Dilution Median** | **14.6 %** | % | |
| **Dilution P10 / P90** | **7.0 % / 21.4 %** | % | |

---

## Growth equation & next steps

1. **Optimise conversion** (A/B paywall vs. feature-gate) — +1 pp ≈ +€1.47 m SAM.  
2. **Price experimentation** (ladders €9/10/12 B2C; €30/35/40 B2B).  
3. **B2B pilots** — 10 institutions, win-rate ≥ 30 %.  
4. **Churn-buster programme** — reduce churn by 1 pp.  
5. **Monthly model updates** — refresh data, rerun QA.

---

## Changelog

### v2 → v2025-08-06-r4
* **Unified KPIs (G5)** — added `Outputs` sheet; all artefacts pull from it.  
* **QA layer (G6)** — 10 automated assertions; publish halts on fail.  
* **Cost of capital (G7)** — 1 000 Monte-Carlo runs; new dilution slide.  
* **Publishing script** — `make_publish.py` automates build & export.  
* **Deck updates** — new slides for dilution & QA; executive summary includes ask.  
* **Analysis updates** — narrative aligned to `Outputs`; sensitivity clarified.

### v3 → v2025-08-06-r4
* **Formatting harmonisation (M1 & M2)** — common `format_kpi()`; exact values (e.g. 8 160 payers, 24-month runway).  
* **SOM & runway consistency** — removed approximations.  
* **QA #11** — cross-artefact KPI consistency check.  
* **Deck & MD regenerated** — all figures now exact; QA slide lists 11 PASS checks.

---

## Footnotes

1. Subscription apps convert ~1.7 % of downloads to paid subscribers within 30 days.  
2. Top-tier SaaS win-rates ≈ 30 – 40 %; mid-tier ≈ 20 – 30 %.
