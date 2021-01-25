const path = require('path');
const awsIot = require('aws-iot-device-sdk');

const options = {
    keyPath: path.join(__dirname, '..', "b76c54a251-private.pem.key"),
    certPath: path.join(__dirname, '..', "b76c54a251-certificate.pem.crt"),
    caPath: path.join(__dirname, '..', "aws-ca.pem.crt"),
    clientId: `client-${Date.now()}`,
    host: "ajgkjba7y00m2-ats.iot.eu-central-1.amazonaws.com"
};

const device = awsIot.device(options);
const hand = {test_data: 1}

device.subscribe('poker_king/hand');

device.on('message', (topic, payload) => {
    console.log('topic', topic);
    console.log('payload', payload.toString());
});

device.on('connect', () => {
    console.log('connected');

    device.publish('poker_king/hand', JSON.stringify(hand));
});

device.on('error', (err) => {
    console.log(err)
});
