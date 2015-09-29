var util = require('util');

var bleno = require('../..');

var BlenoCharacteristic = bleno.Characteristic;

function SerialNumberCharacteristic() {
  SerialNumberCharacteristic.super_.call(this, {
    uuid: '2a25',
    properties: ['read'],
    value: new Buffer('')
  });
}

util.inherits(SerialNumberCharacteristic, BlenoCharacteristic);

module.exports = SerialNumberCharacteristic;
