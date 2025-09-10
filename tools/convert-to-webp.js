// Convert PNG images in assets/ to WebP
// Usage: node tools/convert-to-webp.js

const fs = require('node:fs').promises;
const path = require('node:path');
const sharp = require('sharp');

const ASSETS_DIR = path.resolve(process.cwd(), 'assets');
const targets = ['image01.png', 'image02.png', 'image03.png', 'image04.png'];

async function main() {
  try {
    await fs.access(ASSETS_DIR);
  } catch {
    console.error('Missing assets directory:', ASSETS_DIR);
    process.exit(1);
  }

  for (const file of targets) {
    const input = path.join(ASSETS_DIR, file);
    const output = input.replace(/\.png$/i, '.webp');
    try {
      await fs.access(input);
    } catch {
      console.warn('Skip (missing):', input);
      continue;
    }
    console.log('Converting ->', path.basename(output));
    await sharp(input).webp({ quality: 82 }).toFile(output);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
