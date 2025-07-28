provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "ait_tf_state_dev_us" {
  bucket = "ait-terraform-state-dev-us"

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
    Region  = "us"
  }
}

resource "aws_dynamodb_table" "ait_tf_lock_dev_us" {
  name         = "ait-terraform-lock-dev-us"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Project = "AIT"
    Env     = "dev"
    Region  = "us"
  }
}
