const express = require('express');
const mysql = require('mysql2');
const md5 = require('md5');
const router = express.Router();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'marta',
  timezone: 'utc',
  dateStrings: true
});

router.route('/my-cards')
  .get((req, res) => {
    connection.query(
      `SELECT BreezecardNum, Value FROM Breezecard
         WHERE BelongsTo = "${req.query.user}"
         ${req.query.attr
    ? `ORDER BY ${req.query.attr} ${req.query.asc === 'true' ? 'ASC' : 'DESC'}`
    : ''}`,
      (err, results) => {
        res.send({
          results
        });
      }
    );
  });

router.route('/complete-trip')
  .post((req, res) => {
    connection.query(
      `SELECT * FROM Breezecard WHERE BreezecardNum = ${req.body.breezecardNum}`,
      (err, results) => {
        if (results[0].Value - req.body.currentFare >= 0) {
          connection.query(
            `INSERT INTO Trip VALUES (${req.body.currentFare}, "${req.body.startTime}", "${req.body.breezecardNum}", "${req.body.startID}", "${req.body.endID}")`,
            () => {
              connection.query(
                `UPDATE Breezecard
                            SET VALUE = VALUE - ${req.body.currentFare}
                            WHERE BreezecardNum = ${req.body.breezecardNum}`,
                () => {
                  res.send({});
                });
            });
        } else {
          res.send({err: 'Insufficient fund!'});
        }
      });
  });

router.route('/new-card')
  .post((req, res) => {
    connection.query(
      `SELECT * FROM Breezecard WHERE BreezecardNum = "${req.body.Number}"`,
      (err, results) => {
        if (results.length === 0) {
          connection.query(
            `INSERT INTO Breezecard VALUES ("${req.body.Number}", 0, "${req.body.Username}")`,
            () => {
              res.send({});
            });
        } else {
          if (results[0].BelongsTo === null) {
            connection.query(
              `UPDATE Breezecard
                        SET BelongsTo = "${req.body.Username}"
                        WHERE BreezecardNum = "${req.body.Number}"`,
              () => {
                res.send({});
              });
          } else {
            if (results[0].BelongsTo !== req.body.Username) {
              connection.query(
                `INSERT INTO Conflict VALUES ("${req.body.Username}", "${req.body.Number}", NOW())`,
                () => {
                  res.send({err: 'Card already in use! Time: ' + new Date()});
                });
            } else {
              res.send({err: 'You already own this card! Time: ' + new Date()});
            }
          }
        }
      });
  });

router.route('/add-value')
  .post((req, res) => {
    connection.query(
      `UPDATE Breezecard
        SET Value = Value + ${req.body.valueToAdd}
        WHERE BreezecardNum = "${req.body.Number}"`,
      () => {
        res.send({});
      });
  });

router.route('/trip-history')
  .get((req, res) => {
    connection.query(
      `SELECT T.StartTime AS Time, SS.Name AS SName, DS.Name AS DName, T.Tripfare AS Fare, T.BreezecardNum AS BNumber
        FROM Trip AS T, Station AS SS, Station AS DS, Passenger AS P, Breezecard AS B
        WHERE T.StartsAt = SS.StopID
        AND T.EndsAt = DS.StopID
        AND T.BreezecardNum = B.BreezecardNum
        AND B.BelongsTo = P.Username
        AND P.Username = "${req.query.username}" ${req.query.start !== '' ? 'AND T.StartTime >= \'' + req.query.start + '\'' : ''} ${req.query.end !== '' ? 'AND T.StartTime <= \'' + req.query.end + '\'' : ''}
        ORDER BY Time ${req.query.asc === 'true' ? 'ASC' : 'DESC'}`,
      (err, results) => {
        res.send({
          results,
          err: results.length ? '' : 'NOT FOUND! queryID:' + md5(JSON.stringify(req.query))
        });
      });
  });

router.route('/remove-card')
  .post((req, res) => {
    connection.query(
      `UPDATE Breezecard
        SET BelongsTo = NULL
        WHERE "${req.body.Username}" IN (
          SELECT * FROM ((
            SELECT BelongsTo
            FROM Breezecard
            GROUP BY BelongsTo
            HAVING COUNT(*) > 1) AS TGT
          )
        ) AND
        BreezecardNum = "${req.body.Number}"`,
      () => {
        res.send();
      });
  });

module.exports = router;