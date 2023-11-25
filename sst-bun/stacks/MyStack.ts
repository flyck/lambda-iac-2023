import { StackContext, Function } from "sst/constructs";
import * as aws_lambda from "aws-cdk-lib/aws-lambda";


export function API({ stack }: StackContext) {
  // custom runtime not supported
  // new Function(stack, "function", {
  //   architecture: "arm_64",
  //   handler: "../../hello-world/index.ts",
  //   layers: ["arn:aws:lambda:eu-central-1:304046647655:layer:bun:1"],
  //   // @ts-ignore
  //   runtime: "provided.al2",
  //   functionName: "sst-bun"
  // })

  // wont work
  new Function(stack, "function", {
    runtime: "container",
    handler: "./",
    functionName: "sst-bun"
  })


  // const optimizer = new aws_lambda.DockerImageFunction(stack, "Optimizer", {
  //   // myFolder is relative from sst.config.ts, and is the Docker `context` directory
  //   code: aws_lambda.DockerImageCode.fromImageAsset("myFolder", {
  //     memorySize: 1536,
  //     timeout: 300,
  //     file: "optimizer.dockerfile"
  //   }),
  // })
}
