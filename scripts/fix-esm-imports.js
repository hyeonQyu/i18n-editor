import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const targetDir = process.argv[2] || 'dist';
const files = glob.sync(`${targetDir}/**/*.js`);

console.log(`🔧 Fixing ESM imports in ${targetDir}...`);

files.forEach((file) => {
  let content = readFileSync(file, 'utf8');
  let modified = false;

  content = content.replace(/from\s+['"`](\.\/.+?)['"`]/g, (match, path) => {
    if (!path.endsWith('.js') && !path.endsWith('.json')) {
      modified = true;
      return match.replace(path, path + '.js');
    }
    return match;
  });

  content = content.replace(/from\s+['"`](\.\.\/[^'"`]*?)['"`]/g, (match, path) => {
    if (!path.endsWith('.js') && !path.endsWith('.json')) {
      modified = true;
      return match.replace(path, path + '.js');
    }
    return match;
  });

  if (modified) {
    writeFileSync(file, content);
    console.log(`  ✅ Fixed: ${file}`);
  }
});

console.log(`🎉 ESM import fixing completed!`);
