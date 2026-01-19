import fs from 'fs';
import path from 'path';

const reviewsDir = path.join(process.cwd(), 'ai/reviews');

if (!fs.existsSync(reviewsDir)) {
  console.error('❌ Missing ai/reviews directory');
  process.exit(1);
}

const reviews = fs.readdirSync(reviewsDir).filter(f =>
  f.endsWith('.md')
);

if (reviews.length === 0) {
  console.error('❌ No AI review artefacts found in ai/reviews');
  process.exit(1);
}

console.log('✅ AI review artefacts verified');
