const fs = require("fs-extra");
const concat = require("concat");
const path = require(`path`);

const JS_EXTENSION = `.js`;

const appName = process.argv[2]

if (!appName) {
  console.error(`ERROR: Error while building the Angular element, please enter the application name as first parameter`)
  process.exit()
}

const outputJsFile = process.argv[3] || appName;

const outputPrefixPath = process.argv[4];

const distPath = path.join(__dirname, `dist/apps/mango-crem-features/${appName}/`);
const cremDistPath = path.join(__dirname, `dist/cremDist/${outputPrefixPath || appName}/`);
const cremDistElementPath = path.join(__dirname, `dist/cremDist/${outputPrefixPath || appName}/${outputJsFile}.js`);


(async function build() {
  const jsFles = await (
    await fs.readdir(distPath))
    .filter(file => path.extname(file).toLowerCase() === JS_EXTENSION)
    .map(jsFile => path.join(distPath, jsFile)
    );
  await fs.ensureDir(cremDistPath);
  await concat(jsFles, cremDistElementPath);
  if (appName === 'alerts-rules') {
    await fs.copyFile(`./dist/apps/mango-crem-features/${appName}/styles.css`, `dist/cremDist/${outputPrefixPath || appName}/alerts-rules.css`)
  } else {
    await fs.copyFile(`./dist/apps/mango-crem-features/${appName}/styles.css`, `dist/cremDist/${outputPrefixPath || appName}/styles.css`)
  }
  await fs.copyFile(`./dist/apps/mango-crem-features/${appName}/3rdpartylicenses.txt`, `dist/cremDist/${outputPrefixPath || appName}/3rdpartylicenses.txt`)

  console.log('Angular build element script run with success!')
})();
