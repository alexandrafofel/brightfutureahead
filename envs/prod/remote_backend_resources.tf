resource "aws_s3_bucket" "ait_tf_state_prod_eu" {
  bucket = "ait-terraform-state-prod-eu"

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
    Env     = "prod"
  }
}

resource "aws_dynamodb_table" "ait_tf_lock_prod_eu" {
  name         = "ait-terraform-lock-prod-eu"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Project = "AIT"
    Env     = "prod"
  }
}
