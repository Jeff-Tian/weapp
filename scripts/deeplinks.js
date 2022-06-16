const path = require('path');
const fs = require('fs');

function getAllDeepLinks(parent = '../src/pages') {
  const subFolders = fs.readdirSync(path.join(__dirname, parent))

  return subFolders.map(dirPath => {
    const all = fs.readdirSync(path.join(__dirname, parent, dirPath))

    return all.filter(f => f.endsWith('.tsx')).map(f => `${dirPath}/${f.replace('.tsx', '.html')}`)
  }).reduce((prev, next) => [...prev, ...next], []).map(f => `dist/pages/${f}`)
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
