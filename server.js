require("dotenv").config();

const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);

const port = process.env.PORT || 1883;

// Set username and password
const username = "user123";
const password = "123";

// Authentication function
aedes.authenticate = function (client, username, password, callback) {
  if (username === "user123" && password.toString() === "123") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

server.listen(port, function () {
  console.log("MQTT server is running on port", port);
});

aedes.on("client", function (client) {
  console.log("Client connected: ", client.id);
});

aedes.on("clientDisconnect", function (client) {
  console.log("Client disconnected: ", client.id);
});

aedes.on("publish", function (packet, client) {
  if (packet.topic.startsWith("$SYS/")) return;
  console.log(
    "Message received on topic",
    packet.topic,
    ":",
    packet.payload.toString()
  );
});

aedes.on("subscribe", function (subscriptions, client) {
  subscriptions.forEach((sub) => {
    console.log("Client", client.id, "subscribed to", sub.topic);
    console.log("Welcome to the topic", sub.topic, "!");
  });
});

aedes.on("unsubscribe", function (subscriptions, client) {
  subscriptions.forEach((sub) => {
    console.log("Client", client.id, "unsubscribed from", sub.topic);
  });
});
