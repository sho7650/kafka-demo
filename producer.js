'use strict';

// required modules
const Kafka = require('no-kafka');

require('dotenv').config();

const producer = new Kafka.Producer({
  connectionString: process.env.KAFKA_URL, // should match `listeners` SSL option in Kafka config
  ssl: {
    cert: process.env.KAFKA_CLIENT_CERT,
    key: process.env.KAFKA_CLIENT_CERT_KEY
  }
});

return producer.init()
  .then(() => {
    return producer.send({
      topic: 'smokyhill-57141.TOPIC-1',
      partition: 0,
      message: {
        key: 'key',
        value: 'value'
      }
    })
  })
  .then(result => {
    console.log(result);
  });

console.log('test');