provider "aws" {
      region     = "eu-central-1"
}

# for bootstrap comment out this block first and then run a `terraform init -migrate-state`. This
# will give you the production-like experience and realisitc deployment times with a shared state
# instead of a local state
terraform {
  backend "s3" {
    bucket         = "opentofu-bun-state"
    key            = "test/opentofu-bun-state.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-bun-state"
  }
}

resource "aws_s3_bucket" "state_bucket" {
  bucket = "opentofu-bun-state"
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "opentofu-bun-state"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}
