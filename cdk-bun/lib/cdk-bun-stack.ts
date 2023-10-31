import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Architecture, Code, Function, LayerVersion, Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import path = require('path');

interface myProps extends cdk.StackProps {
  projectName: string
}

export class CdkBunStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: myProps) {
    super(scope, id, props);
    new Function(this, "lambda", {
      functionName: props.projectName,
      code: Code.fromAsset(path.join(__dirname, "../../hello-world/dist/")),
      runtime: Runtime.PROVIDED_AL2,
      handler: "bundle.handler",
      architecture: Architecture.ARM_64,
      tracing: Tracing.ACTIVE,
      layers: [LayerVersion.fromLayerVersionArn(this, "layer",
        "arn:aws:lambda:eu-central-1:304046647655:layer:bun:1")
      ]
    })
  }
}
