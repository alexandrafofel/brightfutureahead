## 📦 Modul: backend

### 🔍 Scop

Acest modul definește configurația pentru backend-ul Terraform, folosind S3 ca storage pentru `terraform.tfstate` și DynamoDB pentru lock. Este util pentru a împărți starea între environment-uri și a preveni conflictele.

---

### 📥 Inputs

| Nume               | Tip     | Descriere                                | Implicit              |
|--------------------|---------|-------------------------------------------|------------------------|
| `bucket`           | string  | Numele bucket-ului S3                     | `"my-tf-state"`        |
| `dynamodb_table`   | string  | Numele tabelei DynamoDB pentru locking    | `"my-tf-locks"`        |
| `region`           | string  | Regiunea AWS în care sunt resursele       | `"eu-central-1"`       |

---

### 📤 Outputs

_Niciun output definit momentan._

---

### 🧪 Exemplu de utilizare

```hcl
module "backend" {
  source         = "../../modules/backend"

  bucket         = "brightfuture-terraform-state"
  dynamodb_table = "brightfuture-lock-table"
  region         = "eu-central-1"
}
