## 📦 Modul: ecs

### 🔍 Scop

Acest modul este pregătit pentru a crea un cluster ECS (Elastic Container Service) în AWS. ECS permite rularea de aplicații containerizate la scară mare, folosind EC2 sau Fargate.

---

### 📥 Inputs

| Nume         | Tip     | Descriere                                  | Implicit        |
|--------------|---------|---------------------------------------------|-----------------|
| `name`       | string  | Numele clusterului ECS                      | `"ecs-cluster"` |

---

### 📤 Outputs

_Niciun output definit momentan._

---

### 🧪 Exemplu de utilizare

```hcl
module "ecs" {
  source = "../../modules/ecs"

  name   = "brightfuture-ecs"
}
