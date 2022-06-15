const path = require('path');
const fs = require('fs');

function getAllDeepLinks() {
  const subFolders = fs.readdirSync(path.join(__dirname, '../src/pages'))

  const tsx = subFolders.map(dirPath => {
    const all = fs.readdirSync(path.join(__dirname, '../src/pages', dirPath))

    return all.filter(f => f.endsWith('.tsx')).map(f => `${dirPath}/${f.replace('.tsx', '.html')}`)
  }).reduce((prev, next) => [...prev, ...next], []).map(f => `dist/pages/${f}`)

  return tsx
}

module.exports.getAllDeepLinks = getAllDeepLinks

if (require.main === module) {
  console.log(getAllDeepLinks().join('\n'))
}
