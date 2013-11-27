
var aws = require('aws-lib')
var utils = require('./utils')
module.exports = createClient

function createClient(opts) {
  opts = opts || {}
  var key = opts.key || process.env['AWS_KEY']
  var secret = opts.key || process.env['AWS_SECRET']
  console.log(key, secret)
  var ec2 = aws.createEC2Client(key, secret, {
    host: "ec2.eu-west-1.amazonaws.com"
  })

  return {
    describeInstances: describeInstances,
    launchInstances: launchInstances
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

  function launchInstances(opts, cb) {
    var params = {
      'ImageId' : opts.imageId,
      'MinCount': opts.minCount || 1,
      'MaxCount': opts.maxCount || opts.minCount || 1,
      // 'KeyName': opts.keyName,
      // 'SecurityGroup': opts.securityGroup,
      // 'InstanceType': opts.instanceType
    }
    ec2.call("RunInstances", params, function(err, data) {
      cb(err, data)
    })
  }
}
