const express = require('express');
const { Station, BusStationIntersection } = require('../models');
const { parseRawData } = require('../utilities');

const router = express.Router();

router.get('/', (req, res) => {
  const { attr, dir } = req.query;
  Station.findAll({
    attributes: [
      'name',
      'stopID',
      'enterFare',
      'closedStatus',
      'isTrain',
    ],
    include: [{
      model: BusStationIntersection,
      attributes: ['intersection']
    }],
    raw: true
  })
  .then(vals => parseRawData(vals))
  .then(vals => res.send(JSON.stringify(vals)))
});

module.exports = router;