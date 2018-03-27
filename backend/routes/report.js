const { Station, Trip } = require('../models');
const { parseRawData } = require('../utilities')
const Sequelize = require('sequelize');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try{
    let reports = Station.findAll({
      attributes: [
        'name',
        [Sequelize.fn('COUNT', '*'), 'inflow'],
        [Sequelize.fn('SUM', 'StartTrip.tripFare'), 'revenue'],
        // [Sequelize.literal('COUNT(*) - EndTrip.outflow'), 'flow'],
      ],
      include: [{
        model: Trip,
        as: 'StartTrips',
        attributes: [
          'startTime'
        ],
        required: true,
        includeIgnoreAttributes: false
      },
      //  {
      //   model: Station,
      //   as: 'EndStation',
      //   attributes: [[Sequelize.fn('COUNT', '*'), 'outflow']],
      //   include: [{
      //     model: Trip,
      //     as: 'EndTrip',
      //     require: true
      //   }],
      //   group: ['stopId'],
      //   required: true
      // }
    ],
      group: ['stopId']
    });
    reports = parseRawData(reports);
    res.send(JSON.stringify(reports))
  } catch(error) {
    console.log(error)
    res.send(error)
  }
});

module.exports = router;