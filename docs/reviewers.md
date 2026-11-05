---
type: Reviewer Routing
title: Who reviews what
description: Business logic in src is backend; tests go to testing.
routes:
  - paths: ["src/**/*.ts", "!src/**/*.test.ts"]
    reviewers: [backend]
  - paths: ["**/*.test.ts"]
    reviewers: [testing]
---

# Who reviews what

All of `src/` is checkout business logic with no UI, so it is reviewed as backend code.
See [money rules](money.md).
