# IaC Tools for Serverless in 2023

This repo is looking to answer which of the modern IaC frameworks could be the best fit for bun
development. Which one is the fastest? This does take into acconunt the recent license change from
terraform which might make a switch to opentofu necessary in the future.

Candidates:
- ✅ terraform
- ✅ opentofu
- CDK
- serverless framework
- sst
- [wing](https://github.com/winglang/wing)
- ?

## Comparison

- Init time (time to establish basics for working)
- Feature matrix
  - local execution,
  - local hot reloading,
- First Deployment time
- Code update deployment time
- Config Change deployment time
- Bun readyness: zip / build
