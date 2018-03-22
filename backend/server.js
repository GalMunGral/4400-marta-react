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


Passenger.findAll({ include: [Conflict] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    conflicts: d.conflicts.map(d => d.dataValues)
  })))
  .then(result => console.log(result.map(d => d.conflicts)))

app.listen(3000, () => {
  console.log('Listening on port 3000!')
});