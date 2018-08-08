'use strict'
/* global describe, it */

const assert = require('assert')

describe('Cms', () => {
  it('should exist', () => {
    assert(global.app.api.policies['CmsPolicy'])
  })
})
