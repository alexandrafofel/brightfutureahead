### 📦 Modul: rds

### 🔍 Scop

Modulul `rds` este pregătit pentru a configura o bază de date Amazon RDS (Relational Database Service), susținând motoare ca PostgreSQL, MySQL etc.

---

### 📥 Inputs

| Nume            | Tip     | Descriere                                    | Implicit           |
|-----------------|---------|-----------------------------------------------|--------------------|
| `engine`        | string  | Tipul motorului de baze de date (`postgres`, `mysql`, etc.) | `"postgres"`       |
| `instance_class`| string  | Tipul instanței RDS                          | `"db.t3.micro"`    |
| `name`          | string  | Numele bazei de date                        | `"app_db"`         |

---

### 📤 Outputs

_Niciun output definit momentan._

---

### 🧪 Exemplu de utilizare

```hcl
module "rds" {
  source         = "../../modules/rds"

  engine         = "postgres"
  instance_class = "db.t3.micro"
  name           = "brightfuture-db"
}
