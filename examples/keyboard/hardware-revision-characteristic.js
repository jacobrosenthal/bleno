var util = require('util');

var bleno = require('../..');
var BlenoCharacteristic = bleno.Characteristic;

function HardwareRevisionCharacteristic() {
  HardwareRevisionCharacteristic.super_.call(this, {
    uuid: '2a27',
    properties: ['read'],
    value: new Buffer('')
  });
}

util.inherits(HardwareRevisionCharacteristic, BlenoCharacteristic);

module.exports = HardwareRevisionCharacteristic;
