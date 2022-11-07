const path = require('path');
const fs = require('fs');

const curry = fn => {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args)
  }
}

const filter = curry((f, a) => a.filter(f))
const endsWith = curry((e, s) => s.endsWith(e))
const replace = curry((a, b, s) => s.replace(a, b))
const prepend = curry((a, b) => `${a}${b}`)
const map = curry((f, a) => a.map(f))
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

function getAllDeepLinks(parent = '../src/pages') {
  const subFolders = fs.readdirSync(path.join(__dirname, parent)).filter(thePath => fs.statSync(path.join(__dirname, parent, thePath)).isDirectory())

  return subFolders
    .map(dirPath => ({allFiles: fs.readdirSync(path.join(__dirname, parent, dirPath)), dirPath}))
    .map(({
            allFiles,
            dirPath
          }) => map(compose(prepend(`${dirPath}/`), replace('.tsx', '.html')))(filter(endsWith('.tsx'), allFiles)))
    .flat().map(prepend(`dist/pages/`))
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
