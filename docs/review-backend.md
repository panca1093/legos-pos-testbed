---
type: Playbook
title: Backend review rules for the POS
description: Repo-specific rules the backend inspector must enforce.
role: inspector
specialty: backend
---

- Every exported function in `src/` must have a unit test in the matching `*.test.ts`. A missing test is a **major** finding.
- Error messages thrown to callers must start with the module name, e.g. `checkout: …`. A message that does not is a **minor** finding.
