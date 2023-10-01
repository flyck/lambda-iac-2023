# Is terraform + bun = bae?

After the endless CDK hype, the release of bun 1.0 ignited a new need for speed. As the CDK DX is
lackluster with:
- v1 v2 migration and weird packaging / versioning
- lacking local execution without hot reloading (sam local cannot do it and is super slow)
- all sorts of work-arounds "one shoud know" for CDK specifics, like async lambda building and
  proper error handling in case of failure
- slow speed of deployments with the CDK as it uses Cloudformation under the hood. an extensive
  state manager which seems to be unnecessary for 99% of the cases. This argument is supported by
  the recently added flags to disable Cloudformation roll-back on failure


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
