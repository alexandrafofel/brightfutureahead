terraform {
  backend "s3" {
    bucket         = "ait-terraform-state-dev-eu"
    key            = "dev/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "ait-terraform-lock-dev-eu"
    encrypt        = true
  }
}
