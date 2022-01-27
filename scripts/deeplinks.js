const path = require('path');
const fs = require('fs');

function getAllDeepLinks() {
  const subFolders = fs.readdirSync('./src/pages')

  const tsx = subFolders.map(dirPath => {
    const all = fs.readdirSync(path.join('./src/pages', dirPath))

    return all.filter(f => f.endsWith('.tsx')).map(f => `${dirPath}/${f.replace('.tsx', '.html')}`)
  }).reduce((prev, next) => [...prev, ...next], []).map(f => `dist/pages/${f}`)

  console.log(tsx)

  return tsx
}

module.exports.getAllDeepLinks = getAllDeepLinks
