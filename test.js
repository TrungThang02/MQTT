const mqtt = require('mqtt');

// Thay đổi địa chỉ và cổng để phản ánh địa chỉ và cổng của MQTT server đã triển khai
const brokerUrl = 'mqtt://mqtt-ttt.onrender.com';

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Connected to MQTT server');

  // Subscribe to a topic
  client.subscribe('your/topic', (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic: your/topic');
    }
  });

  // Publish a message
  client.publish('your/topic', 'Hello, MQTT!', (err) => {
    if (err) {
      console.error('Error publishing message:', err);
    } else {
      console.log('Message published to topic: your/topic');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});
