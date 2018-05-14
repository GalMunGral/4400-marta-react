const express = require('express');
const mysql = require('mysql2');
const md5 = require('md5');

const router = express.Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'marta_v0',
  timezone: 'utc',
  dateStrings: true
});

router.route('/breeze-cards')
  .get((req, res) => {
    const array = [];
    if (req.query.owner !== 'null') {
      array.push('BelongsTo = "' + req.query.owner + '"');
    }
    if (req.query.cardNumber !== 'null') {
      array.push('BreezecardNum = "' + req.query.cardNumber + '"');
    }
    if (req.query.minValue !== 'null') {
      array.push('Value >= ' + req.query.minValue);
    }
    if (req.query.maxValue !== 'null') {
      array.push('Value <= ' + req.query.maxValue);
    }
    if (req.query.showSuspended === 'false') {
      array.push('DateTime IS NULL');
    }
    const condition = array.join(' AND ');
    connection.query(
      `SELECT b.BreezecardNum, b.Value, b.BelongsTo
        FROM Breezecard AS b NATURAL LEFT OUTER JOIN Conflict${condition.length !== 0 ? '\nWHERE ' + condition + '\n' : ''}
        ORDER BY ${req.query.attr} ${req.query.asc === 'true' ? 'ASC' : 'DESC'}`,
      (err, results) => {
        res.send({
          results,
          err: results.length ? '' : 'NOT FOUND! errorID: ' + md5(condition)
        });
      });
  });

router.route('/suspended-cards')
  .get((req, res) => {
    connection.query(
      `SELECT BreezecardNum, Username, DateTime, BelongsTo
      FROM Breezecard NATURAL JOIN Conflict
      ORDER BY ${req.query.attr} ${req.query.asc === 'true' ? 'ASC' : 'DESC;'}`,
      (err, results) => {
        res.send({
          results,
        });
      });
  });

router.route('/create-station')
  .post((req, res) => {
    connection.query(
      `INSERT INTO Station VALUES 
      ("${req.body.stationId}",
      "${req.body.stationName}",
      ${req.body.fare},
      ${req.body.isOpen ? 0 : 1},
      ${req.body.isTrainStation ? 1 : 0})`,
      (err) => {
        if (!err && req.body.isBusStation) {
          connection.query(
            `INSERT INTO BusStationIntersection VALUES
            ("${req.body.stationId}",
            "${req.body.intersection}")`,
            () => {
              res.send({});
            }
          );
        } else if (!err) {
          res.send({});
        }
      }
    );
  });

router.route('/update-fare')
  .post((req, res) => {
    connection.query(
      `UPDATE Station
      SET EnterFare = ${req.body.fare}, ClosedStatus = ${req.body.isOpen ? 0 : 1}
      WHERE StopID = "${req.body.id}"`,
      () => {
        res.send({});
      });
    if (req.body.isBusStation) {
      connection.query(
        `UPDATE BusStationIntersection
        SET Intersection = "${req.body.intersection}"
        WHERE StopID = "${req.body.id}"`
      );
    }
  });

router.route('/resolve-conflict')
  .post((req, res) => {
    if (req.body.willAssignToNewOwner) {
      connection.query(
        `UPDATE Breezecard
        SET BelongsTo = "${req.body.newOwnerName}"
        WHERE BreezecardNum = "${req.body.BNumber}"`,
        () => {
          res.send({});
        }
      );
    }
    connection.query(
      `DELETE FROM Conflict WHERE BreezecardNum = "${req.body.BNumber}"`
    );
  });

router.route('/update-card-value')
  .post((req, res) => {
    connection.query(
      `UPDATE Breezecard
      SET Value = ${req.body.newValue}
      WHERE BreezecardNum = "${req.body.Number}"`,
      () => {
        res.send({});
      });
  });

router.route('/update-card-owner')
  .post((req, res) => {
    connection.query(
      `UPDATE Breezecard
      SET BelongsTo = "${req.body.newOwner}"
      WHERE BreezecardNum = "${req.body.Number}"`,
      (err) => {
        if (err) {
          res.send({err: 'User does not exist! Time: ' + new Date()});
        } else {
          res.send({});
        }
      });
  });


router.route('/flow-report')
  .get((req, res) => {
    const cond = `${req.query.start === 'null' && req.query.end === 'null' ? '' : 'AND'}
    ${req.query.start !== 'null'? 'T.StartTime >= ' + '"' + req.query.start.substring(0, 10) + ' ' + req.query.start.substring(10) + '"' : ''}
    ${req.query.start !== 'null' && req.query.end !== 'null' ? 'AND' : ''}
    ${req.query.end !== 'null' ? 'T.StartTime <= ' + '"' + req.query.end.substring(0, 10) + ' ' + req.query.end.substring(10) + '"' : ''}`;
    connection.query(
      `SELECT A.Name AS Name, InFlow, IFNULL(OutFlow, 0) AS OutFlow, (InFlow - IFNULL(OutFlow, 0)) AS Flow, A.Revenue AS Revenue
      FROM
      (SELECT S.StopID AS SID, S.Name AS Name, COUNT(*) AS Inflow, SUM(T.Tripfare) AS Revenue, T.StartTime
      FROM Station AS S, Trip AS T
      WHERE S.StopID = T.StartsAt
      ${cond}
      GROUP BY T.StartsAt) AS A
      LEFT OUTER JOIN
      (SELECT S.StopID AS SID, S.Name AS Name, COUNT(*) AS Outflow, SUM(T.Tripfare) AS Revenue, T.StartTime
      FROM Station AS S, Trip AS T
      WHERE S.StopID = T.EndsAt
      ${cond}
      GROUP BY T.EndsAt) AS B
      ON A.SID = B.SID
      ORDER BY ${req.query.attr} ${req.query.asc === 'true' ? 'ASC' : 'DESC'}`,
      (err, results) => {
        res.send({
          results,
          err: results ? results.length ? '' : 'NOT FOUND! Time: ' + new Date() : ''
        });
      });
  });

module.exports = router;