const fs = require('fs');
const path = require('path');

async function organizeBuild() {
  const releaseDir = path.join(__dirname, '..', 'release');
  const unpackedDir = path.join(releaseDir, 'unpacked');
  const packedDir = path.join(releaseDir, 'packed');

  // 폴더 생성
  if (!fs.existsSync(unpackedDir)) {
    fs.mkdirSync(unpackedDir, { recursive: true });
  }
  if (!fs.existsSync(packedDir)) {
    fs.mkdirSync(packedDir, { recursive: true });
  }

  // 플랫폼별 packed 폴더 생성
  const macDir = path.join(packedDir, 'mac');
  const winDir = path.join(packedDir, 'windows');
  const linuxDir = path.join(packedDir, 'linux');

  [macDir, winDir, linuxDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // release 폴더의 모든 파일/폴더 읽기
  const items = fs.readdirSync(releaseDir);

  for (const item of items) {
    const itemPath = path.join(releaseDir, item);
    const stat = fs.statSync(itemPath);

    // unpacked 폴더와 packed 폴더는 건드리지 않음
    if (item === 'unpacked' || item === 'packed') {
      continue;
    }

    if (stat.isDirectory()) {
      // 폴더들은 unpacked로 이동
      const targetPath = path.join(unpackedDir, item);
      moveItem(itemPath, targetPath);
    } else {
      // 파일들을 분류해서 이동
      moveFileToPackedFolder(itemPath, item, macDir, winDir, linuxDir);
    }
  }

  console.log('✅ Build artifacts organized successfully!');
  console.log(`📁 Unpacked files: ${unpackedDir}`);
  console.log(`📦 Packed files: ${packedDir}`);
}

function moveFileToPackedFolder(filePath, fileName, macDir, winDir, linuxDir) {
  let targetDir;

  if (fileName.includes('.dmg') || fileName.includes('latest-mac.yml')) {
    targetDir = macDir;
  } else if (fileName.includes('.exe') || fileName.includes('latest.yml')) {
    targetDir = winDir;
  } else if (fileName.includes('.AppImage') || fileName.includes('.deb') || fileName.includes('latest-linux.yml')) {
    targetDir = linuxDir;
  } else {
    // 기타 파일들은 unpacked로
    targetDir = path.join(path.dirname(macDir), '..', 'unpacked');
  }

  const targetPath = path.join(targetDir, fileName);
  moveItem(filePath, targetPath);
}

function moveItem(source, target) {
  try {
    if (fs.existsSync(target)) {
      // 대상이 이미 존재하면 삭제
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
}

// 스크립트가 직접 실행될 때
if (require.main === module) {
  organizeBuild().catch(console.error);
}

module.exports = organizeBuild;
