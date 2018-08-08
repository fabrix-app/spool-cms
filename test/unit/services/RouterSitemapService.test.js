'use strict'
/* global describe, it */
const assert = require('assert')

describe('RouterSitemapService', () => {
  it('should exist', () => {
    assert(global.app.api.services['RouterSitemapService'])
  })
  it('should build children from flat file', (done) => {
    const out = global.app.services.RouterSitemapService.initFL()
    const children = Object.keys(out.children)
    const hello = out.children['hello']
    const helloChildren = Object.keys(hello.children)
    assert.ok(out.title)
    assert.ok(out.path)
    assert.ok(out.children)
    assert.ok(out.meta)
    assert.ok(out.changefreq)
    assert.ok(out.lastmod)
    assert.ok(out.priority)
    assert.equal(children.length, 8)
    assert.equal(helloChildren.length, 1)

    helloChildren.forEach(function(key) {
      assert.ok(hello.children[key].title)
      assert.ok(hello.children[key].path)
      assert.ok(hello.children[key].children)
      assert.ok(hello.children[key].meta)
      assert.ok(hello.children[key].changefreq)
      assert.ok(hello.children[key].lastmod)
      assert.ok(hello.children[key].priority)
    })
    done()
  })
  it('should build flat map file', (done) => {
    const out = global.app.services.RouterSitemapService.flatMap()
    assert.equal(out.length, 10)
    done()
  })
})
