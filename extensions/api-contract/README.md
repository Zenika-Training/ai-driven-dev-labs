# api-contract

Spec Kit extension. Writes one OpenAPI fragment per story in `docs/contracts/`, covering only what the feature changes.

## Command

`/speckit.api-contract.design [story-or-spec-path]`

- With a path, reads that story or spec. With no argument, reads the current feature's spec.
- Reads the live API description at `http://localhost:8080/v3/api-docs` and reuses existing paths and fields.
- Takes every rule from the story. Anything the story does not decide is listed as an open question.
- Before adding an endpoint, looks for an existing one returning the same resource and extends it with optional query parameters if it can.
- Never overwrites an existing contract: if `docs/contracts/<name>.yaml` exists, it lists the differences instead.

## Hook

`after_specify` runs the command with `optional: false`, so it executes automatically after `/speckit.specify`.

## Install (local)

```bash
specify extension add --dev extensions/api-contract
```
