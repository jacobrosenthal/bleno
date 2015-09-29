var bleno = require('../..');
var Hid = require('./hid-service');
var BatteryService = require('./battery-service');
var DeviceInformationService = require('./device-information-service');

var name = 'Keyboard';

var deviceInformationService = new DeviceInformationService();
var batteryService = new BatteryService();
var hidService = new Hid();

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(name, [ batteryService.uuid, deviceInformationService.uuid], function( err ) {
        if (err) {
            console.log(err);
        }
      });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    bleno.setServices([
       batteryService, deviceInformationService
    ]);
  }
});
