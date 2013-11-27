
/*
based on EC2 API Version 2013-10-15
*/

var assert = require('assert')
var ec2 = require('../lib/index')()

describe('aws-lib-ec2', function() {
  describe('describeInstances', function() {
    it('should return instance details', function(done) {
      var ids = ['i-a9347ae6', 'i-02ec614e']
      ec2.describeInstances(ids, function(err, res) {
        res.forEach(function(each, i) {
          assert.equal(each.instanceId, ids[i])
        })
        done()
      })
    })
  })
  describe('launchInstances', function() {
    it('should launch an instance', function(done) {
      var opts = {
        imageId: 'ami-8e987ef9'
      }
      ec2.launchInstances(opts, function(err, res) {
        console.log(err, JSON.stringify(res))
      })
    })
  })
})