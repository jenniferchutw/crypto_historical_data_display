const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const mongodb_uri =
  'mongodb+srv://utu:utu@cryptohistorical.i1oar.mongodb.net/HistoricalData?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!!!!!!!!!!!!');
});

const schema = new mongoose.Schema({
  currency: String,
  date: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: String,
  marketCap: String,
});

const dataModel = mongoose.model('dataModel', schema, 'HistoricalData');

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  const queryDate = req.query.date;

  dataModel
    .aggregate([
      { $match: { Date: { $lte: queryDate } } },
      { $sort: { Date: -1 } },
      { $group: { _id: '$Currency', data: { $push: '$$ROOT' } } },
      { $sort: { _id: 1 } },
      { $project: { data: { $slice: ['$data', 7] } } },
    ])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log('err: ', err);
    });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
