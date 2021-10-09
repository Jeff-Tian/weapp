import crypto from 'crypto'

const hash = crypto.createHash('sha256')


describe('sha256', () => {
  it('hashes', async () => {
    const input = `{
  yuque(id: "54571844") {
    id
    title
    description
    word_count
    created_at
    cover
    body
    __typename
  }
}
`
    const output = hash.update(input).digest('hex')

    expect(output).toEqual('9b208ce5341ba4d8ad23317702f8546dade1b5ae26ce3fd3534fd2cf908dbd71')
  })
})
