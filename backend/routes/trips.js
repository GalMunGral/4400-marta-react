const express = require('express');
const { Station, Passenger, Breezecard } = require('./models');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    Trip.findAll({
      attributes: ['startTime']
    })
    connection.query(
        `SELECT T.StartTime AS Time, SS.Name AS SName, DS.Name AS DName, T.Tripfare AS Fare, T.BreezecardNum AS BNumber
        FROM Trip AS T, Station AS SS, Station AS DS, Passenger AS P, Breezecard AS B
        WHERE T.StartsAt = SS.StopID
        AND T.EndsAt = DS.StopID
        AND T.BreezecardNum = B.BreezecardNum
        AND B.BelongsTo = P.Username
        AND P.Username = "${req.query.username}" ${req.query.start !== "" ? "AND T.StartTime >= '" + req.query.start + "'" : ""} ${req.query.end !== "" ? "AND T.StartTime <= '" + req.query.end + "'" : ""}
        ORDER BY Time ${req.query.asc === "true" ? "ASC" : "DESC"}`,
        (err, results) => {
            res.send({
                results,
                err: results.length ? '' : "NOT FOUND! queryID:" + md5(JSON.stringify(req.query))
            });
        });
  });
  // .post((req, res) => {
  //     connection.query(
  //         `SELECT * FROM Breezecard WHERE BreezecardNum = ${req.body.breezecardNum}`,
  //         (err, results, field) => {
  //             if (results[0].Value - req.body.currentFare >= 0) {
  //                 connection.query(
  //                     `INSERT INTO Trip VALUES (${req.body.currentFare}, "${req.body.startTime}", "${req.body.breezecardNum}", "${req.body.startID}", "${req.body.endID}")`,
  //                     (err) => {
  //                         connection.query(
  //                             `UPDATE Breezecard
  //                             SET VALUE = VALUE - ${req.body.currentFare}
  //                             WHERE BreezecardNum = ${req.body.breezecardNum}`,
  //                             () => {
  //                                 res.send({});
  //                             });
  //                     });
  //             } else {
  //                 res.send({err: "Insufficient fund!"});
  //             }
  //         });
  // });
