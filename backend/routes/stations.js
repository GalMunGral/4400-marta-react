const { Station, BusStationIntersection } = require('../models');
const _ = require('lodash');
const { parseRawData } = require('../utilities');

module.exports.get = (req, res) => {
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
  .then(vals => _.orderBy(vals, attr, dir))
  .then(vals => res.send(JSON.stringify(vals)))
};