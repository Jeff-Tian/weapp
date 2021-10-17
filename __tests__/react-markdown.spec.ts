import {toString} from 'mdast-util-to-string'

describe('remark', () => {
  it('remarks', () => {
    const pop = {
      type: 'fragment', children: [
        {
          position: {
            end: {
              column: 17, line: 1, offset: 16
            },
            start: {
              column: 1, line: 1, offset: 0
            }
          },
          type: 'text',
          value: '<a name=\"he04y\">'
        }
      ]
    }

    const output = toString(pop)

    expect(output).toEqual("<a name=\"he04y\">")
  })
})
