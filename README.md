# 🚀 AWS Pipeline MVP – Terraform Project

Acest proiect oferă o implementare modulară, scalabilă și ușor de întreținut pentru infrastructură AWS, folosind **Terraform** și **CI/CD GitHub Actions**. Este optimizat pentru medii `dev` și `prod` și include module reutilizabile pentru VPC, ECS, RDS etc.

---

## 📁 Structura Folderelor

```plaintext
.
├── .github/
│   └── workflows/
│       └── terraform.yml         # CI/CD pipeline for Terraform
│
├── backends/
│   └── backend.tf                # Backend config for Terraform state
│
├── envs/
│   ├── dev/
│   │   ├── README.md
│   │   ├── backend.tf
│   │   ├── ec2.tf
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── versions.tf
│   └── prod/
│       ├── README.md
│       ├── backend.tf
│       └── main.tf
│
├── modules/
│   ├── backend/
│   │   ├── README.md
│   │   ├── main.tf
│   │   ├── outputs.tf
│   │   └── variables.tf
│   ├── ecs/
│   │   └── README.md
│   ├── rds/
│   │   └── README.md
│   └── vpc/
│       ├── README.md
│       ├── main.tf
│       └── variables.tf
│
├── docs/
│   └── AIT-220.md   # Documentație pentru organizare
│
├── README.md                     # Acest fișier
├── buildspec.yml                 # Config pentru AWS CodeBuild (opțional)
└── setup.tf                      # Setup general
