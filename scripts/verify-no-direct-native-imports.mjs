import { execSync } from 'child_process';

const FORBIDDEN = [
  'expo-live-activity',
  'expo-notifications',
  'expo-updates',
  'expo-local-authentication'
];

for (const lib of FORBIDDEN) {
  const result = execSync(
    `grep -R "${lib}" client | grep -v "/native/" || true`,
    { encoding: 'utf8' }
  ).trim();

  if (result) {
    console.error(`❌ Direct native import detected for "${lib}":`);
    console.error(result);
    process.exit(1);
  }
}

console.log('✅ No direct native imports detected');
