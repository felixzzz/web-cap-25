const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'public', 'img');
const SIZE_LIMIT_BYTES = 100 * 1024; // 100 KB
const MAX_WIDTH = 1600;

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.size < SIZE_LIMIT_BYTES) {
    return;
  }

  const dirName = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const outputPath = path.join(dirName, `${baseName}.webp`);

  console.log(`Processing: ${path.relative(targetDir, filePath)} (${(stat.size / 1024).toFixed(1)} KB)`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let width = metadata.width;
    if (width && width > MAX_WIDTH) {
      width = MAX_WIDTH;
    } else {
      width = undefined; // keep original width
    }

    // Try converting with standard quality 80
    let quality = 80;
    let outputBuffer = await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    // If it's still over 200 KB and we have room to compress, reduce quality
    if (outputBuffer.length > 200 * 1024) {
      quality = 70;
      outputBuffer = await image
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
    }
    if (outputBuffer.length > 200 * 1024) {
      quality = 60;
      outputBuffer = await image
        .clone()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();
    }

    fs.writeFileSync(outputPath, outputBuffer);
    const savedKb = ((stat.size - outputBuffer.length) / 1024).toFixed(1);
    const pct = ((stat.size - outputBuffer.length) / stat.size * 100).toFixed(0);
    console.log(`  -> Saved WebP: ${path.basename(outputPath)} (${(outputBuffer.length / 1024).toFixed(1)} KB) | Saved: ${savedKb} KB (${pct}%)`);
  } catch (error) {
    console.error(`  [ERROR] Failed to convert ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('--- Starting Image Compression and WebP Conversion ---');
  const files = [];
  walkDir(targetDir, (filePath) => {
    files.push(filePath);
  });

  for (const file of files) {
    await compressImage(file);
  }
  console.log('--- Done! ---');
}

main();
