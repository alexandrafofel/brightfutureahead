provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "ait_tf_state" {
  bucket = "ait-terraform-state-dev-eu"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Project = "AIT"
    Env     = "dev"
  }
}

resource "aws_dynamodb_table" "ait_tf_lock" {
  name           = "ait-terraform-lock-dev-eu"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Project = "AIT"
    Env     = "dev"
  }
}
