# ui-wireframe

Spec Kit extension. Draws one low-fidelity HTML wireframe per story in `docs/design/`.

## Command

`/speckit.ui-wireframe.generate [story-or-spec-path]`

- With a path, reads that story or spec. With no argument, reads the current feature's spec.
- Writes `docs/design/<story-name>.html`, one panel per state the source describes.
- Anything the source does not decide appears on the page as an open question.
- If the page exists, it is updated in place and changes are marked (`NEW`, `CHANGED`, `REMOVED`).

## Hook

`after_specify` runs the command with `optional: false`, so it executes automatically after `/speckit.specify`.

## Install (local)

```bash
specify extension add --dev extensions/ui-wireframe
```
