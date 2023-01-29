(() => {
  const fs = require('fs');
  const path = require('path');

  const libPath = path.join(__dirname, '../lib');
  fs.rm(libPath, { recursive: true, force: true }, () => {});
})();
