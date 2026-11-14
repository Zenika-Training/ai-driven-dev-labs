---
name: speckit-ui-wireframe-generate
description: Draw one low-fidelity HTML wireframe in docs/design/ for a story or spec, one panel per state, with undecided points as open questions.
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: Zenika
  source: ui-wireframe:commands/generate.md
---

# UI Wireframe: generate

Input: `$ARGUMENTS`

## 1. Find the source

- If `$ARGUMENTS` names a file (for example `docs/stories/pet-owner-name-filter.md`), read it. If it is plain text, treat the text as the story.
- If `$ARGUMENTS` is empty (this is how the `after_specify` hook runs it), use the current feature's spec: run `.specify/scripts/bash/check-prerequisites.sh --paths-only --json` and read `FEATURE_SPEC`. If it cannot be found or is empty, stop and say so. Do not invent a story.

Read only the source. Do not read the code to fill gaps: a gap is an open question (step 3).

## 2. Name the page

Output file: `docs/design/<name>.html`, where `<name>` is the source file name without its extension (`pet-owner-name-filter.md` gives `pet-owner-name-filter.html`). For a spec, use the feature directory name (for example `003-owner-filter`). For plain text, use a short kebab-case slug of the story title. Create `docs/design/` if it is missing.

## 3. Collect states and open questions

- **States**: list every state the story describes, in the order it describes them (acceptance criteria, scenarios, notes). Typical ones: initial, filled, empty result, error, loading. Include a state only if the source says it. One state, one panel.
- **Decided**: record what the source states for each state (text, messages, columns, actions). Use the source's exact wording for messages and labels.
- **Open questions**: anything the source does not decide that the drawing would need (layout, control type, ordering, when something updates, wording not given, who sees it). Carry over the source's own open questions too. Never fill a gap with your own guess, and never draw a guess as if it were decided.

## 4. Draw the page

Write one self-contained HTML file: inline CSS, no JavaScript, no external assets, no images. Low fidelity: grey boxes, system font, dashed borders, no brand colours.

Structure:

1. `<h1>` with the story title, then a line with the source path.
2. One `<section class="panel" id="state-<slug>">` per state, each with a heading naming the state and the source criterion it comes from. Draw only elements the source mentions. Where an element is needed but undecided, draw a dashed box labelled `? <short question>` and number it to match the open question list.
3. A final `<section id="open-questions">` with an ordered list of every open question, each saying which panel it affects.

## 5. If the page already exists

Do not start from scratch.

1. Read the existing page. Keep every panel and open question that is still valid, unchanged.
2. Compare with the source: add panels for new states, edit panels whose source text changed, remove panels whose state was dropped, move questions the source now answers out of the open list and into the panel.
3. Mark what changed with `class="changed"` (and a visible badge `NEW`, `CHANGED` or `REMOVED`) on the panel or element, plus a `<section id="changes">` at the top listing each change in one line. Keep removed panels visible, struck through with the `REMOVED` badge, so the change is reviewable.
4. Clear change marks from the previous run that are not part of this run's diff.
5. If nothing changed, leave the file untouched and say so.

## 6. Report

Print: the path written, the states drawn, the number of open questions, and (for an update) what changed. Do not claim visual verification: the page has not been opened in a browser.