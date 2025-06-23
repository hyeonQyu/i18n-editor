const fs = require('fs');
const path = require('path');

const moveItem = (source, target) => {
  try {
    if (fs.existsSync(target)) {
      if (fs.statSync(target).isDirectory()) {
        fs.rmSync(target, { recursive: true, force: true });
      } else {
        fs.unlinkSync(target);
      }
    }

    fs.renameSync(source, target);
  } catch (error) {
    console.error(`Error moving ${source} to ${target}:`, error.message);
  }
};

const moveFileToPackedFolder = (filePath, fileName, macDir, winDir, linuxDir) => {
  let targetDir;

  if (fileName.includes('.dmg') || fileName.includes('latest-mac.yml')) {
    targetDir = macDir;
  } else if (fileName.includes('.exe') || fileName.includes('latest.yml')) {
    targetDir = winDir;
  } else if (fileName.includes('.AppImage') || fileName.includes('.deb') || fileName.includes('latest-linux.yml')) {
    targetDir = linuxDir;
  } else {
    targetDir = path.join(path.dirname(macDir), '..', 'unpacked');
  }

  const targetPath = path.join(targetDir, fileName);
  moveItem(filePath, targetPath);
};

const organizeBuild = async () => {
  const releaseDir = path.join(__dirname, '..', 'release');
  const unpackedDir = path.join(releaseDir, 'unpacked');
  const packedDir = path.join(releaseDir, 'packed');

  if (!fs.existsSync(unpackedDir)) {
    fs.mkdirSync(unpackedDir, { recursive: true });
  }
  if (!fs.existsSync(packedDir)) {
    fs.mkdirSync(packedDir, { recursive: true });
  }

  const macDir = path.join(packedDir, 'mac');
  const winDir = path.join(packedDir, 'windows');
  const linuxDir = path.join(packedDir, 'linux');

  [macDir, winDir, linuxDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const items = fs.readdirSync(releaseDir);

  items.forEach((item) => {
    const itemPath = path.join(releaseDir, item);
    const stat = fs.statSync(itemPath);

    if (item === 'unpacked' || item === 'packed') {
      return;
    }

    if (stat.isDirectory()) {
      const targetPath = path.join(unpackedDir, item);
      moveItem(itemPath, targetPath);
    } else {
      moveFileToPackedFolder(itemPath, item, macDir, winDir, linuxDir);
    }
  });

  console.log('✅ Build artifacts organized successfully!');
  console.log(`📁 Unpacked files: ${unpackedDir}`);
  console.log(`📦 Packed files: ${packedDir}`);
};

if (require.main === module) {
  organizeBuild().catch(console.error);
}

module.exports = organizeBuild;
