import { cpSync, existsSync, mkdirSync, rmSync, watchFile } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');

function copyDistFiles() {
  if (existsSync(distDir)) {
    rmSync(distDir, { recursive: true, force: true });
  }
  mkdirSync(distDir, { recursive: true });

  const sharedDist = join(rootDir, 'packages/shared/dist');
  if (existsSync(sharedDist)) {
    cpSync(sharedDist, join(distDir, 'shared'), { recursive: true });
    console.log('📦 Shared dist copied');
  }

  const rendererDist = join(rootDir, 'packages/renderer/dist');
  if (existsSync(rendererDist)) {
    cpSync(rendererDist, join(distDir, 'renderer'), { recursive: true });
    console.log('📦 Renderer dist copied');
  }

  const electronDist = join(rootDir, 'packages/electron/dist');
  if (existsSync(electronDist)) {
    cpSync(electronDist, join(distDir, 'electron'), { recursive: true });
    console.log('📦 Electron dist copied');
  }

  console.log('🎉 All build artifacts copied!');
}

// 초기 복사
copyDistFiles();

// shared 변경 감시
const sharedDistIndex = join(rootDir, 'packages/shared/dist/index.js');
if (existsSync(sharedDistIndex)) {
  watchFile(sharedDistIndex, () => {
    console.log('📦 Shared dist updated, recopying...');
    const sharedDist = join(rootDir, 'packages/shared/dist');
    if (existsSync(sharedDist)) {
      rmSync(join(distDir, 'shared'), { recursive: true, force: true });
      cpSync(sharedDist, join(distDir, 'shared'), { recursive: true });
      console.log('📦 Shared dist recopied');
    }
  });
  console.log('👀 Watching for shared dist changes...');
}
