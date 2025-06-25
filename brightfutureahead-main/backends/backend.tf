terraform {
  backend "s3" {
    bucket         = "tf-state-brightfuture"
    key            = "global/s3/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "tf-lock-brightfuture"
    encrypt        = true
  }

  required_version = ">= 1.5.0"
}
