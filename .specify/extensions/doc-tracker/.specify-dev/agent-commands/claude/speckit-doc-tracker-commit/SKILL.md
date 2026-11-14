---
name: speckit-doc-tracker-commit
description: Read the staged changes, draft a commit message and show it for review. Never runs git commit.
compatibility: Requires spec-kit project structure with .specify/ directory
metadata:
  author: Course participant
  source: doc-tracker:commands/commit.md
---

# Doc Tracker: Draft Commit Message

## Purpose

Draft a commit message for what is currently staged and show it to the user. The user reviews it and commits by hand.

## Hard rule

**Never run `git commit`**, in any form (`--amend`, `-a`, `--no-verify`, through a script or alias). Never run `git add`, `git reset`, `git stash`, `git checkout` or anything else that changes the index, the working tree or history. Only the read-only commands below are allowed.

**Never edit a spec.** `SPEC.md` and everything under `specs/` are read-only here. If the change and a spec disagree, report it. Do not fix either side.

## User Input

$ARGUMENTS

Treat the input, if any, as optional hints for the message (for example a ticket id or a scope). It never overrides the hard rule.

## Steps

1. **Check there is something staged.** Run `git diff --cached --stat`. If the output is empty, tell the user nothing is staged (and suggest `git add`), then stop. Do not stage anything yourself.

2. **Read the staged changes.** Run `git diff --cached` for the full diff. If it is very large, work from `git diff --cached --stat` plus the diffs of the most significant files. Ignore unstaged and untracked files.

3. **Compare the change with the specs.** Before drafting, read the project's specs: `SPEC.md` at the repo root if it exists, and the feature specs under `specs/` (for each feature folder, `spec.md`, plus `contracts/` and `data-model.md` when the diff touches them). Use `ls` and read-only file reads only. If neither `SPEC.md` nor `specs/` exists, note "no specs found" and go on.
   - Identify which requirement(s) the staged diff touches (cite the id or heading, for example `FR-003` or "User Story 2").
   - Judge each as one of: `matches` (the change implements or preserves the requirement), `diverges` (the change contradicts, exceeds or only partly meets it), or `unspecified` (the change touches behaviour no spec covers).
   - Give a one-line reason for each. Do not edit any spec, and do not change the staged diff to fit it.

4. **Match the repo's style.** Run `git log -n 10 --format=%s` and follow the prevailing subject style (prefix, casing, tense) when there is a clear one. Otherwise use a short imperative subject.

5. **Draft the message.**
   - Subject: imperative, at most 72 characters, no trailing period.
   - Blank line, then a body only if the change needs the *why*. Wrap at about 72 characters. Do not restate the diff line by line.
   - Describe only what is in the staged diff. Do not invent motives or changes.

6. **Estimate the AI share, then ask the user to confirm.** Before showing the final message, propose an AI-share estimate and wait for the user's answer. Do not print the final message until they have confirmed or corrected it.
   - **What counts:** changed source and test lines only. Generated files, lockfiles and formatting-only changes do not count.
   - **Scale** (use only these words, never a percentage): `none`, `some`, `about half`, `most`, `all`.
   - **Label** (from Agent Trace): `human`, `ai`, `mixed`, `unknown`.
   - Propose the scale and label with a one-line reason, for example: `Proposed: about half (mixed: Claude drafted, I edited)`. Then ask the user to confirm or correct it.
   - If you cannot tell who wrote the changes, do not guess. Ask the user. `unknown` is a valid answer; use it when neither you nor the user can tell.
   - Use the user's answer as the final value. If they correct it, use their correction as given (mapped onto the scale words above).

7. **Show it, then stop.** First print a short **Spec check** (requirement touched, status, one-line reason; list any `diverges` first). Then print the draft in a fenced code block, with the footer as the last line of the message (see below), followed by a one-line note listing the staged files it covers. End by telling the user to review and edit it, and that they can run `git commit` themselves, for example `git commit -m "<subject>"` or `git commit` to open the editor. Do not run it for them, and do not ask to run it.

## AI-Share footer

The last line of the message is:

```
AI-Share: <scale> (<label>: <one-line reason>)
```

Separate it from the body (or subject, if there is no body) with a blank line. Use only the scale and label words defined in step 6.

## Output example

```
Add pause and resume to the timer

Keep remaining time when paused so resuming continues the same
session instead of restarting it.

AI-Share: about half (mixed: Claude drafted, I edited)
```

Covers: `src/timer.js`, `src/timer.test.js`

Spec check: FR-002 (pause keeps remaining time) - matches: resume continues from the stored remaining time.