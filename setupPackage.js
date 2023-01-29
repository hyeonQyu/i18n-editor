const fs = require('fs');
const path = require('path');

const DIST_DIRECTORY_NAME = 'dist';

const packageJsonToObj = (packageJsonPath) => {
  return JSON.parse(fs.readFileSync(packageJsonPath).toString('utf-8'));
};

const removeDistDirectoryName = (config, propNames) => {
  const distDirectorySubPath = `${DIST_DIRECTORY_NAME}/`;
  propNames.forEach((propName) => {
    if (config[propName]?.startsWith(distDirectorySubPath)) {
      config[propName] = config[propName].slice(distDirectorySubPath.length);
    }
  });
};

(() => {
  const root = packageJsonToObj(path.join(__dirname, '/package.json'));
  const server = packageJsonToObj(path.join(__dirname, '/apps/server/package.json'));

  const { name, version, author, licenses, bugs, homepage } = root;

  const packageConfig = {
    ...server,
    name,
    version,
    author,
    licenses,
    bugs,
    homepage,
    scripts: {},
    devDependencies: {},
    private: false,
  };

  removeDistDirectoryName(packageConfig, ['main', 'types']);

  const distDir = path.join(__dirname, `/${DIST_DIRECTORY_NAME}`);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  fs.writeFileSync(path.join(distDir, '/package.json'), Buffer.from(JSON.stringify(packageConfig, null, 2), 'utf-8'));
  fs.writeFileSync(path.join(distDir, '/version.txt'), Buffer.from(packageConfig.version, 'utf-8'));
  fs.copyFileSync(path.join(__dirname, '/.npmignore'), path.join(distDir, '/.npmignore'));
})();
