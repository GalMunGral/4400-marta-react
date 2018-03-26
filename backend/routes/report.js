const { Station, Passenger, Breezecard, sequelize } = require('../models');
const { parseRawData } = require('../utilities')
const router = require('express').Router();

router.get('/', async (req, res) => {
  try{
    let reports = Station.findAll({
      attributes: [
        'name',
        [Sequelize.fn('COUNT', '*'), 'inflow'],
        [Sequelize.literal('inflow - outflow'), 'flow'],
        [Sequelize.fn('SUM', 'tripFare'), 'revenue'],
        'startTime'
      ],
      inclue: [{
        model: Trip,
        as: 'StartTrip'
      }, {
        model: Station,
        atributes: [[Sequelize.fn('COUNT', '*'), 'outflow']],
        include: [{
          model: Trip,
          as: 'EndTrip'
        }],
        group: ['stopId']
      }],
      group: ['stopId']
    });
    reports = parseRawData(reports);
    res.send(JSON.stringify(reports))
  } catch(error) {
    res.send(error)
  }
});

module.exports = router;