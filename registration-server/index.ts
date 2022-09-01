const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

// const { Kafka } = require('kafkajs');

// const kafka = new Kafka({
//     clientId: 'my-app',
//     brokers: ['localhost:9092'],
// });


// const kafkaProducer = async () => {
//     const producer = kafka.producer()

//     await producer.connect()
//     await producer.send({
//     topic: 'test-topic',
//     messages: [
//         { value: 'Hello KafkaJS user!' },
//     ],
//     })

//     await producer.disconnect();
// }

// const kafkaConsumer = async () => {
//     const consumer = kafka.consumer({ groupId: 'test-group' })

//     await consumer.connect()
//     await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

//     await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//         value: message.value.toString(),
//         })
//     },
//     })
// }

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

const users = [];
const sessions = [];

app.get('/', (req, res) => {
  res.send('Test!')
});

app.post('/signup', (req, res) => {
  if(users.map(user => user.email).includes(req.body.email)){
    res.status(400).send('User already exists');
  }
  else {
    users.push({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });
    const newSession = {
      token: uuid.v4(),
      isActive: true,
      user: req.body.email
    }
    sessions.push(newSession);
    res.send(newSession);
  }
});

app.post('/login', (req, res) => {
  const user = users.filter(user => user.email == req.body.email && user.password == req.body.password)[0];
  if(user) {
    const userSession = sessions.filter(session => session.user == user.email)[0];
    if(userSession) {
      res.send(userSession);
    }
    else {
      const newSession = {
        token: uuid.v4(),
        isActive: true,
        user: user.email
      }
      sessions.push(newSession);
      res.send(newSession);
    }
  }
  else {
    res.status(400).send('User not found');
  }
});

app.post('/userdetails', (req, res) => {
  const userSession = sessions.filter(session => session.token == req.body.token)[0];
  if(userSession) {
    res.send(users.filter(user => user.email == userSession.user)[0]);
  }
  else {
    res.status(403).send('Cannot access');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});