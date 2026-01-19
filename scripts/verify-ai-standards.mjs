import fs from "fs"
import path from "path"

const REQUIRED_FILES = [
  "README_AI.md",
  "docs/ENGINEERING_STANDARD.md",
  "docs/engineering_rules.yaml",
  "ai/ROLE.md",
  "ai/REVIEW_PROTOCOL.md",
  "shared/api-contracts/README.md"
]

const root = process.cwd()

const missingFiles = REQUIRED_FILES.filter(file =>
  !fs.existsSync(path.join(root, file))
)

if (missingFiles.length > 0) {
  console.error("\n❌ STANDARDS VERIFICATION FAILED\n")
  missingFiles.forEach(f => console.error(`- ${f}`))
  process.exit(1)
}

/* ---- API CONTRACT ENFORCEMENT ---- */

const contractsDir = path.join(root, "shared/api-contracts")
const contractFiles = fs.readdirSync(contractsDir).filter(f => f.endsWith(".ts"))

if (!contractFiles.length) {
  console.error("\n❌ NO API CONTRACT FILES FOUND\n")
  process.exit(1)
}

/* ---- AI REVIEW ARTEFACT ENFORCEMENT ---- */

const reviewsDir = path.join(root, "ai/reviews")

if (!fs.existsSync(reviewsDir)) {
  console.error("\n❌ AI REVIEWS DIRECTORY MISSING\n")
  console.error("Expected: ai/reviews/\n")
  process.exit(1)
}

const reviewFiles = fs
  .readdirSync(reviewsDir)
  .filter(f => f.endsWith(".md") && f !== "REVIEW_TEMPLATE.md")

if (!reviewFiles.length) {
  console.error("\n❌ NO AI REVIEW ARTEFACT FOUND\n")
  console.error("Add an approved review file in ai/reviews/\n")
  process.exit(1)
}

const approved = reviewFiles.some(file => {
  const content = fs.readFileSync(path.join(reviewsDir, file), "utf8")
  return /Approved:\s*YES/i.test(content)
})

if (!approved) {
  console.error("\n❌ NO APPROVED AI REVIEW FOUND\n")
  console.error("At least one review must contain: Approved: YES\n")
  process.exit(1)
}

console.log("✅ Standards, contracts, and AI review artefacts verified")
