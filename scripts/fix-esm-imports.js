import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import { dirname, join, relative } from 'path';

const arg = process.argv[2];
let targetDir, packageName;

// 패키지 이름인지 경로인지 판단
if (arg && (arg.startsWith('./') || arg.startsWith('packages/') || arg === 'dist')) {
  // 기존 방식: 직접 경로 지정
  targetDir = arg;
  packageName = null;
} else {
  // 새로운 방식: 패키지 이름 지정
  packageName = arg;
  targetDir = packageName ? `packages/${packageName}/dist` : 'dist';
}

if (!existsSync(targetDir)) {
  console.log(`⚠️  Target directory ${targetDir} does not exist, creating it...`);
  try {
    mkdirSync(targetDir, { recursive: true });
    console.log(`✅ Created directory: ${targetDir}`);
  } catch (error) {
    console.log(`❌ Failed to create directory ${targetDir}:`, error.message);
    process.exit(1);
  }
}

const files = glob.sync(`${targetDir}/**/*.js`);
console.log(`🔧 Fixing ESM imports in ${targetDir}...`);

// 경로 변환 함수
function convertPath(importPath, currentFileDir) {
  // 이미 .js나 .json으로 끝나면 그대로 반환
  if (importPath.endsWith('.js') || importPath.endsWith('.json')) {
    return importPath;
  }

  // 상대 경로 처리 (./ 또는 ../)
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    const fullPath = join(currentFileDir, importPath);

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

  // 워크스페이스 패키지 경로 처리 (@i18n-editor/shared/...)
  if (importPath.startsWith('@i18n-editor/shared')) {
    const subPath = importPath.replace('@i18n-editor/shared', '').replace(/^\//, '');

    if (!subPath) {
      // @i18n-editor/shared 자체
      return '../shared/index.js';
    }

    // 서브패스가 있는 경우
    const sharedPath = join(currentFileDir, '../shared', subPath);
    if (existsSync(sharedPath + '/index.js')) {
      return `../shared/${subPath}/index.js`;
    }
    if (existsSync(sharedPath + '.js')) {
      return `../shared/${subPath}.js`;
    }
    return `../shared/${subPath}/index.js`; // 기본값
  }

  return importPath;
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
    console.log(`  ✅ Fixed: ${relative(process.cwd(), file)}`);
  }
});

console.log(`🎉 ESM import fixing completed for ${packageName || targetDir}!`);
