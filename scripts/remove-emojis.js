#!/usr/bin/env node

/**
 * Remove Emojis Script
 *
 * Batch removes emojis from all lab content files while preserving
 * code functionality and text content.
 */

const fs = require('fs');
const path = require('path');

// Comprehensive emoji regex pattern - matches emoji characters
// This regex matches emoji presentation sequences and variation selectors
const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{231A}\u{231B}\u{2328}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2934}\u{2935}\u{2B05}-\u{2B07}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}][\u{FE00}-\u{FE0F}]?/gu;

/**
 * Remove emojis from a string while preserving formatting
 */
function removeEmojis(text) {
  if (!text) return text;

  // Split into lines to preserve formatting
  const lines = text.split('\n');

  // Process each line
  const cleaned = lines.map(line => {
    // Remove emojis from this line
    let cleanLine = line.replace(EMOJI_REGEX, '');

    // Clean up multiple spaces but preserve single spaces
    cleanLine = cleanLine.replace(/ {2,}/g, ' ');

    // Trim trailing spaces but keep leading spaces (indentation)
    const leadingSpaces = line.match(/^\s*/)[0];
    cleanLine = leadingSpaces + cleanLine.trim();

    return cleanLine;
  });

  // Rejoin with newlines
  return cleaned.join('\n');
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = removeEmojis(content);

    // Only write if content changed
    if (content !== cleaned) {
      fs.writeFileSync(filePath, cleaned, 'utf8');
      console.log(`✓ Cleaned: ${path.relative(process.cwd(), filePath)}`);
      return true;
    } else {
      console.log(`- No emojis: ${path.relative(process.cwd(), filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Recursively find all files in directory matching extensions
 */
function findFiles(dir, extensions = ['.tsx', '.mdx', '.ts', '.md']) {
  const files = [];

  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules and .next
        if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
          traverse(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * Main execution
 */
function main() {
  const contentDir = path.join(process.cwd(), 'content', 'labs');

  console.log('🧹 Starting emoji removal process...\n');
  console.log(`Scanning: ${contentDir}\n`);

  if (!fs.existsSync(contentDir)) {
    console.error('Error: content/labs directory not found!');
    process.exit(1);
  }

  // Find all content files
  const files = findFiles(contentDir);
  console.log(`Found ${files.length} files to process\n`);

  // Process each file
  let processedCount = 0;
  let changedCount = 0;

  for (const file of files) {
    const changed = processFile(file);
    processedCount++;
    if (changed) changedCount++;
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\nCompleted!`);
  console.log(`- Processed: ${processedCount} files`);
  console.log(`- Modified: ${changedCount} files`);
  console.log(`- Unchanged: ${processedCount - changedCount} files\n`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { removeEmojis, processFile, findFiles };
