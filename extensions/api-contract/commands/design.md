---
description: Write an OpenAPI fragment in docs/contracts/ for a story or spec, covering only what the feature changes, reusing the live API, with undecided points listed.
---

# API Contract: design

Input: `$ARGUMENTS`

## 1. Find the source

- If `$ARGUMENTS` names a file (for example `docs/stories/pet-owner-name-filter.md`), read it. If it is plain text, treat the text as the story.
- If `$ARGUMENTS` is empty (this is how the `after_specify` hook runs it), use the current feature's spec: run `.specify/scripts/bash/check-prerequisites.sh --paths-only --json` and read `FEATURE_SPEC`. If it cannot be found or is empty, stop and say so. Do not invent a story.

## 2. Read the live API

Fetch `http://localhost:8080/v3/api-docs` (for example `curl -s -m 5 <url>`).

- If it cannot be reached or does not return an OpenAPI document, stop and say so: ask the user to start the backend (`cd brownfield-backend && mvn spring-boot:run`). Do not fall back to reading the code and do not write a contract from guesses.
- Treat the fetched document as the only description of what exists today. Do not read the controllers to fill gaps.

## 3. Name the contract

Output file: `docs/contracts/<name>.yaml`, where `<name>` is the source file name without its extension (`pet-owner-name-filter.md` gives `pet-owner-name-filter.yaml`). For a spec, use the feature directory name. For plain text, use a short kebab-case slug of the story title. Create `docs/contracts/` if it is missing.

## 4. Decide what the feature changes

From the story, list what the API must do that it does not do today. Compare with the live document:

1. **Look for an existing endpoint first.** Before adding any path, find an existing operation that returns the same resource. If one exists, and the change can be expressed as optional query parameters (a filter, a sort, a page), extend that operation with them. Existing callers must keep working: parameters are `required: false`, and the response schema is unchanged unless the story says otherwise.
2. Add a new path only if no existing endpoint returns the resource, or optional query parameters cannot express the change. State in the contract why.
3. **Reuse** existing paths, schemas and field names exactly as the live document spells them. Reference existing schemas with `$ref`; do not redefine them.
4. **Rules come from the story only**: matching (exact, partial, case), a blank or empty filter, no results, and any other behaviour. Put each rule in the description of the parameter or response it applies to, quoting the story's wording and naming the criterion it comes from. Never fill a gap with your own guess.

## 5. Write the fragment

Write valid OpenAPI 3 YAML, covering only what changes: the touched paths and operations, and only the new or changed schemas. Do not copy the whole live document. Start with a comment header: the source path, the date, and `Generated from http://localhost:8080/v3/api-docs`.

End the file with an `x-open-questions` list: every point the story does not decide that the contract needs (for example parameter name, maximum length, sort order, error for invalid input), each saying which path or parameter it affects. Carry over the story's own open questions that touch the API. Skip those that do not.

## 6. If the contract already exists

**Never overwrite or edit an existing contract.** Do not write to it, not even to update it.

1. Build the new fragment in memory only.
2. Compare it with the existing file: paths, parameters, schemas, rules, open questions.
3. Print the differences as a list, one line each, marked `ADDED`, `CHANGED` or `REMOVED` with the path or field.
4. If there are none, say the contract is up to date.
5. If the user wants the new version, tell them to move or delete the old file and run the command again.

## 7. Report

Print: the path written (or the differences, for an existing contract), the operations added or extended, whether an existing endpoint was reused, and the number of open questions. Do not claim the contract was validated against the running backend: it was written from a document, not tested.
