const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')
const assert = require('assert')

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf8')
}
describe('Markdown-it Components', () => {
  it('should parse html components', function () {
    const mdText = fixture('../../../../content/components/series/a0/0.0.0.md')
    const md = new MarkdownIt({
      html: true
    })
    const html = md.render(mdText)
    const expectedHtml = [
      '<hello>',
      '</hello>',
      '<hello-world>',
      '</hello-world>',
      '<hello-earth>',
      'My Name is Scott',
      '</hello-earth>',
      '<hello-mars [awesome]="yes">',
      '</hello-mars>',
      ''
    ].join('\n')
    // console.log(expectedHtml)
    // console.log(html)
    assert.equal(expectedHtml, html)
  })
})
