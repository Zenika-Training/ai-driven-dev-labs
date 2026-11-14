# Hook probe (Lab 1.2)

## What was added
- `.claude/settings.json`: a `SessionStart` hook and a `PreToolUse` hook with matcher `Bash`.
- `.claude/hooks/welcome.js`: prints one JSON object with a `systemMessage`.
- `.claude/hooks/block-rm.js`: reads the event JSON from stdin; if `tool_input.command` contains `"rm "`, writes a reason to stderr and exits 2; otherwise exits 0.
- Project only. No global settings were changed.

## Script test without Claude
| Input command | Output | Exit |
|---|---|---|
| `ls` | nothing | 0 |
| `rm x` | "Blocked by the pet-clinic training hook: commands containing 'rm ' are not allowed in this project." | 2 |

## Hook in a real session (headless run of Claude)
| Request | Result |
|---|---|
| New session | `SessionStart` hook ran: "Welcome to the pet clinic!" |
| Read `.lab-hook-probe.txt` | Allowed (read uses another tool, the hook only watches Bash) |
| Delete it with the shell command | Refused with the hook's reason; the probe file stayed on disk |

## Instruction versus hook
I added the sentence "Never use rm in this repository" to `CLAUDE.md` and asked which command Claude would use to delete the probe, without running it. Claude answered with `git clean -f -- .lab-hook-probe.txt` and said it avoided the forbidden command because of the instruction.
- A sentence in `CLAUDE.md` is read by the model. It is followed because the model chooses to, and it steers the model toward another command (here one the hook does not match).
- A hook is run by the harness on an event, whatever the model intends. It refuses exactly what it matches (any Bash command containing the text `rm `) and nothing else. It can be bypassed by a command it does not match, so it is a demonstration, not a security boundary.
- Side effect found: the hook checks the whole command text, so even a harmless command that only mentions `rm ` in an argument (an `echo` carrying a test payload) is refused.

## State on this branch
The hooks and the `CLAUDE.md` sentence are kept on branch `adv-claude/chp-1/lab-1-2` so the configuration can be shown and run. The next branch removes them first.
