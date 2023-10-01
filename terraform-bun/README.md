# Terraform Bun

## Setup
1) https://developer.hashicorp.com/terraform/downloads
2) lambda deps: cd lambda; bun install cd ..
3) establish state
   - comment out terraform s3 black in state.tf
   - terraform init; terraform apply
   - terraform init -migrate-state

## Impressions

Cons:
- Seems like terraform hasnt changed at all over the years. AWS Lambdas can still only do zip
files.
- State setup is still a big akward. I could use a third party module for this, but who knows if
  this will be future-proof?

Pros:
