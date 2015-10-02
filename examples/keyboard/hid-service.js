var util = require('util');
var bleno = require('../..');


// var inputReport = new bleno.Characteristic ({
//     uuid: '2a22',
//     properties: ['read', 'notify'],
//     value: new Buffer('??'),
//     descriptors: [
//       new BlenoDescriptor({
//         uuid: '2902',
//         properties: ['read', 'write'],
//         value: new Buffer(0),
//         onWriteRequest: function(a,b,c) { console.log('inputreport descriptor onWriteRequest', a,b,c); },
//         onReadRequest: function(a,b,c) { console.log('inputreport descriptor onReadRequest', a,b,c); }
//       })
//     ]
// })



// var outputReport = new bleno.Characteristic ({
//     uuid: '2a32',
//     properties: ['read', 'write', 'writeWithoutResponse'],
//     value: new Buffer('??'),
//     onWriteRequest: function(a,b,c) { console.log('outputReport onWriteRequest', a,b,c); },
//     onReadRequest: function(a,b,c) { console.log('outputReport onReadRequest', a,b,c); }
// })

// var primaryCharacteristic = new bleno.Characteristic({
//                         uuid: '1812',
//                         properties: ['read', 'write', 'writeWithoutResponse', 'notify', 'indicate'],
//                         characteristics: [
//                           hidInformation, hidControlPoint, reportMap
//                         ],
//                         onReadRequest: function(a,b,c) { console.log('outputReport onReadRequest', a,b,c); },
//                         onWriteRequest: function(a,b,c) { console.log('outputReport onWriteRequest', a,b,c); },
//                       });



var hidInformation = new bleno.Characteristic ({
    uuid: '2a4a',
    properties: ['read'],
    onReadRequest: function(offset, callback) {
      console.log('hidInformation onReadRequest', offset);
      var data = new Buffer(4);
      data.writeUInt16(0x111, 0); //bcdHID
      data.writeUInt8(0x00, 4); //bCountryCode
      data.writeUInt8(0x00, 6); //bFlags
      console.log(data);
      callback(data);
    }
});

var reportMap = new bleno.Characteristic ({
    uuid: '2a4b',
    properties: ['read'],
    onReadRequest: function(offset, callback) {
      callback(new Buffer([0x00]));
    }
});

var hidControlPoint = new bleno.Characteristic ({
    uuid: '0x2a4c',
    properties: ['writeWithoutResponse'],
    onWriteRequest: function(data, offset, withoutResponse, callback) {
      console.log('hidControlPoint onWriteRequest', data, offset, withoutResponse);
    }
});

function HidService() {
    bleno.PrimaryService.call(this, {
        uuid: '1812',
        characteristics: [ hidInformation, reportMap, hidControlPoint ],
        onReadRequest: function(offset, callback) {
          console.log('HidService onReadRequest', offset);
        },
        onWriteRequest: function(data, offset, withoutResponse, callback) {
          console.log('HidService onWriteRequest', data, offset, withoutResponse);
        },
    });
}

util.inherits(HidService, bleno.PrimaryService);

module.exports = HidService;
