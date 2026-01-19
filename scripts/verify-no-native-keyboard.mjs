import { readFileSync } from "fs";
import { execSync } from "child_process";

const output = execSync(
  'grep -R "keyboard-controller\\|KeyboardProvider" client || true'
).toString();

if (output.trim()) {
  console.error("❌ Native keyboard usage detected:");
  console.error(output);
  process.exit(1);
}

console.log("✅ No native keyboard usage detected");
