import fs from 'fs';
import path from 'path';

const root = process.cwd();
const contractsDir = path.join(root, 'shared/api-contracts');

if (!fs.existsSync(contractsDir)) {
  console.error('❌ Missing shared/api-contracts directory');
  process.exit(1);
}

const files = fs.readdirSync(contractsDir).filter(f =>
  f.endsWith('.contract.ts')
);

if (files.length === 0) {
  console.error('❌ No API contract files found in shared/api-contracts');
  process.exit(1);
}

console.log('✅ API contracts verified');
