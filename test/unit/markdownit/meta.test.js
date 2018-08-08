const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')
const meta = require('markdown-it-meta')
const assert = require('assert')

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf8')
}
describe('Markdown-it Meta', () => {
  it('should parse metadata', function () {
    const mdText = fixture('../../../../content/test/series/a0/0.0.0.md')
    const md = new MarkdownIt()
    md.use(meta)
    const html = md.render(mdText)
    const expectedHtml = [
      '<h1>My document</h1>',
      '<h2>Second heading</h2>',
      '<p>This is awesome.</p>',
      '<ul>',
      '<li>a point</li>',
      '<li>another point</li>',
      '</ul>',
      ''
    ].join('\n')

    assert(md.meta, {My: 'Word', Author: 'Eugene', Stuff: ['My', 'Stuff']})
    assert(expectedHtml, html)

  })

  it('should handle empty meta data', function () {
    const mdText = fixture('../../../../content/empty/series/a0/0.0.0.md')
    const md = new MarkdownIt()
    md.use(meta)
    const html = md.render(mdText)
    const expectedHtml = [
      '<h1>My document</h1>',
      '<h2>Second heading</h2>',
      '<p>This is awesome.</p>',
      '<ul>',
      '<li>a point</li>',
      '<li>another point</li>',
      '</ul>',
      ''
    ].join('\n')
    // t.deepEquals(md.meta, {})
    assert(md.meta, {})
    assert(expectedHtml, html)

  })

  it('should handle missing meta data', function () {
    const mdText = fixture('../../../../content/missing/series/a0/0.0.0.md')
    const md = new MarkdownIt()
    md.use(meta)
    const html = md.render(mdText)
    const expectedHtml = [
      '<h1>My document</h1>',
      '<h2>Second heading</h2>',
      '<p>This is awesome.</p>',
      '<ul>',
      '<li>a point</li>',
      '<li>another point</li>',
      '</ul>',
      ''
    ].join('\n')

    assert(md.meta, {})
    assert(expectedHtml, html)

  })

  it('should handle misplaced meta data', function () {
    const mdText = fixture('../../../../content/misplaced/series/a0/0.0.0.md')
    const md = new MarkdownIt()
    md.use(meta)
    const html = md.render(mdText)
    const expectedHtml = [
      '<h1>My document</h1>',
      '<h2>Second heading</h2>',
      '<p>This is awesome.</p>',
      '<ul>',
      '<li>a point</li>',
      '<li>another point</li>',
      '</ul>',
      '<hr>',
      '<p>My: Word',
      'Author: Eugene',
      'Stuff:</p>',
      '<ul>',
      '<li>My</li>',
      '<li>Stuff</li>',
      '</ul>',
      '<hr>',
      ''
    ].join('\n')

    assert(md.meta, {})
    assert(expectedHtml, html)

  })

  it('should only parse metadata at the top of the file', function () {
    const mdText = fixture('../../../../content/notfirst/series/a0/0.0.0.md')
    const md = new MarkdownIt()
    md.use(meta)
    const html = md.render(mdText)
    const expectedHtml = [
      '<hr>',
      '<p>My: Word',
      'Author: Eugene',
      'Stuff:</p>',
      '<ul>',
      '<li>My</li>',
      '<li>Stuff</li>',
      '</ul>',
      '<hr>',
      '<h1>My document</h1>',
      '<h2>Second heading</h2>',
      '<p>This is awesome.</p>',
      '<ul>',
      '<li>a point</li>',
      '<li>another point</li>',
      '</ul>',
      ''
    ].join('\n')

    assert(md.meta, {})
    assert(expectedHtml, html)
  })

  it('should parse html components in html document with metadata', function () {
    const mdText = fixture('../../../../content/html/series/a0/0.0.0.html')
    const md = new MarkdownIt({
      html: true
    })
    md.use(meta)
    const html = md.render(mdText)
    const expectedHtml = [
      '<hello>',
      '</hello>',
      ''
    ].join('\n')
    assert.equal(md.meta.title, 'Homepage Hello World')
    assert.equal(md.meta.keywords, 'proxy-engine, amazing, does html')
    assert.equal(expectedHtml, html)
  })
})
