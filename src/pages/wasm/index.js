this.wasmPath = '/pages/wasm/hello.wasm'

Module = {
  print: function (text) {
    console.log(text);

    worker.postMessage({
      message: {
        output: text
      }
    })
  }
}

require('./hello.js');
