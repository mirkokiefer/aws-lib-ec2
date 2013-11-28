
var aws = require('aws-lib')
var utils = require('./utils')
module.exports = createClient

function createClient(opts) {
  opts = opts || {}
  var key = opts.key || process.env['AWS_KEY']
  var secret = opts.key || process.env['AWS_SECRET']
  var ec2 = aws.createEC2Client(key, secret, {
    host: opts.host || "ec2.us-east-1.amazonaws.com"
  })

  return {
    describeInstances: describeInstances,
    launchInstances: launchInstances,
    terminateInstances: terminateInstances,
    instanceStatus: instanceStatus
  }

  function describeInstances(ids, cb) {
    var params = {}
    ids.forEach(function(each, i) {
      params['InstanceId.' + (i+1)] = each
    })
    ec2.call("DescribeInstances", params, function(err, res) {
      if (err) return cb(err)
      cb(null, utils.mapDescribeInstancesResponse(res))
    })
  }

  function instanceStatus(ids, cb) {
    var params = {}
    ids.forEach(function(each, i) {
      params['InstanceId.' + (i+1)] = each
    })
    ec2.call("DescribeInstanceStatus", params, function(err, res) {
      if (err) return cb(err)
      cb(null, utils.mapInstanceStatusResponse(res))
    })
  }

  function launchInstances(opts, cb) {
    var params = {
      'ImageId' : opts.imageId,
      'MinCount': opts.minCount || 1,
      'MaxCount': opts.maxCount || opts.minCount || 1
    }
    if (opts.securityGroup) params['SecurityGroup'] = opts.securityGroup
    if (opts.instanceType) params['InstanceType'] = opts.instanceType
    if (opts.keyName) params['KeyName'] = opts.keyName

    ec2.call("RunInstances", params, function(err, data) {
      if (err) return cb(err)
      cb(null, utils.mapLaunchInstancesResponse(data))
    })
  }

  function terminateInstances(ids, cb) {
    var params = {}
    ids.forEach(function(each, i) {
      params['InstanceId.' + (i+1)] = each
    })
    ec2.call("TerminateInstances", params, function(err, res) {
      if (err) return cb(err)
      cb(null, utils.mapTerminateInstancesResponse(res))
    })
  }
}
