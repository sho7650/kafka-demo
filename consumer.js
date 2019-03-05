'use strict';

// required modules
const Kafka = require('no-kafka');

require('dotenv').config();

const consumer = new Kafka.SimpleConsumer({
  connectionString: process.env.KAFKA_URL, // should match `listeners` SSL option in Kafka config
  ssl: {
    cert: process.env.KAFKA_CLIENT_CERT,
    key: process.env.KAFKA_CLIENT_CERT_KEY
  }
});

// data handler function can return a Promise
const dataHandler = (messageSet, topic, partition) => {
  messageSet.forEach((m) => {
    console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
  });
};

return consumer.init().then(function () {
  // Subscribe partitons 0 and 1 in a topic:
  return consumer.subscribe('smokyhill-57141.TOPIC-1', [0, 1], { offset: 0 }, dataHandler);
});
