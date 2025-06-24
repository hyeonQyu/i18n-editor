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

// 경로 변환 함수
function convertPath(importPath, currentFileDir) {
  // 이미 .js나 .json으로 끝나면 그대로 반환
  if (importPath.endsWith('.js') || importPath.endsWith('.json')) {
    return importPath;
  }

  // 절대 경로나 node_modules 패키지는 그대로 반환
  if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
    return importPath;
  }

  // 상대 경로 처리 (./ 또는 ../)
  const fullPath = resolve(currentFileDir, importPath);

  // 디렉토리인지 확인 (index.js 존재)
  if (existsSync(fullPath + '/index.js')) {
    return importPath + '/index.js';
  }

  // 파일인지 확인 (.js 파일 존재)
  if (existsSync(fullPath + '.js')) {
    return importPath + '.js';
  }

  // 둘 다 없으면 .js 추가 (기본값)
  return importPath + '.js';
}

// import/export 문 정규식과 변환
const patterns = [
  // import ... from '...'
  /import\s+([^'"`]+)\s+from\s+['"`]([^'"`]+)['"`]/g,
  // from '...' (단독)
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
      const pathIndex = groups.length === 2 ? 1 : 0; // 경로가 있는 그룹 인덱스
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
