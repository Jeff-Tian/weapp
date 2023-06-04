export const parseJwt = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const jsonPayload = Buffer.from(base64, 'base64').toString('utf8')
  return JSON.parse(jsonPayload)
}
