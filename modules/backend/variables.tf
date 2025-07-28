variable "bucket_name" {
  description = "Numele S3 bucketului pentru terraform state"
  type        = string
}

variable "dynamodb_table" {
  description = "Numele tabelei DynamoDB pentru lock"
  type        = string
}
