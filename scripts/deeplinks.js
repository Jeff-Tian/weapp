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
const append = curry((a, b) => `${b}${a}`)
const map = curry((f, a) => a.map(f))
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

const filterByExtension = compose(filter, endsWith)
const prop = propName => obj => obj[propName]
const head = arr => arr[0]
const tail = arr => arr[arr.length - 1]

function getAllDeepLinks(parent = '../src/pages') {
  const subFolders = fs.readdirSync(path.join(__dirname, parent)).filter(thePath => fs.statSync(path.join(__dirname, parent, thePath)).isDirectory())

  return subFolders
    .map(dirPath => [dirPath, fs.readdirSync(path.join(__dirname, parent, dirPath))])
    .map(res => compose(
        map(
          compose(
            prepend(
              append('/', head(res))
            ),
            replace('.tsx', '.html')
          )
        ),
        filterByExtension('.tsx'),
        tail
      )
      (res)
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
