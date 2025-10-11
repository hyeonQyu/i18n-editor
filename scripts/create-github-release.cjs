#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * GitHub Release 생성 스크립트
 *
 * 이 스크립트는 다음 작업을 수행합니다:
 * 1. package.json에서 버전 정보를 읽어옵니다
 * 2. 빌드된 파일들을 찾습니다
 * 3. GitHub CLI를 사용하여 release를 생성합니다
 * 4. 빌드된 파일들을 release에 업로드합니다
 */

class GitHubReleaseCreator {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.packageJsonPath = path.join(this.rootDir, 'package.json');
    this.releaseDir = path.join(this.rootDir, 'release', 'packed');
    this.releaseNotesPath = path.join(this.rootDir, 'RELEASE_NOTES.md');
  }

  getVersion() {
    try {
      const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
      return packageJson.version;
    } catch (error) {
      console.error('❌ package.json을 읽는 중 오류가 발생했습니다:', error.message);
      process.exit(1);
    }
  }

  checkGitHubCLI() {
    try {
      execSync('gh --version', { stdio: 'pipe' });
      console.log('✅ GitHub CLI가 설치되어 있습니다.');
    } catch (error) {
      console.error('❌ GitHub CLI가 설치되어 있지 않습니다. 다음 명령어로 설치해주세요:');
      console.error('   brew install gh');
      process.exit(1);
    }
  }

  checkGitHubAuth() {
    try {
      execSync('gh auth status', { stdio: 'pipe' });
      console.log('✅ GitHub에 인증되어 있습니다.');

      try {
        const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
        process.env.GH_TOKEN = token;
        console.log('✅ GitHub token이 환경 변수로 설정되었습니다.');
      } catch (tokenError) {
        console.warn('⚠️ GitHub token을 가져오는 중 오류가 발생했습니다:', tokenError.message);
      }
    } catch (error) {
      console.error('❌ GitHub에 인증되어 있지 않습니다. 다음 명령어로 인증해주세요:');
      console.error('   gh auth login');
      process.exit(1);
    }
  }

  findReleaseAssets() {
    const assets = [];

    if (!fs.existsSync(this.releaseDir)) {
      console.error('❌ release/packed 디렉토리가 존재하지 않습니다. 먼저 빌드를 실행해주세요:');
      console.error('   yarn package');
      process.exit(1);
    }

    const macDir = path.join(this.releaseDir, 'mac');
    if (fs.existsSync(macDir)) {
      const macFiles = fs.readdirSync(macDir).filter((file) => file.endsWith('.dmg') && !file.includes('.blockmap'));
      macFiles.forEach((file) => {
        assets.push(path.join(macDir, file));
      });
    }

    const winDir = path.join(this.releaseDir, 'windows');
    if (fs.existsSync(winDir)) {
      const winFiles = fs.readdirSync(winDir).filter((file) => file.endsWith('.exe') || file.endsWith('.msi'));
      winFiles.forEach((file) => {
        assets.push(path.join(winDir, file));
      });
    }

    const linuxDir = path.join(this.releaseDir, 'linux');
    if (fs.existsSync(linuxDir)) {
      const linuxFiles = fs
        .readdirSync(linuxDir)
        .filter((file) => file.endsWith('.AppImage') || file.endsWith('.deb') || file.endsWith('.rpm'));
      linuxFiles.forEach((file) => {
        assets.push(path.join(linuxDir, file));
      });
    }

    if (assets.length === 0) {
      console.error('❌ 업로드할 빌드 파일을 찾을 수 없습니다.');
      process.exit(1);
    }

    console.log(`✅ ${assets.length}개의 빌드 파일을 찾았습니다:`);
    assets.forEach((asset) => {
      console.log(`   - ${path.basename(asset)}`);
    });

    return assets;
  }

  /**
   * Release 노트를 읽어옵니다
   */
  getReleaseNotes(version) {
    let releaseNotes = `# i18n Editor v${version}

## 주요 변경사항

이 릴리스에 대한 자세한 내용은 [CHANGELOG.md](https://github.com/hyeonQyu/i18n-editor/blob/main/CHANGELOG.md)를 참조하세요.

## 다운로드

아래에서 운영체제에 맞는 설치 파일을 다운로드하세요:

- **macOS**: \`.dmg\` 파일 다운로드
- **Windows**: \`.exe\` 파일 다운로드  
- **Linux**: \`.AppImage\` 또는 \`.deb\` 파일 다운로드

## 설치 방법

### macOS
1. \`.dmg\` 파일을 다운로드합니다
2. 파일을 열고 애플리케이션 폴더로 드래그합니다

### Windows
1. \`.exe\` 파일을 다운로드합니다
2. 파일을 실행하여 설치를 진행합니다

### Linux
1. \`.AppImage\` 파일을 다운로드합니다
2. 실행 권한을 부여하고 실행합니다: \`chmod +x *.AppImage && ./*.AppImage\`

또는 \`.deb\` 파일을 다운로드하여 패키지 매니저로 설치합니다.
`;

    if (fs.existsSync(this.releaseNotesPath)) {
      try {
        releaseNotes = fs.readFileSync(this.releaseNotesPath, 'utf8');
        console.log('✅ 사용자 정의 릴리스 노트를 사용합니다.');
      } catch (error) {
        console.warn('⚠️ 릴리스 노트 파일을 읽는 중 오류가 발생했습니다. 기본 템플릿을 사용합니다.');
      }
    }

    return releaseNotes;
  }

  createRelease(version, releaseNotes, assets, isDraft = false, isPrerelease = false) {
    const tagName = `v${version}`;
    const releaseName = `i18n Editor v${version}`;

    console.log(`🚀 GitHub Release를 생성합니다: ${releaseName}`);

    try {
      const tempNotesFile = path.join(this.rootDir, '.temp-release-notes.md');
      fs.writeFileSync(tempNotesFile, releaseNotes);

      let createCommand = `gh release create "${tagName}" --title "${releaseName}" --notes-file "${tempNotesFile}"`;

      if (isDraft) {
        createCommand += ' --draft';
      }

      if (isPrerelease) {
        createCommand += ' --prerelease';
      }

      assets.forEach((asset) => {
        createCommand += ` "${asset}"`;
      });

      console.log('📦 릴리스를 생성하고 파일을 업로드합니다...');
      execSync(createCommand, { stdio: 'inherit', cwd: this.rootDir });

      fs.unlinkSync(tempNotesFile);

      console.log('✅ GitHub Release가 성공적으로 생성되었습니다!');
      console.log(`🔗 릴리스 URL: https://github.com/hyeonQyu/i18n-editor/releases/tag/${tagName}`);
    } catch (error) {
      console.error('❌ GitHub Release 생성 중 오류가 발생했습니다:', error.message);
      process.exit(1);
    }
  }

  /**
   * 메인 실행 함수
   */
  run() {
    console.log('🎯 GitHub Release 생성을 시작합니다...\n');

    const args = process.argv.slice(2);
    const isDraft = args.includes('--draft');
    const isPrerelease = args.includes('--prerelease');
    const skipBuild = args.includes('--skip-build');

    this.checkGitHubCLI();
    this.checkGitHubAuth();

    if (!skipBuild) {
      console.log('🔨 프로젝트를 빌드합니다... (모든 플랫폼)');
      try {
        const buildEnv = { ...process.env, GH_TOKEN: process.env.GH_TOKEN };
        execSync('yarn package', {
          stdio: 'inherit',
          cwd: this.rootDir,
          env: buildEnv,
        });
        console.log('✅ 빌드가 완료되었습니다.\n');
      } catch (error) {
        console.error('❌ 빌드 중 오류가 발생했습니다:', error.message);
        process.exit(1);
      }
    }

    const version = this.getVersion();
    console.log(`📋 버전: ${version}`);

    const assets = this.findReleaseAssets();
    const releaseNotes = this.getReleaseNotes(version);
    this.createRelease(version, releaseNotes, assets, isDraft, isPrerelease);
  }
}

if (require.main === module) {
  const creator = new GitHubReleaseCreator();
  creator.run();
}

module.exports = GitHubReleaseCreator;
