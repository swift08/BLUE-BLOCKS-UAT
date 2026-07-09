/**
 * compress-gallery.js
 *
 * Re-compresses WebP images in src/assets/ and large images in public/
 * using sharp (already a devDependency) to dramatically reduce payload.
 *
 * Targets:
 *   - src/assets/**\/*.webp → max 1200px wide, quality 75, ≤200KB
 *   - public images >200KB → max 1600px wide, quality 80
 *
 * Run: node scripts/compress-gallery.js
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Configuration per directory
const TARGETS = [
  {
    dir: path.join(ROOT, "src", "assets"),
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 75,
    thresholdBytes: 0, // compress ALL in src/assets
    label: "src/assets (gallery images)",
  },
  {
    dir: path.join(ROOT, "public"),
    maxWidth: 1600,
    maxHeight: 1600,
    quality: 80,
    thresholdBytes: 200 * 1024, // only compress if > 200KB in public
    label: "public (hero/banner images)",
    recursive: false, // only root-level public files, sub-dirs handled by name
  },
  {
    dir: path.join(ROOT, "public", "home-01"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/home-01",
  },
  {
    dir: path.join(ROOT, "public", "home"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/home",
  },
  {
    dir: path.join(ROOT, "public", "programs-01"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/programs-01",
  },
  {
    dir: path.join(ROOT, "public", "programs"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/programs",
  },
  {
    dir: path.join(ROOT, "public", "campus"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/campus",
  },
  {
    dir: path.join(ROOT, "public", "campus-01"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/campus-01",
  },
  {
    dir: path.join(ROOT, "public", "about-us"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/about-us",
  },
  {
    dir: path.join(ROOT, "public", "innovation"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/innovation",
  },
  {
    dir: path.join(ROOT, "public", "innovation-01"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/innovation-01",
  },
  {
    dir: path.join(ROOT, "public", "research"),
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    thresholdBytes: 150 * 1024,
    label: "public/research",
  },
  {
    dir: path.join(ROOT, "public", "team"),
    maxWidth: 800,
    maxHeight: 800,
    quality: 82,
    thresholdBytes: 80 * 1024,
    label: "public/team",
  },
];

const IMAGE_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

async function collectFiles(dir, recursive = true) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip toddler directory to avoid locking conflicts
      if (entry.name.toLowerCase() === "toddler") {
        continue;
      }
      if (recursive) {
        const sub = await collectFiles(full, true);
        files.push(...sub);
      }
    } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function compressImage(filePath, maxWidth, maxHeight, quality, thresholdBytes) {
  try {
    const originalBuffer = fs.readFileSync(filePath);
    const originalSize = originalBuffer.length;
    if (originalSize < thresholdBytes) return { skipped: true, originalSize, newSize: originalSize };

    const img = sharp(originalBuffer);
    const meta = await img.metadata();

    // Only resize if image exceeds max dimensions
    const needsResize = meta.width > maxWidth || meta.height > maxHeight;

    const pipeline = needsResize
      ? img.resize(maxWidth, maxHeight, { fit: "inside", withoutEnlargement: true })
      : img;

    // Compress to a buffer (avoids file rename issues with OneDrive)
    const buffer = await pipeline
      .webp({ quality, effort: 5, smartSubsample: true })
      .toBuffer();

    const newSize = buffer.length;

    // Only overwrite if we actually reduced size
    if (newSize < originalSize) {
      // Target path: always .webp
      const targetPath = filePath.replace(/\.(jpg|jpeg|png|webp)$/i, ".webp");

      // Write buffer directly to the target file
      fs.writeFileSync(targetPath, buffer);

      // If original had a different extension, remove it
      if (targetPath !== filePath && fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (_) { /* ignore if locked */ }
      }

      return { skipped: false, originalSize, newSize, saved: originalSize - newSize };
    } else {
      return { skipped: true, reason: "already optimal", originalSize, newSize: originalSize };
    }
  } catch (err) {
    console.error(`  ✗ Error processing ${path.basename(filePath)}: ${err.message}`);
    return { skipped: true, originalSize, newSize: originalSize, error: err.message };
  }
}

async function processTarget(target) {
  const { dir, maxWidth, maxHeight, quality, thresholdBytes, label, recursive = true } = target;
  console.log(`\n📁 Processing: ${label}`);

  const files = await collectFiles(dir, recursive);
  if (files.length === 0) {
    console.log("   No images found.");
    return { processed: 0, skipped: 0, totalSaved: 0 };
  }

  let processed = 0;
  let skipped = 0;
  let totalSaved = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const result = await compressImage(file, maxWidth, maxHeight, quality, thresholdBytes);

    if (result.skipped) {
      skipped++;
    } else {
      processed++;
      totalSaved += result.saved;
      const savedKB = (result.saved / 1024).toFixed(0);
      const fromKB = (result.originalSize / 1024).toFixed(0);
      const toKB = (result.newSize / 1024).toFixed(0);
      console.log(`  ✓ ${path.basename(file)}: ${fromKB}KB → ${toKB}KB (saved ${savedKB}KB)`);
    }
  }

  const totalSavedMB = (totalSaved / 1024 / 1024).toFixed(2);
  console.log(`   → ${processed} compressed, ${skipped} skipped, ${totalSavedMB}MB saved`);
  return { processed, skipped, totalSaved };
}

async function main() {
  console.log("🚀 BlueBlocks Image Compression");
  console.log("================================\n");

  let grandTotalSaved = 0;
  let grandProcessed = 0;

  for (const target of TARGETS) {
    const result = await processTarget(target);
    grandTotalSaved += result.totalSaved;
    grandProcessed += result.processed;
  }

  const totalMB = (grandTotalSaved / 1024 / 1024).toFixed(2);
  console.log(`\n✅ Done. Total: ${grandProcessed} images compressed, ${totalMB}MB saved.`);
  console.log("\n⚠️  Remember to delete the .next and out directories before next build.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
