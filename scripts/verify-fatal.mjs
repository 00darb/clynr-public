import fs from "fs";
import path from "path";

const CHECKLIST = "ai/VERIFY_FATAL_CHECKLIST.md";
const BEACON_STRINGS = ["BOOT BEACON", "markRuntimeReady"];

let ok = true;

if (!fs.existsSync(CHECKLIST)) {
  console.error("❌ Missing ai/VERIFY_FATAL_CHECKLIST.md");
  ok = false;
}

function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (scan(p)) return true;
    } else if (entry.isFile() && /\.(ts|tsx|js)$/.test(entry.name)) {
      const content = fs.readFileSync(p, "utf8");
      if (BEACON_STRINGS.some(s => content.includes(s))) return true;
    }
  }
  return false;
}

if (!scan(".")) {
  console.error("❌ No boot beacon found (BOOT BEACON / markRuntimeReady)");
  ok = false;
}

if (!ok) {
  console.error("❌ verify:fatal FAILED");
  process.exit(1);
}

console.log("✅ verify:fatal passed");
