import { build } from 'esbuild';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const buildMain = async () => {
  await build({
    entryPoints: [resolve(rootDir, 'packages/electron/src/main.ts')],
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'esm',
    outfile: resolve(rootDir, 'dist/electron/main.js'),
    external: ['electron'],
    minify: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    alias: {
      '@i18n-editor/shared': resolve(rootDir, 'dist/shared'),
    },
  });
};

const buildPreload = async () => {
  await build({
    entryPoints: [resolve(rootDir, 'packages/electron/src/preload.ts')],
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'esm',
    outfile: resolve(rootDir, 'dist/electron/preload.js'),
    external: ['electron'],
    minify: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    alias: {
      '@i18n-editor/shared': resolve(rootDir, 'dist/shared'),
    },
  });
};

const main = async () => {
  try {
    console.log('🔨 Building Electron main process...');
    await buildMain();
    console.log('✅ Main process built successfully');

    console.log('🔨 Building Electron preload script...');
    await buildPreload();
    console.log('✅ Preload script built successfully');

    console.log('🎉 Electron build completed!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
};

main();
