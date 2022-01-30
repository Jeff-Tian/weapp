console.log('worker started...')
console.log('window = ', window, this, WebAssembly)

this.test = 'test'

worker.postMessage({
  message: 'message'
})

// worker.request({
//   url: `https://uniheart.pa-ca.me/proxy?url=${encodeURIComponent('https://raw.githubusercontent.com/Jeff-Tian/PearlsPlus/gh-pages/index.wasm')}`,
//   complete: console.log,
//   success: (res) => {
//     console.log(res.data)
//     const ws = WebAssembly.instantiate(res.data)
//     console.log('ws = ', ws)
//   },
//   responseType: 'text/plain',
//   dataType: 'text/plain',
//   fail: console.error,
//   header: {
//     'User-Agent': 'PostmanRuntime/7.28.4',
//     'Referer': ''
//   }
// })

const hello = require('./hello.js');
console.log('hello = ', hello);
