const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIR = path.join(__dirname, '..', 'src', 'assets', 'toddler');

async function compressImage(filePath) {
  try {
    const originalBuffer = fs.readFileSync(filePath);
    const originalSize = originalBuffer.length;

    // Load file from buffer to check dimensions
    const image = sharp(originalBuffer);
    const metadata = await image.metadata();

    let pipeline = sharp(originalBuffer);

    // Resize if dimensions are overly large (max width/height of 1200px)
    if (metadata.width > 1200 || metadata.height > 1200) {
      pipeline = pipeline.resize({
        width: metadata.width >= metadata.height ? 1200 : undefined,
        height: metadata.height > metadata.width ? 1200 : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to webp with compression settings
    const buffer = await pipeline
      .webp({ quality: 80, effort: 4 })
      .toBuffer();

    // Write back if compressed size is smaller
    if (buffer.length < originalSize) {
      fs.writeFileSync(filePath, buffer);
      const savedKB = ((originalSize - buffer.length) / 1024).toFixed(2);
      const originalKB = (originalSize / 1024).toFixed(2);
      const newKB = (buffer.length / 1024).toFixed(2);
      console.log(`✓ Optimized ${path.basename(filePath)}: ${originalKB}KB -> ${newKB}KB (Saved ${savedKB}KB)`);
    } else {
      console.log(`- Skipped ${path.basename(filePath)} (Already optimized)`);
    }
  } catch (err) {
    console.error(`✗ Failed to compress ${path.basename(filePath)}:`, err.message);
  }
}

async function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`Target directory not found: ${TARGET_DIR}`);
    process.exit(1);
  }

  console.log(`Scanning WebP assets in: ${TARGET_DIR}`);
  const files = fs.readdirSync(TARGET_DIR)
    .filter(file => file.toLowerCase().endsWith('.webp') && !file.includes('.tmp'));

  console.log(`Found ${files.length} WebP files to optimize...`);
  
  for (const file of files) {
    const fullPath = path.join(TARGET_DIR, file);
    await compressImage(fullPath);
  }

  console.log('\nCompression run completed successfully.');
}

main().catch(err => {
  console.error('Fatal error running compression:', err);
  process.exit(1);
});
