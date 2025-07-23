## 📦 Modul: vpc

### 🔍 Scop

Acest modul creează un Virtual Private Cloud (VPC) în AWS, cu opțiuni configurabile pentru CIDR block, DNS și tagging. Este baza pentru orice infrastructură AWS izolată și securizată.

---

### 📥 Inputs

| Nume         | Tip     | Descriere                                 | Implicit          |
|--------------|---------|--------------------------------------------|-------------------|
| `cidr_block` | string  | CIDR block-ul principal pentru VPC         | `"10.0.0.0/16"`   |
| `name`       | string  | Numele tag-ului AWS pentru resursa VPC     | `"default-vpc"`   |

---

### 📤 Outputs

_Niciun output definit momentan._

---

### 🧪 Exemplu de utilizare

```hcl
module "vpc" {
  source     = "../../modules/vpc"

  cidr_block = "10.0.0.0/16"
  name       = "brightfuture-vpc"
}
