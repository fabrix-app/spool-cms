'use strict'
/* global describe, it */
const assert = require('assert')

describe('Route Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Route'])
  })
})
