// PreToolUse hook (matcher: Bash).
// Reads the hook event JSON from stdin. If tool_input.command contains "rm ",
// writes a reason to stderr and exits with code 2 (the harness refuses the call).
// Otherwise exits 0. A demonstration, not a security boundary.
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let command = "";
  try {
    command = (JSON.parse(input).tool_input || {}).command || "";
  } catch (e) {
    process.exit(0); // unreadable event: do not block
  }
  if (command.includes("rm ")) {
    process.stderr.write(
      "Blocked by the pet-clinic training hook: commands containing 'rm ' are not allowed in this project.\n"
    );
    process.exit(2);
  }
  process.exit(0);
});
