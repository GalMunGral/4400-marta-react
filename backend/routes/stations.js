const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const config = require('../db.config');

const connection = mysql.createConnection(config);

router.route('/')
  .get((req, res) => {
    connection.query(
      `SELECT Name,StopID,EnterFare,ClosedStatus,IsTrain,Intersection
        FROM Station NATURAL LEFT OUTER JOIN BusStationIntersection
        ORDER BY ${req.query.attr} ${req.query.asc === 'true' ? 'ASC' : 'DESC'}
        `,
      (err, results) => {
        res.send({
          results
        });
      }
    );
  });

module.exports = router;