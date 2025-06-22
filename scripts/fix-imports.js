import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const files = glob.sync('dist/electron/**/*.js');

files.forEach((file) => {
  let content = readFileSync(file, 'utf8');

  content = content.replace(/from\s+['"`](\.\/.+?)['"`]/g, (match, path) => {
    if (!path.endsWith('.js')) {
      return match.replace(path, path + '.js');
    }
    return match;
  });

  writeFileSync(file, content);
});

console.log(`Fixed imports in ${files.length} files`);
