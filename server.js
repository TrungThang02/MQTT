const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

server.listen(port, function () {
  console.log('MQTT server is running on port', port);
});

aedes.on('client', function (client) {
  console.log('Client connected: ', client.id);
});

aedes.on('clientDisconnect', function (client) {
  console.log('Client disconnected: ', client.id);
});

aedes.on('publish', function (packet, client) {
  if (packet.topic.startsWith('$SYS/')) return; 
  console.log('Message received on topic', packet.topic, ':', packet.payload.toString());
});

aedes.on('subscribe', function (subscriptions, client) {
  console.log('Client', client.id, 'subscribed to', subscriptions[0].topic);
});

aedes.on('unsubscribe', function (subscriptions, client) {
  console.log('Client', client.id, 'unsubscribed from', subscriptions[0].topic);
});
