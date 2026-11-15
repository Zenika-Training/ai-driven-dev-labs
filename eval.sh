#!/usr/bin/env bash
# eval.sh: the smallest useful eval (Chapter 6, demo "Compare two setups on one task" and mini-lab M6.2).
#
#   ./eval.sh <run-id> <ref>      one graded run of the task on <ref> (a branch, tag or HEAD)
#   ./eval.sh clean               remove the worktrees and logs of all runs
#
# Example:  ./eval.sh a1 HEAD    ./eval.sh b1 adv-claude/chp-6/m6-2-setup-b
#
# What one run does:
#   1. makes a fresh worktree of <ref> in ../eval-worktrees/<run-id> (your own checkout is never touched)
#   2. runs `npm ci` in brownfield-frontend there
#   3. runs `claude -p` with the task prompt (headless: it costs tokens, a few minutes per run)
#   4. runs three code graders and prints one line: PASS or FAIL for each
#
# Graders (plain shell, no AI):
#   tests   : `npm test` in brownfield-frontend exits 0
#   scope   : every changed or new file is inside ALLOWED (brownfield-frontend/src/pet/)
#   untouched: `git diff` on brownfield-frontend/tests is empty (existing tests not edited)
#
# Logs and the diff of each run: ../eval-worktrees/logs/<run-id>/

set -u

ALLOWED="brownfield-frontend/src/pet/"
TEST_DIR="brownfield-frontend/tests"
PROMPT='On the pet list screen of the frontend, show the number of pets above the list, for example "5 pets". Keep the change small. Run the frontend tests when you are done.'
BUDGET_USD="${EVAL_BUDGET_USD:-3}"   # per-run spending cap for the headless session

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "Run this from inside the pet clinic repo." >&2; exit 2; }
BASE="$(dirname "$ROOT")/eval-worktrees"
LOGS="$BASE/logs"

if [ "${1:-}" = "clean" ]; then
  for wt in "$BASE"/*/; do
    [ -d "$wt" ] || continue
    [ "$(basename "$wt")" = "logs" ] && continue
    git -C "$ROOT" worktree remove --force "$wt" && echo "removed $wt"
  done
  rm -rf "$LOGS"
  rmdir "$BASE" 2>/dev/null
  git -C "$ROOT" worktree prune
  exit 0
fi

ID="${1:-}"; REF="${2:-}"
if [ -z "$ID" ] || [ -z "$REF" ]; then
  echo "Usage: ./eval.sh <run-id> <ref>   |   ./eval.sh clean" >&2
  exit 2
fi
command -v claude >/dev/null || { echo "claude CLI not found." >&2; exit 2; }
git -C "$ROOT" rev-parse --verify --quiet "$REF^{commit}" >/dev/null || { echo "Unknown ref: $REF" >&2; exit 2; }

WT="$BASE/$ID"
RUNLOG="$LOGS/$ID"
[ -e "$WT" ] && { echo "$WT already exists. Pick another run id or run ./eval.sh clean." >&2; exit 2; }
mkdir -p "$RUNLOG"

# 1. fresh worktree, detached so the same branch can be used by several runs
git -C "$ROOT" worktree add --detach "$WT" "$REF" >"$RUNLOG/worktree.log" 2>&1 || { cat "$RUNLOG/worktree.log" >&2; exit 2; }

# 2. dependencies
echo "[$ID] npm ci ..."
( cd "$WT/brownfield-frontend" && npm ci --no-audit --no-fund >"$RUNLOG/npm-ci.log" 2>&1 ) || { echo "[$ID] npm ci failed, see $RUNLOG/npm-ci.log" >&2; exit 2; }

# 3. the headless run (edits allowed, a short list of commands allowed, nothing else)
echo "[$ID] claude -p on $REF (a few minutes) ..."
( cd "$WT" && claude -p "$PROMPT" \
    --permission-mode acceptEdits \
    --allowedTools "Read" "Edit" "Write" "Glob" "Grep" \
      "Bash(npm test:*)" "Bash(npm run lint:*)" "Bash(git diff:*)" "Bash(git status:*)" \
    --max-budget-usd "$BUDGET_USD" \
    --no-session-persistence \
    >"$RUNLOG/claude.log" 2>&1 )
echo "[$ID] claude exit code: $? (see $RUNLOG/claude.log)"

cd "$WT" || exit 2

# what changed, tracked or new, ignoring node_modules and dist (they are git-ignored)
CHANGED="$( { git diff --name-only; git ls-files --others --exclude-standard; } | sort -u )"
{ git diff; git ls-files --others --exclude-standard | sed 's/^/NEW FILE: /'; } >"$RUNLOG/changes.diff"

# 4. graders
# tests
if ( cd brownfield-frontend && npm test >"$RUNLOG/npm-test.log" 2>&1 ); then T=PASS; else T=FAIL; fi

# scope: nothing changed outside ALLOWED
OUTSIDE="$(printf '%s\n' "$CHANGED" | grep -v '^$' | grep -v "^$ALLOWED" || true)"
if [ -z "$OUTSIDE" ]; then S=PASS; else S=FAIL; fi

# untouched: existing test files not edited
if git diff --quiet -- "$TEST_DIR"; then U=PASS; else U=FAIL; fi

NOTE=""
[ -z "$CHANGED" ] && NOTE="  (warning: Claude changed no file, read $RUNLOG/claude.log)"
[ -n "$OUTSIDE" ] && printf '%s\n' "$OUTSIDE" | sed 's/^/  outside scope: /'

echo "$ID | ref $REF | tests $T | scope $S | untouched $U$NOTE"
[ "$T$S$U" = "PASSPASSPASS" ]
