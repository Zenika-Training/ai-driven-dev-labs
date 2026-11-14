# Doc Tracker

A Spec Kit extension with one command, `speckit.doc-tracker.commit`. It reads your staged changes, drafts a commit message and shows it to you. It never runs `git commit`.

## Install (local development)

```bash
specify extension add --dev extensions/doc-tracker
specify extension list
```

Remove with `specify extension remove doc-tracker`.

## Usage

Stage your changes, then run the command from your agent:

```
git add <files>
/speckit-doc-tracker-commit [optional hints, e.g. a ticket id]
```

The command only runs read-only git commands (`git diff --cached`, `git log`). It prints a draft message and leaves committing to you.

## Requirements

- Spec Kit >= 0.1.0
- git

## License

MIT
