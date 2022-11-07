const path = require('path');
const fs = require('fs');
const {
  compose,
  map,
  replace,
  prepend,
  append,
  filterByExtension,
  mapSeparately, mapOver
} = require("./helpers");

function getAllDeepLinks(parent = path.join(__dirname, '../src/pages')) {
  const subFolders = fs.readdirSync(parent).filter(thePath => fs.statSync(path.join(parent, thePath)).isDirectory())

  const dirPathAndSubFolderOrFiles = subFolders
    .map(dirPath => [dirPath, fs.readdirSync(path.join(parent, dirPath))]);

  const handleFiles = compose(
    mapOver,
    mapSeparately(
      compose(prepend, append('/')),
      compose(map(replace('.tsx', '.html')), filterByExtension('.tsx'))
    ),
  );

  return dirPathAndSubFolderOrFiles
    .map(handleFiles)
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
