
/*
based on EC2 API Version 2013-10-15
*/

var assert = require('assert')
var ec2 = require('../lib/index')()

var instanceId1 = null
var instanceId2 = null

describe('aws-lib-ec2', function() {
  describe('launchInstances', function() {
    it('should launch an instance', function(done) {
      var opts = {
        imageId: 'ami-a73264ce',
        instanceType: 't1.micro'
      }
      ec2.launchInstances(opts, function(err, res) {
        assert.ok(res.instanceId)
        instanceId1 = res.instanceId
        ec2.launchInstances(opts, function(err, res) {
          instanceId2 = res.instanceId
          done()
        })
      })
    })
  })
  describe('describeInstances', function() {
    it('should return instance details', function(done) {
      var ids = [instanceId1, instanceId2].sort()
      ec2.describeInstances(ids, function(err, res) {
        var resIds = res.map(function(each) {
          return each.instanceId
        }).sort()
        assert.deepEqual(resIds, ids)
        done()
      })
    })
  })
  describe('instanceStatus', function() {
    it('should return instance status', function(done) {
      var ids = [instanceId1, instanceId2].sort()
      ec2.instanceStatus(ids, function(err, res) {
        if (!res && !err) {
          console.log('skip test')
          return done()
        }
        var resIds = res.map(function(each) {
          return each.instanceId
        }).sort()
        assert.deepEqual(resIds, ids)
        done()
      })
    })
  })
  describe('terminateInstances', function() {
    it('should terminate instances', function(done) {
      var ids = [instanceId1, instanceId2].sort()
      ec2.terminateInstances(ids, function(err, res) {
        var resIds = res.map(function(each) {
          return each.instanceId
        }).sort()
        assert.deepEqual(resIds, ids)
        done()
      })
    })
  })
})