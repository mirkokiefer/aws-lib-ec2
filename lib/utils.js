

module.exports = {
  mapDescribeInstancesResponse: mapDescribeInstancesResponse,
  mapLaunchInstancesResponse: mapLaunchInstancesResponse,
  mapTerminateInstancesResponse: mapTerminateInstancesResponse
}

function mapDescribeInstancesResponse(res) {
  var item = res.reservationSet.item
  return mapRunningInstanceItems(item)
}

function mapRunningInstanceItems(data) {
  if (data.constructor == Array) {
    return data.map(mapReservationSet)
  }
  return mapReservationSet(data)
}

function mapReservationSet(res) {
  var reservationId = res.reservationId
  var instancesSet = res.instancesSet.item
  var tagSet = {}
  var placement = instancesSet.placement
  if (instancesSet.tagSet) {
    instancesSet.tagSet.item.forEach(function(each) {
      tagSet[each.key] = each.value
    })
  }
  return {
    instanceId: instancesSet.instanceId,
    imageId: instancesSet.imageId,
    instanceState: instancesSet.instanceState,
    privateDnsName: instancesSet.privateDnsName,
    dnsName: instancesSet.dnsName,
    keyName: instancesSet.keyName,
    instanceType: instancesSet.instanceType,
    launchTime: instancesSet.launchTime,
    availabilityZone: placement.availabilityZone,
    monitoring: instancesSet.monitoring,
    subnetId: instancesSet.subnetId,
    vpcId: instancesSet.vpcId,
    privateIpAddress: instancesSet.privateIpAddress,
    ipAddress: instancesSet.ipAddress,
    groupSet: instancesSet.groupSet.item,
    architecture: instancesSet.architecture,
    rootDeviceType: instancesSet.rootDeviceType,
    rootDeviceName: instancesSet.rootDeviceName,
    blockDeviceMapping: instancesSet.blockDeviceMapping.item,
    tagSet: tagSet
  }
}

function mapLaunchInstancesResponse(res) {
  var item = res.instancesSet.item
  return mapReservationSet(res)
}

function mapTerminateInstancesResponse(res) {
  return res.instancesSet.item
}
