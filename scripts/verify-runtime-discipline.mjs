import fs from "node:fs";
import path from "node:path";

function fail(message) {
  console.error(`❌ verify:runtime failed — ${message}`);
  process.exit(1);
}

const configPath = path.resolve(process.cwd(), "app.config.ts");

if (!fs.existsSync(configPath)) {
  fail("app.config.ts not found");
}

const source = fs.readFileSync(configPath, "utf8");

// Block runtimeVersion policies (bare workflow rule)
if (/runtimeVersion\s*:\s*{\s*policy\s*:/.test(source)) {
  fail(
    "runtimeVersion must be a string. Policies like { policy: 'appVersion' } are not allowed in bare workflow."
  );
}

// Require explicit string runtimeVersion
if (!/runtimeVersion\s*:\s*['"`]/.test(source)) {
  fail("runtimeVersion must be explicitly defined as a string");
}

console.log("✅ verify:runtime passed");