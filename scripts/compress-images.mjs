// Compresses every PNG in public/images/ to a much smaller PNG using sharp.
// Skips logo.png (already small + transparent).
// Run: node scripts/compress-images.mjs
import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const IMG_DIR = "public/images";
const SKIP = new Set(["logo.png"]);
const MAX_WIDTH_HERO = 1920;
const MAX_WIDTH_GALLERY = 1600;
const QUALITY = 80;

const heroFile = "hero.png";

const files = readdirSync(IMG_DIR)
  .filter((f) => /\.(png|jpg|jpeg)$/i.test(f))
  .filter((f) => !SKIP.has(f));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const inPath = join(IMG_DIR, file);
  const tmpPath = inPath + ".tmp";
  const beforeSize = statSync(inPath).size;
  const maxWidth = file === heroFile ? MAX_WIDTH_HERO : MAX_WIDTH_GALLERY;

  await sharp(inPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .png({ quality: QUALITY, compressionLevel: 9, palette: true })
    .toFile(tmpPath);

  const afterSize = statSync(tmpPath).size;
  // Only replace if smaller
  if (afterSize < beforeSize) {
    unlinkSync(inPath);
    renameSync(tmpPath, inPath);
  } else {
    unlinkSync(tmpPath);
  }

  totalBefore += beforeSize;
  totalAfter += statSync(inPath).size;

  const beforeKB = (beforeSize / 1024).toFixed(0);
  const afterKB = (statSync(inPath).size / 1024).toFixed(0);
  const saved = ((1 - statSync(inPath).size / beforeSize) * 100).toFixed(0);
  console.log(`${file.padEnd(22)}  ${beforeKB.padStart(5)}KB → ${afterKB.padStart(5)}KB  (-${saved}%)`);
}

const totalSavedPct = ((1 - totalAfter / totalBefore) * 100).toFixed(0);
console.log("---");
console.log(`TOTAL: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (-${totalSavedPct}%)`);
