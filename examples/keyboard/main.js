var bleno = require('../..'),
  HidService = require('./hid-service');
  
var hidService = new HidService();

var name = 'Keyboard';

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(name, [ hidService.uuid ], function( err ) {
        if (err) {
            console.log('advertising', err);
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
       hidService
    ], function(error){
      console.log('setServices', error);
    });
  }
});
