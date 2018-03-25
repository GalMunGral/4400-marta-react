const express = require('express');
const { Station, BusStationIntersection } = require('../models');
const { parseRawData } = require('../utilities');

const router = express.Router();

router.get('/', async (req, res) => {
  const { attr, dir } = req.query;
  let stations = await Station.findAll({
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
  stations = parseRawData(stations);
  res.send(JSON.stringify(stations));
});

module.exports = router;


// router.route('/create-station')
// .post((req, res) => {
//     connection.query(
//         `INSERT INTO Station VALUES 
//         ("${req.body.stationId}",
//         "${req.body.stationName}",
//         ${req.body.fare},
//         ${req.body.isOpen ? 0 : 1},
//         ${req.body.isTrainStation ? 1 : 0})`,
//         (err) => {
//             if (!err && req.body.isBusStation) {
//                 connection.query(
//                     `INSERT INTO BusStationIntersection VALUES
//                     ("${req.body.stationId}",
//                     "${req.body.intersection}")`,
//                     () => {
//                         res.send({});
//                     }
//                 );
//             } else if (!err) {
//                 res.send({});
//             }
//         }
//     );
// });

// router.route('/update-fare')
// .post((req, res) => {
//     connection.query(
//         `UPDATE Station
//         SET EnterFare = ${req.body.fare}, ClosedStatus = ${req.body.isOpen ? 0 : 1}
//         WHERE StopID = "${req.body.id}"`,
//         () => {
//             res.send({});
//         });
//     if (req.body.isBusStation) {
//         connection.query(
//             `UPDATE BusStationIntersection
//             SET Intersection = "${req.body.intersection}"
//             WHERE StopID = "${req.body.id}"`
//         );
//     }
// });