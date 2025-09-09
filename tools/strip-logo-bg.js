// Remove white background from assets/logo01.png while preserving white text inside red area
// Heuristic: make near-white pixels transparent UNLESS they are near red pixels (within radius)

const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

async function main() {
  const input = path.join(__dirname, '..', 'assets', 'logo01.png');
  const backup = path.join(__dirname, '..', 'assets', 'logo01.orig.png');
  const exists = fs.existsSync(input);
  if (!exists) throw new Error('assets/logo01.png not found');
  // Backup once
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(input, backup);
  }

  const image = await Jimp.read(input);
  const { width, height } = image.bitmap;

  const isNearWhite = (r, g, b) => r > 240 && g > 240 && b > 240;
  const isRedish = (r, g, b) => r > 150 && g < 110 && b < 110 && (r - Math.max(g, b)) > 25;

  const radius = 3; // search radius around pixel for red

  // Pre-read pixels to a buffer for neighborhood checks
  const get = (x, y) => {
    const idx = (width * y + x) * 4;
    const { data } = image.bitmap;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]]; // r,g,b,a
  };

  const hasRedNeighbor = (x, y) => {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const [r, g, b, a] = get(nx, ny);
        if (a > 0 && isRedish(r, g, b)) return true;
      }
    }
    return false;
  };

  image.scan(0, 0, width, height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    const a = this.bitmap.data[idx + 3];

    if (a === 0) return; // already transparent

    if (isNearWhite(r, g, b)) {
      // Keep white if it is near red content (likely inner letters)
      if (!hasRedNeighbor(x, y)) {
        // background white -> make transparent
        this.bitmap.data[idx + 3] = 0;
      }
    }
  });

  await image.writeAsync(input);
  console.log('Updated', input);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

