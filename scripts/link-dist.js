import { existsSync, mkdirSync, rmSync, symlinkSync, watchFile } from 'fs';
import { join, relative } from 'path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');

function ensureDistDir() {
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
}

function createLinks() {
  ensureDistDir();

  let linkedCount = 0;

  // Shared 링크
  const sharedDist = join(rootDir, 'packages/shared/dist');
  const sharedTarget = join(distDir, 'shared');
  if (existsSync(sharedDist)) {
    // 기존 링크가 있으면 제거
    if (existsSync(sharedTarget)) {
      rmSync(sharedTarget, { recursive: true, force: true });
    }
    const relativePath = relative(distDir, sharedDist);
    symlinkSync(relativePath, sharedTarget, 'dir');
    console.log('🔗 Shared dist linked');
    linkedCount++;
  }

  // Renderer 링크
  const rendererDist = join(rootDir, 'packages/renderer/dist');
  const rendererTarget = join(distDir, 'renderer');
  if (existsSync(rendererDist)) {
    if (existsSync(rendererTarget)) {
      rmSync(rendererTarget, { recursive: true, force: true });
    }
    const relativePath = relative(distDir, rendererDist);
    symlinkSync(relativePath, rendererTarget, 'dir');
    console.log('🔗 Renderer dist linked');
    linkedCount++;
  }

  // Electron 링크
  const electronDist = join(rootDir, 'packages/electron/dist');
  const electronTarget = join(distDir, 'electron');
  if (existsSync(electronDist)) {
    if (existsSync(electronTarget)) {
      rmSync(electronTarget, { recursive: true, force: true });
    }
    const relativePath = relative(distDir, electronDist);
    symlinkSync(relativePath, electronTarget, 'dir');
    console.log('🔗 Electron dist linked');
    linkedCount++;
  }

  return linkedCount;
}

// 초기 링크 생성
console.log('🚀 Setting up development links...');
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir, { recursive: true });

const initialLinks = createLinks();
if (initialLinks === 0) {
  console.log('📝 No dist folders found yet, links will be created as packages build');
} else {
  console.log(`🎉 ${initialLinks} build artifacts linked successfully!`);
}

// shared 빌드 감시 (watch 모드에서 새로 빌드될 때마다 링크 재생성)
const sharedDistIndex = join(rootDir, 'packages/shared/dist/index.js');
if (existsSync(sharedDistIndex)) {
  watchFile(sharedDistIndex, () => {
    console.log('📦 Shared dist updated, recreating link...');
    const sharedTarget = join(distDir, 'shared');
    if (existsSync(sharedTarget)) {
      rmSync(sharedTarget, { recursive: true, force: true });
    }
    const sharedDist = join(rootDir, 'packages/shared/dist');
    if (existsSync(sharedDist)) {
      const relativePath = relative(distDir, sharedDist);
      symlinkSync(relativePath, sharedTarget, 'dir');
      console.log('🔗 Shared dist link recreated');
    }
  });
}
