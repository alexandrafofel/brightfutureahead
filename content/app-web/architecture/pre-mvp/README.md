<p align="center">
  <img src="./lumlyn-logo-512.png" alt="Lumlyn Logo" width="200"/>
</p>

# Lumlyn – Pre-MVP Architecture

Acest folder documentează arhitectura **pre-MVP** pentru Lumlyn.  
Scopul acestei etape este **colectarea de răspunsuri la quiz** și **adrese de email** pentru a antrena modelul ulterior.

---

## 📐 Diagrame Arhitectură

Toate diagramele sunt disponibile în 3 formate:  
- **.mmd** – cod sursă Mermaid (versionabil)  
- **.drawio** – fișier editabil în diagrams.net  
- **.png** – export pentru vizualizare rapidă

---

### 1. Context (C4)
![Context](./c4–context.png)

### 2. Component Diagram
![Component](./component-diagram.png)

### 3. Component Diagram – Detailed
![Component Detailed](./component-detailed-diagram.png)

### 4. Deployment View
![Deployment](./deployment-view.png)

### 5. State Machine (Quiz Flow)
![State Machine](./state-machine.png)

### 6. Sequence Diagram
![Sequence](./sequence-diagram.png)

### 7. ERD (Schema DB)
![ERD](./ERD.png)

### 8. Data Flow
![Data Flow](./data-flow.png)

### 9. RLS & Access Control
![RLS](./rls.png)

### 10. Incident / Observability Flow
![Incident Flow](./incident-flow.png)

---

## 🛠️ Cum editezi diagramele

1. **Mermaid**: deschide fișierele `.mmd` în [mermaid.live](https://mermaid.live) sau direct în draw.io (**Insert → Advanced → Mermaid**).  
2. **Draw.io**: deschide fișierele `.drawio` în [app.diagrams.net](https://app.diagrams.net/) sau în aplicația desktop.  
3. **PNG**: vizualizare rapidă, nu editabil.  

---

## 🎯 Scope Pre-MVP
- **Frontend quiz responsiv** (Next.js, Tailwind)  
- **State machine adaptiv** (logică conform specificațiilor)  
- **Captură email** cu consimțământ  
- **Evenimente minime** în PostHog  
- **Schema DB simplificată** în Supabase  
- **Manual E2E tests** (automatizarea vine ulterior)  

---

## 📂 Structura acestui folder

content/app-web/architecture/pre-mvp/

ERD.mmd / .drawio / .png

c4-context.mmd / .drawio / .png

component-diagram.mmd / .drawio / .png

component-detailed-diagram.mmd / .drawio / .png

deployment-view.mmd / .drawio / .png

state-machine.mmd / .drawio / .png

sequence-diagram.mmd / .drawio / .png

data-flow.mmd / .drawio / .png

rls.mmd / .drawio / .png

incident-flow.mmd / .png


---

## 🔮 Next Steps
- Adăugare **Feature Flags Map**  
- Integrare testare automată (Playwright)  
- Extindere schema pentru MVP (tracking detaliat, profil utilizator, segmente)  
