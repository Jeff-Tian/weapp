const path = require('path');
const fs = require('fs');
const {
  compose,
  map,
  replace,
  prepend,
  append,
  filterByExtension,
  mapSeparately, mapOver, flat, filter, curry, identity, duplicate
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

const joinPath = curry((parent, sub) => path.join(parent, sub));
const isItADirectory = fsRes => fsRes.isDirectory();
const filterDirectory = p => filter(compose(
  isItADirectory,
  fs.statSync,
  joinPath(p)
));
const subFolderAndItsChildren = p => compose(
  mapSeparately(
    identity,
    compose(fs.readdirSync, joinPath(p))
  ),
  duplicate
);
const mapSubFolderAndItsChildren = compose(map, subFolderAndItsChildren);

const getAllDeepLinks = (parent = joinPath(__dirname, '../src/pages')) => compose(
  mapPrepend,
  flat,
  mapHandleFiles,
  mapSubFolderAndItsChildren(parent),
  filterDirectory(parent),
  fs.readdirSync
)(parent);

module.exports.getAllDeepLinks = getAllDeepLinks

if (require.main === module) {
  const allDeepLinks = getAllDeepLinks();
  allDeepLinks.forEach(f => {
    const folder = path.dirname(f);
    fs.mkdirSync(folder, {recursive: true})
    fs.copyFileSync('dist/index.html', f)
  })
}
