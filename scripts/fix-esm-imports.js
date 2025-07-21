import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { dirname, relative, resolve } from 'path';

const targetDir = process.argv[2];

if (!targetDir) {
  console.log('❌ Usage: node fix-esm-imports.js <target-directory>');
  process.exit(1);
}

const resolvedTargetDir = resolve(targetDir);

if (!existsSync(resolvedTargetDir)) {
  console.log(`⚠️  Target directory ${resolvedTargetDir} does not exist, creating it...`);
  try {
    mkdirSync(resolvedTargetDir, { recursive: true });
    console.log(`✅ Created directory: ${resolvedTargetDir}`);
  } catch (error) {
    console.log(`❌ Failed to create directory ${resolvedTargetDir}:`, error.message);
    process.exit(1);
  }
}

const files = glob.sync(`${resolvedTargetDir}/**/*.js`);

if (files.length === 0) {
  console.log(`⚠️  No .js files found in ${targetDir}`);
  process.exit(0);
}

console.log(`🔧 Fixing ESM imports in ${targetDir}...`);

const convertPath = (importPath, currentFileDir) => {
  if (importPath === '@i18n-editor/shared') {
    const relativePath = relative(currentFileDir, resolve(resolvedTargetDir, '../shared'));
    return relativePath + '/index.js';
  }

  if (importPath.endsWith('.js') || importPath.endsWith('.json')) {
    return importPath;
  }

  if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
    return importPath;
  }

  const fullPath = resolve(currentFileDir, importPath);

  if (existsSync(fullPath + '/index.js')) {
    return importPath + '/index.js';
  }

  if (existsSync(fullPath + '.js')) {
    return importPath + '.js';
  }

  return importPath + '.js';
};

// Regular expressions for import/export statements and conversion
const patterns = [
  // import ... from '...'
  /import\s+([^'"`]+)\s+from\s+['"`]([^'"`]+)['"`]/g,
  // from '...' (standalone)
  /from\s+['"`]([^'"`]+)['"`]/g,
  // export ... from '...'
  /export\s+([^'"`]*?)\s+from\s+['"`]([^'"`]+)['"`]/g,
];

let fixedCount = 0;

files.forEach((file) => {
  let content = readFileSync(file, 'utf8');
  let modified = false;
  const fileDir = dirname(file);

  patterns.forEach((pattern) => {
    content = content.replace(pattern, (match, ...groups) => {
      const pathIndex = groups.length === 2 ? 1 : 0;
      const importPath = groups[pathIndex];
      const newPath = convertPath(importPath, fileDir);

      if (newPath !== importPath) {
        modified = true;
        return match.replace(importPath, newPath);
      }
      return match;
    });
  });

  if (modified) {
    writeFileSync(file, content);
    fixedCount++;
    console.log(`  ✅ Fixed: ${relative(process.cwd(), file)}`);
  }
});

console.log(`🎉 ESM import fixing completed! Fixed ${fixedCount} files in ${targetDir}`);
