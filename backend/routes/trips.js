const { Station, Passenger, Breezecard } = require('../models');
const { parseRawData } = require('../utilities')
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { startTime, endTime, username, attr, dir } = req.query;
  try{
    let trips = await Trip.findAll({
      attributes: ['startTime', 'tripFare', 'breezecardNum'],
      where: {
        startTime: {
          [Op.gte]: startTime,
          [Op.lte]: endTime
        }      
      },
      include: [{
        model: Station,
        as: 'StartStations',
        attributes: [['name', 'startStation']]
      }, {
        model: Station,
        as: 'EndStations',
        attributes: [['name', 'endStation']]
      }, {
        model: Breezecard,
        include: [{
          model: Passenger,
          where: { username }
        }]
      }],
      raw: true
    });
  } catch(error) {
    return res.send(error)
  }
  trips = parseRawData(trips, attr, dir);
  res.send(JSON.stringify(trips))
});


router.post('/', async (req, res) => {
  const body = Object.values(req.body)
  if (body.includes(null) || body.includes(undefined)) {
    return res.send({ success: false, error: 'Missing fields'});
  }
  const {
    breezecardNum,
    tripFare,
    startTime,
    startsAt,
    endsAt
  } = req.body;
  try {
    const card = await Breezecard.findOne({
      where: { breezecardNum }
    });
    if (card.value < tripFare) {
      throw 'Insufficient fund';
    }
    await Trip.create({
      tripFare,
      startTime,
      breezecardNum,
      startsAt,
      endsAt
    });
    await Breezecard.decrement('value', {
      by: tripFare,
      where: { breezecardNum }
    })
    res.send({ success: true })
  } catch(error) {
    return res.send(error)
  }
});