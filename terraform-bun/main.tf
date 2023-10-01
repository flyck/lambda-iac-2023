locals {
  projectName = "terraform-bun"
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = local.projectName
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# this is still the only way to do things:
# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "lambda/bundle.js"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "test_lambda" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "lambda_function_payload.zip"
  function_name = local.projectName
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "bundle.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256

  runtime = "provided.al2"
  architectures = ["arm64"]

  layers = [
    "arn:aws:lambda:eu-central-1:304046647655:layer:bun:1"
  ]

  environment {
    variables = {
      foo = "bar"
    }
  }
}
