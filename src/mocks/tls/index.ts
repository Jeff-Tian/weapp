const tls = {
  connect: options => {
    console.log('connect: ', options)
  }
}

export default tls
