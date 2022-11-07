const path = require('path');
const fs = require('fs');
const {
  compose,
  map,
  replace,
  prepend,
  append,
  head,
  filterByExtension,
  tail,
  identity,
  mapSeparately, mapOver
} = require("./helpers");

function getAllDeepLinks(parent = '../src/pages') {
  const subFolders = fs.readdirSync(path.join(__dirname, parent)).filter(thePath => fs.statSync(path.join(__dirname, parent, thePath)).isDirectory())

  return subFolders
    .map(dirPath => [dirPath, fs.readdirSync(path.join(__dirname, parent, dirPath))])
    .map(
      compose(
        mapOver,
        mapSeparately(
          compose(prepend, append('/')),
          compose(map(replace('.tsx', '.html')), filterByExtension('.tsx'))),
      )
    )
    .flat()
    .map(prepend(`dist/pages/`))
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
