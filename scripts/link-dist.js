import { existsSync, mkdirSync, rmSync, symlinkSync } from 'fs';
import { join, relative } from 'path';

const rootDir = process.cwd();
const distDir = join(rootDir, 'dist');

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir, { recursive: true });

let linkedCount = 0;

const sharedDist = join(rootDir, 'packages/shared/dist');
if (existsSync(sharedDist)) {
  const sharedTarget = join(distDir, 'shared');
  const relativePath = relative(distDir, sharedDist);
  symlinkSync(relativePath, sharedTarget, 'dir');
  console.log('🔗 Shared dist linked');
  linkedCount++;
}

const rendererDist = join(rootDir, 'packages/renderer/dist');
if (existsSync(rendererDist)) {
  const rendererTarget = join(distDir, 'renderer');
  const relativePath = relative(distDir, rendererDist);
  symlinkSync(relativePath, rendererTarget, 'dir');
  console.log('🔗 Renderer dist linked');
  linkedCount++;
}

const electronDist = join(rootDir, 'packages/electron/dist');
if (existsSync(electronDist)) {
  const electronTarget = join(distDir, 'electron');
  const relativePath = relative(distDir, electronDist);
  symlinkSync(relativePath, electronTarget, 'dir');
  console.log('🔗 Electron dist linked');
  linkedCount++;
}

if (linkedCount === 0) {
  console.log('📝 No dist folders found yet, links will be created as packages build');
} else {
  console.log(`🎉 ${linkedCount} build artifacts linked successfully!`);
}
