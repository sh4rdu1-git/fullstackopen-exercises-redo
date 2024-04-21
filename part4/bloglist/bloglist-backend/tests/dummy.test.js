const { test, describe } = require('node:test')
const assert = require('node:assert')

const list_helper = require('../utils/list_helper')

describe('dummy', () => {
  test('returns one', () => {
    const blogs = []
    const result = list_helper.dummy(blogs)

    assert.strictEqual(result, 1)
  })
})