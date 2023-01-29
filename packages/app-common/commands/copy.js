(() => {
  const fs = require('fs');
  const path = require('path');

  const libPath = path.join(__dirname, '../lib');
  const distPath = path.join(__dirname, '../../../dist/common');
  fs.cpSync(libPath, distPath, { force: true, recursive: true });
})();
