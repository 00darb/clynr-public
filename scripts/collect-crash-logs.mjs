import fs from "fs";
import path from "path";

const OUT_DIR = "ai/crash-logs";
fs.mkdirSync(OUT_DIR, { recursive: true });

function write(name, content) {
  fs.writeFileSync(path.join(OUT_DIR, name), content);
}

write("README.md", `
Crash Logs Directory

Attach:
- iOS device logs
- Android logcat output
- Expo dev client logs
- Stack traces

Each incident gets its own folder.
`);

console.log("✅ Crash log directory ready at ai/crash-logs/");
