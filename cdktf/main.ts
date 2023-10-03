import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { LambdaFunction } from "@cdktf/provider-aws/lib/lambda-function";
import { ArchiveProvider } from "@cdktf/provider-archive/lib/provider";
import { DataArchiveFile } from "@cdktf/provider-archive/lib/data-archive-file";
import path = require("path");
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { DataAwsIamPolicyDocument } from "@cdktf/provider-aws/lib/data-aws-iam-policy-document";

class MyStack extends TerraformStack {
  private projectName = "cdktf-bun"

  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ArchiveProvider(this, "archiveProvider");
    new AwsProvider(this, "aws", {
      region: "eu-central-1",
      defaultTags: [
        {
          tags: {
            name: this.projectName + 'lambda-stack',
            version: "1.0",
          }
        }
      ]
    });

    // thanks to https://dzone.com/articles/using-cdktf-to-create-an-aws-lambda
    const archiveFile = new DataArchiveFile(this, "archive", {
      outputPath: "lambda_function_payload.zip",
      sourceDir: path.resolve(__dirname, "../hello-world/dist"),
      type: "zip",
    });

    const role = new IamRole(this, "role", {
      assumeRolePolicy: new DataAwsIamPolicyDocument(this, this.projectName + "assume_role", {
        statement: [
          {
            actions: [
              "sts:AssumeRole"
            ],
            effect: "Allow",
            principals: [
              {
                identifiers: ["lambda.amazonaws.com"],
                type: "Service",
              },
            ],
          }
        ],
      }).json,
      name: this.projectName,
      managedPolicyArns: [
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
      ]
    });

    new LambdaFunction(this, 'lambda', {
      runtime: "provided.al2",
      filename: "lambda_function_payload.zip",
      sourceCodeHash: archiveFile.outputBase64Sha256,
      handler: 'bundle.handler',
      layers: ["arn:aws:lambda:eu-central-1:304046647655:layer:bun:1"],
      role: role.arn,
      functionName: this.projectName,
      architectures: ["arm64"]
    });
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
