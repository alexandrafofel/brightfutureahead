provider "aws" {
  region = "eu-central-1"
}

module "backend" {
  source          = "./modules/backend"
  bucket_name     = "brightfuture-terraform-state"
  dynamodb_table  = "terraform-lock"
}
