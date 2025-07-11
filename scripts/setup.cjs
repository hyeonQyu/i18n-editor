const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Setting up development environment...');

const symlinkPath = path.join(__dirname, '..', 'electron', 'shared');
const targetPath = path.join(__dirname, '..', 'shared');

if (fs.existsSync(symlinkPath)) {
  console.log('✅ Symlink already exists: electron/shared -> ../shared');
  process.exit(0);
}

try {
  if (process.platform === 'win32') {
    execSync(`mklink /J "${symlinkPath}" "${targetPath}"`, { stdio: 'inherit' });
  } else {
    execSync(`ln -s ../shared "${symlinkPath}"`, { stdio: 'inherit' });
  }

  console.log('✅ Successfully created symlink: electron/shared -> ../shared');
  console.log('🎉 Development environment setup complete!');
} catch (error) {
  console.error('❌ Failed to create symlink:', error.message);
  console.log('🔧 Please run manually:');
  if (process.platform === 'win32') {
    console.log('   mklink /J electron\\shared ..\\shared');
  } else {
    console.log('   ln -s ../shared electron/shared');
  }
  process.exit(1);
}
