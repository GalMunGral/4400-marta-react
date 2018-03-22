const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// const router = express.Router();

// const api = require('./routes');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets', express.static(path.join(__dirname, 'frontend/assets')));
// app.use('/api', api);

app.get('/', function(req, res){
  res.send('lalala');
});

const {
  Breezecard,
  BusStationIntersection,
  Conflict,
  Passenger,
  Station,
  Trip,
  User
} = require('./models');


User.findAll({
  include: [Passenger]
})
  .then(results => results.map(v => v.dataValues))
  .then(val => console.log(val.length))

app.listen(3000, () => {
  console.log('Listening on port 3000!')
});