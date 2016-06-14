import assert from 'assert'
import { runInThisContext } from 'vm'

describe('createGraphqlSchema', () => {
  // This test clears the require cache *3 times*. It may slow down tests or
  // produce unpredictable behavior.
  //
  // We attempt to reinstate the old cache at the end however.
  it('will have promisifed pg', () => {
    const oldCache = require.cache
    require.cache = {}
    require('#/index.js')
    assert.equal(typeof require('pg').connectAsync, 'function')
    require.cache = {}
    require('#/promisify.js')
    assert.equal(typeof require('pg').connectAsync, 'function')
    require.cache = {}
    require('#/createGraphqlSchema.js')
    assert.equal(typeof require('pg').connectAsync, 'function')
    require.cache = oldCache
  })
})
