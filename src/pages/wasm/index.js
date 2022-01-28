console.log('worker started...')
console.log('window = ', window, this)

this.test = 'test'

worker.request({
  url: 'https://gitee.com/zizhujy/weapp/raw/main/src/pages/wasm/hello.wasm?a=xxx',
  complete: console.log,
  success: console.info,
  responseType: 'text/plain',
  dataType: 'text/plain',
  fail: console.error,
  header: {
    'User-Agent': 'PostmanRuntime/7.28.4',
    'Referer': ''
  }
})

const hello = require('./hello.js');
console.log('hello = ', hello);
