# Demo M7.1: make Claude Code read a shared AGENTS.md

About 8 minutes. Run it in the pet clinic repo root, on a clean working tree.

**Before you start:** `git status` is empty, `CLAUDE.md` exists, `AGENTS.md` does not. Close any open `claude` session: each step below needs a fresh one.

**How it was checked:** the dry run on 2026-11-15 used `claude -p` (one headless call = one new session), in a scratch copy of branch `adv-claude/chp-7/lab-7-1`. The expected outputs below come from those runs. The interactive screen was not run: its layout may differ from the tables below (to verify). Wording of Claude's answers changes from run to run; what to look for is stated for each step.

---

## a. Show what Claude loads at the start (1 min)

**Type:**
```
claude
/context
```

**Expect:** a "Memory Files" section. It lists your user `CLAUDE.md` (about 96 tokens) and the project `CLAUDE.md` (about 488 tokens). There is no `AGENTS.md`.

**Say:** "Claude Code reads CLAUDE.md at the start of every session. It does not read AGENTS.md."

Exit with `/exit`.

---

## b. Create AGENTS.md (30 s)

**Type** (in a normal terminal):
```bash
echo 'Name test methods should_<result>_when_<condition>' > AGENTS.md
git status --short
```

**Expect:** `?? AGENTS.md`

**Say:** "One rule, in the file other tools such as Copilot and Codex read."

---

## c. New session: the rule is not loaded (2 min)

**Type:**
```
claude
/context
```
then, in the same session:
```
Which rules apply to test names in this repository? Answer only from what you already know, do not read or search any file.
```

**Expect:**
- `/context` still lists only the two `CLAUDE.md` files, no `AGENTS.md`. This is the evidence.
- Claude says it cannot give the rules without reading files, and points to `docs/tech/architecture-*.md`. It does not mention `should_<result>_when_<condition>`.

**Say:** "Same file, same repo, and Claude does not know the rule. The context list is the proof."

**Optional, 30 s:** ask the plain question, without the last sentence: `Which rules apply to test names in this repository?` In the dry run Claude searched the repo, found `AGENTS.md`, and quoted the rule, but also said "CLAUDE.md doesn't reference it". So a good answer alone proves nothing: it found the file by searching, it was not loaded. Use this only if someone asks "but it answered".

Exit with `/exit`.

---

## d. Import it from CLAUDE.md (3 min)

**Type** (normal terminal; this puts `@AGENTS.md` on a new first line):
```bash
sed -i '' '1i\
@AGENTS.md
' CLAUDE.md
head -3 CLAUDE.md
```
(on Linux: `sed -i '1i @AGENTS.md' CLAUDE.md`)

**Expect:** the first line is `@AGENTS.md`, followed by `# CLAUDE.md`.

**Type:**
```
claude
/context
```
then:
```
Which rules apply to test names in this repository? Answer only from what you already know, do not read or search any file.
```

**Expect:**
- `/context` now lists `AGENTS.md` (about 25 tokens) as a Project memory file, after `CLAUDE.md` (about 497 tokens).
- Claude quotes the rule "Name test methods should_<result>_when_<condition>" and says it comes from `AGENTS.md`, imported with `@AGENTS.md`. It may add that it has not read the architecture docs.

**Say:** "One line, and the shared file is loaded. Keep the team rules in AGENTS.md, import it from CLAUDE.md, and both tools read the same text."

Exit with `/exit`.

---

## e. Clean up (30 s)

**Type:**
```bash
git restore CLAUDE.md
rm AGENTS.md
git status --short
```

**Expect:** no output (clean tree).

**Say:** "Back to where we started."

---

## Notes for the trainer

- The prompt "Answer only from what you already know, do not read or search any file" is a small addition to the lab text. Without it Claude can find `AGENTS.md` by searching, and steps c and d look the same. The lab guide already warns about this.
- The model refuses to read files only because the prompt says so. If it reads one anyway in step c, repeat with `claude --disallowedTools Read Grep Glob Bash` (tested in the dry run: it forces the answer from loaded context).
- Token counts depend on your own user `CLAUDE.md`; only the presence of `AGENTS.md` in the list matters.
- This repo's `CLAUDE.md` contains an unrelated line about a monkey. Claude may mention it. Ignore it.
