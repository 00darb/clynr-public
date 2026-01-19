import fs from "fs";

const badPatterns = [
  "localhost:5000",
  "127.0.0.1",
  "Constants.expoConfig.extra.apiUrl",
];

const files = fs
  .readdirSync("client", { recursive: true })
  .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

let failed = false;

for (const file of files) {
  const content = fs.readFileSync(`client/${file}`, "utf8");
  for (const pattern of badPatterns) {
    if (content.includes(pattern)) {
      console.error(`❌ Forbidden API pattern "${pattern}" in ${file}`);
      failed = true;
    }
  }
}

if (failed) {
  console.error("\n❌ API environment discipline violated");
  process.exit(1);
}

console.log("✅ API environment discipline verified");
