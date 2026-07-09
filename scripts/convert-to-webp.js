const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const SCAN_DIRS = [
  path.join(__dirname, '..', 'src'),
  path.join(__dirname, '..', 'public')
];

// Target extensions to convert
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.png', '.jpg', '.jpeg'];

// Files and directories to ignore during code replacement
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'out', 'scripts'];
const IGNORE_FILES = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

// Recursively get files under a directory
function getFilesRecursive(dir, allowedExtensions = null, excludeDirs = []) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (excludeDirs.includes(file)) continue;
      results = results.concat(getFilesRecursive(filePath, allowedExtensions, excludeDirs));
    } else {
      if (allowedExtensions) {
        const ext = path.extname(file).toLowerCase();
        if (allowedExtensions.includes(ext)) {
          results.push(filePath);
        }
      } else {
        results.push(filePath);
      }
    }
  }
  return results;
}

// Convert image to webp
async function convertImage(filePath) {
  const ext = path.extname(filePath);
  const dirName = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const webpPath = path.join(dirName, `${baseName}.webp`);

  try {
    const originalBuffer = fs.readFileSync(filePath);
    const originalSize = originalBuffer.length;

    let pipeline = sharp(originalBuffer);
    const metadata = await pipeline.metadata();

    // Resize if dimensions are overly large (max width/height of 1600px)
    let resized = false;
    if (metadata.width > 1600 || metadata.height > 1600) {
      pipeline = pipeline.resize({
        width: metadata.width >= metadata.height ? 1600 : undefined,
        height: metadata.height > metadata.width ? 1600 : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
      resized = true;
    }

    // Convert to webp
    const buffer = await pipeline
      .webp({ quality: 80, effort: 4 })
      .toBuffer();

    // Write webp file
    fs.writeFileSync(webpPath, buffer);

    // Verify written file is readable and non-empty
    if (fs.existsSync(webpPath) && fs.statSync(webpPath).size > 0) {
      // Delete original file
      fs.unlinkSync(filePath);

      const savedBytes = originalSize - buffer.length;
      const originalKB = (originalSize / 1024).toFixed(2);
      const newKB = (buffer.length / 1024).toFixed(2);
      
      console.log(`✓ Converted ${baseName}${ext} -> ${baseName}.webp ${resized ? '(Resized)' : ''}`);
      console.log(`  Size: ${originalKB}KB -> ${newKB}KB (Saved ${(savedBytes / 1024).toFixed(2)}KB)`);
      
      return {
        success: true,
        originalPath: filePath,
        webpPath: webpPath,
        baseName: baseName,
        oldExt: ext,
        savedBytes: savedBytes
      };
    } else {
      throw new Error("Created WebP file was empty or not found.");
    }
  } catch (err) {
    console.error(`✗ Failed to convert ${path.basename(filePath)}:`, err.message);
    return { success: false, filePath: filePath, error: err.message };
  }
}

// Update references in code files
function updateCodeReferences(conversions) {
  console.log('\n--- Scanning codebase for references to replace ---');
  
  // Get all code files to check
  let codeFiles = [];
  const rootDir = path.join(__dirname, '..');
  
  // Scan directories for code files
  const rootFiles = fs.readdirSync(rootDir);
  for (const file of rootFiles) {
    const fullPath = path.join(rootDir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (IGNORE_DIRS.includes(file)) continue;
      codeFiles = codeFiles.concat(getFilesRecursive(fullPath, null, IGNORE_DIRS));
    } else {
      if (IGNORE_FILES.includes(file)) continue;
      const ext = path.extname(file).toLowerCase();
      if (['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.html', '.mjs'].includes(ext)) {
        codeFiles.push(fullPath);
      }
    }
  }

  console.log(`Found ${codeFiles.length} code/config files to scan.`);
  
  let referenceUpdatesCount = 0;
  
  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    
    for (const conv of conversions) {
      if (!conv.success) continue;
      
      // Escape special characters in baseName for RegExp
      const escapedBaseName = conv.baseName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Create a regex to match filename with old extension, case insensitive
      // We want to match: baseName.oldExt (e.g. Header Image.png or Header Image.PNG)
      const escapedExt = conv.oldExt.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const fileRegex = new RegExp(`${escapedBaseName}${escapedExt}`, 'gi');
      
      if (fileRegex.test(content)) {
        // Reset regex index and do replacement
        fileRegex.lastIndex = 0;
        content = content.replace(fileRegex, `${conv.baseName}.webp`);
        updated = true;
        referenceUpdatesCount++;
        console.log(`  Replacing references to "${conv.baseName}${conv.oldExt}" in ${path.relative(rootDir, file)}`);
      }
    }
    
    if (updated) {
      fs.writeFileSync(file, content, 'utf8');
    }
  }
  
  console.log(`\nUpdated ${referenceUpdatesCount} references in code files.`);
}

async function main() {
  console.log('--- Scanning image directories ---');
  let imageFiles = [];
  for (const dir of SCAN_DIRS) {
    console.log(`Scanning: ${dir}`);
    const files = getFilesRecursive(dir, IMAGE_EXTENSIONS, IGNORE_DIRS);
    imageFiles = imageFiles.concat(files);
  }
  
  // Remove duplicates just in case
  imageFiles = [...new Set(imageFiles)];
  
  console.log(`Found ${imageFiles.length} image files matching JPEG/PNG extensions.`);
  
  if (imageFiles.length === 0) {
    console.log('No JPEG/PNG files found for conversion.');
    return;
  }
  
  const conversions = [];
  let totalSavedBytes = 0;
  
  for (const file of imageFiles) {
    // Skip file names with .tmp
    if (file.includes('.tmp')) continue;
    
    const result = await convertImage(file);
    conversions.push(result);
    if (result.success) {
      totalSavedBytes += result.savedBytes;
    }
  }
  
  const successfulConversions = conversions.filter(c => c.success);
  console.log(`\nSuccessfully converted ${successfulConversions.length} of ${imageFiles.length} files.`);
  console.log(`Total storage space saved: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB`);
  
  if (successfulConversions.length > 0) {
    updateCodeReferences(successfulConversions);
  }
}

main().catch(err => {
  console.error('Fatal error running conversion:', err);
  process.exit(1);
});
