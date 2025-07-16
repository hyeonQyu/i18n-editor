import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir, { recursive: true });

const sharedDist = join(rootDir, 'packages/shared/dist');
if (existsSync(sharedDist)) {
  cpSync(sharedDist, join(distDir, 'shared'), { recursive: true });
  console.log('📦 Shared dist copied for packaging');
}

const rendererDist = join(rootDir, 'packages/renderer/dist');
if (existsSync(rendererDist)) {
  cpSync(rendererDist, join(distDir, 'renderer'), { recursive: true });
  console.log('📦 Renderer dist copied for packaging');
}

const electronDist = join(rootDir, 'packages/electron/dist');
if (existsSync(electronDist)) {
  cpSync(electronDist, join(distDir, 'electron'), { recursive: true });
  console.log('📦 Electron dist copied for packaging');
}

console.log('🎉 All build artifacts copied for packaging!');
