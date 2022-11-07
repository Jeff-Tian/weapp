const path = require('path');
const fs = require('fs');
const {
  compose,
  map,
  replace,
  prepend,
  append,
  filterByExtension,
  mapSeparately, mapOver, flat, filter
} = require("./helpers");

const handleFiles = compose(
  mapOver,
  mapSeparately(
    compose(prepend, append('/')),
    compose(map(replace('.tsx', '.html')), filterByExtension('.tsx'))
  ),
);
const mapHandleFiles = map(handleFiles);
const mapPrepend = map(prepend(`dist/pages/`));

function getAllDeepLinks(parent = path.join(__dirname, '../src/pages')) {
  const isDirectory = thePath => fs.statSync(path.join(parent, thePath)).isDirectory();
  const subFolderAndItsChildren = dirPath => [dirPath, fs.readdirSync(path.join(parent, dirPath))];
  const mapSubFolderAndItsChildren = map(subFolderAndItsChildren);
  const filterDirectory = filter(isDirectory);

  return compose(
    mapPrepend,
    flat,
    mapHandleFiles,
    mapSubFolderAndItsChildren,
    filterDirectory,
    fs.readdirSync
  )(parent);
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
