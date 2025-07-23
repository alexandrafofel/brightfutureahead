terraform {
  backend "s3" {
    bucket         = "brightfuture-terraform-state"
    key            = "dev/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-lock"
  }
}
