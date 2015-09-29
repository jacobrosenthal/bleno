var util = require('util');
var bleno = require('../..');




var reportMap = new bleno.Characteristic ({
    uuid: '2a4b',
    properties: ['read'],
    value: new Buffer('??')
})

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


// var data = new Buffer(4); //how big?
// data.writeUInt16(99, 0); //bcdHID
// data.writeUInt8(0x00, 2); // dont know index bCountryCode
// data.writeUInt8(0x00, 3); //flags

// var hidInformation = new bleno.Characteristic ({
//     uuid: '2a4a',
//     properties: ['read'],
//     value: data
// })

// var outputReport = new bleno.Characteristic ({
//     uuid: '2a32',
//     properties: ['read', 'write', 'writeWithoutResponse'],
//     value: new Buffer('??'),
//     onWriteRequest: function(a,b,c) { console.log('outputReport onWriteRequest', a,b,c); },
//     onReadRequest: function(a,b,c) { console.log('outputReport onReadRequest', a,b,c); }
// })

var hidInformation = new bleno.Characteristic ({
    uuid: '0x2a4c',
    properties: ['writeWithoutResponse'],
    onWriteRequest: function(a,b,c) { console.log('hidInformation onWriteRequest', a,b,c); }
})

var primaryCharacteristic = new bleno.Characteristic({
                        uuid: '1812',
                        properties: ['read', 'write', 'writeWithoutResponse', 'notify', 'indicate'],
                        characteristics: [
                          hidInformation
                        ],
                        onReadRequest: function(a,b,c) { console.log('outputReport onReadRequest', a,b,c); },
                        onWriteRequest: function(a,b,c) { console.log('outputReport onWriteRequest', a,b,c); },
                      });



function HidService() {
    bleno.PrimaryService.call(this, {
        uuid: 'fffffffffffffffffffffffffffffff0',
        characteristics: [ primaryCharacteristic ]
    });
}

util.inherits(HidService, bleno.PrimaryService);

module.exports = HidService;
