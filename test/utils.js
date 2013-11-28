
var assert = require('assert')
var utils = require('../lib/utils')

describe('utils', function() {
  describe('mapDescribeInstancesResponse', function() {
    it('should extract relevant details', function() {
      var expected = require('./expected/describe-instances1')
      var testData = require('./test-data/describe-instances1')
      var result = utils.mapDescribeInstancesResponse(testData)
      assert.deepEqual(result, expected)

      var expected = require('./expected/describe-instances2')
      var testData = require('./test-data/describe-instances2')
      var result = utils.mapDescribeInstancesResponse(testData)
      assert.deepEqual(result, expected)
    })
  })
  describe('mapLaunchInstancesResponse', function() {
    it('should extract relevant details', function() {
      var expected = require('./expected/launch-instances')
      var testData = require('./test-data/launch-instances')
      var result = utils.mapLaunchInstancesResponse(testData)
      assert.deepEqual(JSON.stringify(result), JSON.stringify(expected))
    })
  })
})