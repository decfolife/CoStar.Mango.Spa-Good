const fs = require("fs-extra");
const concat = require("concat");

(async function build() {

  const files = [
    './dist/apps/mango-crem-features/<%= fileName %>/runtime.js',
    './dist/apps/mango-crem-features/<%= fileName %>/polyfills.js',
    './dist/apps/mango-crem-features/<%= fileName %>/main.js'
  ]
  
  await fs.ensureDir('dist/cremDist/<%= fileName %>/');
  
  await concat(files, 'dist/cremDist/<%= fileName %>/<%= fileName %>.js');

  await fs.copyFile(
    './dist/apps/mango-crem-features/<%= fileName %>/styles.css', 
    'dist/cremDist/<%= fileName %>/styles.css'
  );

  await fs.copy(
    './dist/apps/mango-crem-features/<%= fileName %>/3rdpartylicenses.txt', 
    'dist/cremDist/<%= fileName %>/3rdpartylicenses.txt'
  );

})();
