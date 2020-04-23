const express = require("express");
const mysql = require("mysql2");
const md5 = require("md5");
const config = require("../db.config");

const router = express.Router();
const connection = mysql.createConnection(config);

router.route("/my-cards").get((req, res) => {
  connection.query(
    `SELECT BreezecardNum, Value FROM Breezecard
      WHERE BelongsTo = "${req.query.user}"`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send({
        results,
      });
    }
  );
});

router.route("/complete-trip").post((req, res) => {
  const { breezecardNum, currentFare, startTime, startID, endID } = req.body;
  connection.query(
    `SELECT * FROM Breezecard WHERE BreezecardNum = ${breezecardNum}`,
    (err, results) => {
      if (err) res.status(500).send(err);
      if (results[0].Value - req.body.currentFare >= 0) {
        connection.query(
          `INSERT INTO Trip VALUES (${currentFare}, "${startTime}", "${breezecardNum}", "${startID}", "${endID}")`,
          (err) => {
            if (err) res.status(500).send(err);
            connection.query(
              `UPDATE Breezecard
                SET VALUE = VALUE - ${currentFare}
                WHERE BreezecardNum = ${breezecardNum}`,
              (err) => {
                if (err) res.status(500).send(err);
                res.send();
              }
            );
          }
        );
      } else {
        res.status(500).send({ err: "Insufficient fund!" });
      }
    }
  );
});

router.route("/new-card").post((req, res) => {
  const { newNumber, username } = req.body;
  connection.query(
    `SELECT * FROM Breezecard WHERE BreezecardNum = "${newNumber}"`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) {
        connection.query(
          `INSERT INTO Breezecard VALUES ("${newNumber}", 0, "${username}")`,
          (err, results) => {
            if (err) return res.status(500).send(err);
            return res.send(results);
          }
        );
      } else {
        if (results[0].BelongsTo === null) {
          connection.query(
            `UPDATE Breezecard
              SET BelongsTo = "${username}"
              WHERE BreezecardNum = "${newNumber}"`,
            (err, results) => {
              if (err) return res.status(500).send(err);
              return res.send(results);
            }
          );
        } else {
          if (results[0].BelongsTo !== username) {
            connection.query(
              `INSERT INTO Conflict VALUES ("${username}", "${newNumber}", NOW())`,
              (err) => {
                if (err) return res.status(500).send(err);
              }
            );
          } else {
            return res.status(500).send({
              err: "You already own this card!",
            });
          }
        }
      }
    }
  );
});

router.route("/add-value").post((req, res) => {
  connection.query(
    `UPDATE Breezecard
      SET Value = Value + ${req.body.Value}
      WHERE BreezecardNum = "${req.body.Number}"`,
    (err) => {
      if (err) res.status(500).send(err);
      res.send();
    }
  );
});

router.route("/remove-card").post((req, res) => {
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
    (err) => {
      if (err) res.status(500).send(err);
      res.send();
    }
  );
});

router.route("/trip-history").get((req, res) => {
  connection.query(
    `SELECT T.StartTime AS Time, SS.Name AS SName, DS.Name AS DName, T.Tripfare AS Fare, T.BreezecardNum AS BNumber
      FROM Trip AS T, Station AS SS, Station AS DS, Passenger AS P, Breezecard AS B
      WHERE T.StartsAt = SS.StopID
      AND T.EndsAt = DS.StopID
      AND T.BreezecardNum = B.BreezecardNum
      AND B.BelongsTo = P.Username
      AND P.Username = "${req.query.username}"
      AND T.StartTime >= "${req.query.start}"
      AND T.StartTime <= "${req.query.end}"
      ORDER BY Time ${req.query.order}`,
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(results);
    }
  );
});

module.exports = router;
