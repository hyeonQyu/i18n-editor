const fs = require('fs');

const packageJsonToObj = (packageJsonPath) => {
  return JSON.parse(fs.readFileSync(packageJsonPath).toString('utf-8'));
};

(() => {
  const root = packageJsonToObj(__dirname + '\\package.json');
  const server = packageJsonToObj(__dirname + '\\apps\\server\\package.json');

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

  if (packageConfig.main.startsWith('\\dist\\')) {
    packageConfig.main = sourceObj.main.slice(5);
  }

  fs.writeFileSync(__dirname + '\\dist\\package.json', Buffer.from(JSON.stringify(packageConfig, null, 2), 'utf-8'));
  fs.writeFileSync(__dirname + '\\dist\\version.txt', Buffer.from(packageConfig.version, 'utf-8'));
  fs.copyFileSync(__dirname + '\\.npmignore', __dirname + '\\dist\\.npmignore');
})();
