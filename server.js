// server.js for the chat functionalities...

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const Pusher2 = require('pusher-js');

// const Sentiment = require('sentiment');
// const sentiment = new Sentiment();

const pusher = new Pusher({
      appId: '629119',
      key: '3800bc824539f40d5823',
      secret: 'a4b51140a9abffbd711e',
      cluster: 'eu',
      encrypted: false,
});

console.log('Sending Test Message');
pusher.trigger('my-channel', 'my-event', {message: 'This is from Nigpro app'});

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  app.post('/messages', (req, res) => {
    const { body } = req;
    const { text, id } = body;

    // const result = sentiment.analyze(text);
    // const comparative = result.comparative;
    // const tone = comparative >= 0 ? (comparative >= 1 ? 'positive' : 'neutral') : 'negative';


    const data = {
      text,
      id,
      timeStamp: new Date(),
      // sentiment: {
      //   tone,
      //   score: result.score,
      // },
    };
    console.log('Data to be sent');
    console.log(data);
    pusher.trigger('my-channel', 'my-event', {message: data.text});
    console.log('Data sent to pusher');
    res.json(data);
  });

