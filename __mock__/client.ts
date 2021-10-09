const client = {
  query: () => {
    return Promise.resolve({ success: true })
  },
  mutate: () => {
    return Promise.resolve({ success: true })
  },
  loginMutate: () => {
    return Promise.resolve({ success: true })
  },
}

export default client
