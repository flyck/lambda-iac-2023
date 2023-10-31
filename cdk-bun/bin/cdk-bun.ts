#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkBunStack } from '../lib/cdk-bun-stack';
import { getStringFromStageContext } from '../lib/utils';

const app = new cdk.App();

const env = {
  account: getStringFromStageContext(app.node, "account"),
  region: getStringFromStageContext(app.node, "region"),
};

new CdkBunStack(app, 'CdkBunStack', {
  env,
  projectName: "cdk-bun"
});
