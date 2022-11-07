const path = require('path');
const fs = require('fs');
const {
  compose,
  replace,
  prepend,
  append
} = require("./helpers");

const getDeepLinksFrom = (parent, folder) => {
  console.log('parent = ', parent, folder);
  const subFoldersOrFiles = fs.readdirSync(path.join(__dirname, parent, folder));

  return subFoldersOrFiles.map(subFolderOrFile => {
    const stats = fs.statSync(path.join(__dirname, parent, folder, subFolderOrFile));
    if (stats.isDirectory()) {
      return getDeepLinksFrom(`${parent}/${folder}`, subFolderOrFile);
    }

    if (subFolderOrFile.endsWith('.tsx')) {
      return [
        (compose(
          prepend,
          append('/')
        )(`${parent}/${folder}`))(replace('.tsx', '.html')(subFolderOrFile))
      ];
    }

    return [];
  }).flat().map(replace('../src', 'dist'))
}


module.exports.getAllDeepLinks = (parent = '../src', folder = 'pages') => getDeepLinksFrom(parent, folder);

if (require.main === module) {
  console.log('dirname = ', __dirname);
  const allDeepLinks = module.exports.getAllDeepLinks();
  allDeepLinks.forEach(f => {
    const folder = path.dirname(f);
    fs.mkdirSync(folder, {recursive: true})
    fs.copyFileSync('dist/index.html', f)
  })
}
