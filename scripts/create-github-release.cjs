#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * GitHub Release Creation Script
 *
 * This script performs the following tasks:
 * 1. Reads version information from package.json
 * 2. Finds built files
 * 3. Creates a release using GitHub CLI
 * 4. Uploads built files to the release
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
      console.error('❌ Error reading package.json:', error.message);
      process.exit(1);
    }
  }

  checkGitHubCLI() {
    try {
      execSync('gh --version', { stdio: 'pipe' });
      console.log('✅ GitHub CLI is installed.');
    } catch (error) {
      console.error('❌ GitHub CLI is not installed. Please install it with:');
      console.error('   brew install gh');
      process.exit(1);
    }
  }

  checkGitHubAuth() {
    try {
      execSync('gh auth status', { stdio: 'pipe' });
      console.log('✅ GitHub authentication is valid.');

      try {
        const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
        process.env.GH_TOKEN = token;
        console.log('✅ GitHub token has been set as environment variable.');
      } catch (tokenError) {
        console.warn('⚠️ Error retrieving GitHub token:', tokenError.message);
      }
    } catch (error) {
      console.error('❌ GitHub authentication is required. Please authenticate with:');
      console.error('   gh auth login');
      process.exit(1);
    }
  }

  findReleaseAssets() {
    const assets = [];

    if (!fs.existsSync(this.releaseDir)) {
      console.error('❌ release/packed directory does not exist. Please run the build first:');
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
      console.error('❌ No build files found to upload.');
      process.exit(1);
    }

    console.log(`✅ Found ${assets.length} build file(s):`);
    assets.forEach((asset) => {
      console.log(`   - ${path.basename(asset)}`);
    });

    return assets;
  }

  /**
   * Reads release notes
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
        console.log('✅ Using custom release notes.');
      } catch (error) {
        console.warn('⚠️ Error reading release notes file. Using default template.');
      }
    }

    return releaseNotes;
  }

  createRelease(version, releaseNotes, assets, isDraft = false, isPrerelease = false) {
    const tagName = `v${version}`;
    const releaseName = `i18n Editor v${version}`;

    console.log(`🚀 Creating GitHub Release: ${releaseName}`);

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

      console.log('📦 Creating release and uploading files...');
      execSync(createCommand, { stdio: 'inherit', cwd: this.rootDir });

      fs.unlinkSync(tempNotesFile);

      console.log('✅ GitHub Release created successfully!');
      console.log(`🔗 Release URL: https://github.com/hyeonQyu/i18n-editor/releases/tag/${tagName}`);
    } catch (error) {
      console.error('❌ Error creating GitHub Release:', error.message);
      process.exit(1);
    }
  }

  /**
   * Main execution function
   */
  run() {
    console.log('🎯 Starting GitHub Release creation...\n');

    const args = process.argv.slice(2);
    const isDraft = args.includes('--draft');
    const isPrerelease = args.includes('--prerelease');
    const skipBuild = args.includes('--skip-build');

    this.checkGitHubCLI();
    this.checkGitHubAuth();

    if (!skipBuild) {
      console.log('🔨 Building project... (all platforms)');
      try {
        const buildEnv = { ...process.env, GH_TOKEN: process.env.GH_TOKEN };
        execSync('yarn package', {
          stdio: 'inherit',
          cwd: this.rootDir,
          env: buildEnv,
        });
        console.log('✅ Build completed.\n');
      } catch (error) {
        console.error('❌ Error during build:', error.message);
        process.exit(1);
      }
    }

    const version = this.getVersion();
    console.log(`📋 Version: ${version}`);

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
