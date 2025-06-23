import { cpSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');

if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

const rendererDist = join(rootDir, 'packages/renderer/dist');
if (existsSync(rendererDist)) {
  cpSync(rendererDist, join(distDir, 'renderer'), { recursive: true });
  console.log('✅ Renderer dist copied');
}

const electronDist = join(rootDir, 'packages/electron/dist');
if (existsSync(electronDist)) {
  cpSync(electronDist, join(distDir, 'electron'), { recursive: true });
  console.log('✅ Electron dist copied');
}

console.log('🎉 All build artifacts copied successfully!');
