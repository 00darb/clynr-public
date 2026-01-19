import fs from "fs";
import path from "path";
import child_process from "child_process";

/**
 * Increment a semver string (patch only)
 */
function bumpPatch(version) {
  const [major, minor, patch] = version.split(".").map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

/**
 * Load app.config.ts as text (not executing it)
 */
const appConfigPath = path.resolve("app.config.ts");
const pkgPath = path.resolve("package.json");

if (!fs.existsSync(appConfigPath)) {
  console.error("❌ app.config.ts not found");
  process.exit(1);
}

if (!fs.existsSync(pkgPath)) {
  console.error("❌ package.json not found");
  process.exit(1);
}

const appConfigText = fs.readFileSync(appConfigPath, "utf8");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const runtimeMatch = appConfigText.match(/runtimeVersion:\s*["']([\d.]+)["']/);

if (!runtimeMatch) {
  console.error("❌ Could not find runtimeVersion in app.config.ts");
  process.exit(1);
}

const currentRuntime = runtimeMatch[1];
const nextRuntime = bumpPatch(currentRuntime);

console.log(`🔼 Bumping runtimeVersion ${currentRuntime} → ${nextRuntime}`);

/**
 * Update app.config.ts
 */
const updatedAppConfig = appConfigText.replace(
  /runtimeVersion:\s*["'][\d.]+["']/,
  `runtimeVersion: "${nextRuntime}"`
);

fs.writeFileSync(appConfigPath, updatedAppConfig);

/**
 * Update package.json version
 */
pkg.version = nextRuntime;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

/**
 * Git commit (best effort)
 */
try {
  child_process.execSync("git add app.config.ts package.json", { stdio: "inherit" });
  child_process.execSync(
    `git commit -m "chore: bump runtimeVersion to ${nextRuntime}"`,
    { stdio: "inherit" }
  );
} catch {
  console.warn("⚠️ Git commit skipped (not a git repo or commit failed)");
}

console.log("✅ Runtime bump complete");
