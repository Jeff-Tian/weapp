const path = require('path');
const fs = require('fs');

function getAllDeepLinks(parent = '../src/pages') {
  const subFolders = fs.readdirSync(path.join(__dirname, parent)).filter(thePath => fs.statSync(path.join(__dirname, parent, thePath)).isDirectory())

  return subFolders.map(dirPath => {
    const allFiles = fs.readdirSync(path.join(__dirname, parent, dirPath))

    return allFiles.filter(f => f.endsWith('.tsx')).map(f => `${dirPath}/${f.replace('.tsx', '.html')}`)
  }).flatMap(x => x).map(x => `dist/pages/${x}`)
}

module.exports.getAllDeepLinks = getAllDeepLinks

if (require.main === module) {
  const allDeepLinks = getAllDeepLinks();
  allDeepLinks.forEach(f => {
    const folder = path.dirname(f);
    fs.mkdirSync(folder, {recursive: true})
    fs.copyFileSync('dist/index.html', f)
  })
}
