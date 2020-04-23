const express = require("express");
const mysql = require("mysql2");
const md5 = require("md5");
const config = require("../db.config");

const router = express.Router();
const connection = mysql.createConnection(config);

router.route("/create-station").post((req, res) => {
  connection.query(
    `INSERT INTO Station VALUES 
      ("${req.body.stopID}",
      "${req.body.name}",
      ${req.body.enterFare},
      ${req.body.closedStatus},
      ${req.body.isTrain})`,
    (err) => {
      if (err) return res.status(500).send(err);
      if (!req.body.isTrain) {
        connection.query(
          `INSERT INTO BusStationIntersection VALUES
            ("${req.body.stopID}",
            "${req.body.intersection}")`,
          (err) => {
            if (err) return res.status(500).send(err);
            return res.send();
          }
        );
      } else {
        return res.send();
      }
    }
  );
});

router.route("/update-fare").post((req, res) => {
  connection.query(
    `UPDATE Station
      SET EnterFare = ${req.body.enterFare}
      WHERE StopID = "${req.body.stopID}"`,
    (err) => {
      if (err) return res.status(500).send(err);
      return res.send({});
    }
  );
});

router.route("/suspended-cards").get((_, res) => {
  connection.query(
    `SELECT BreezecardNum, Username, DateTime, BelongsTo
      FROM Breezecard NATURAL JOIN Conflict
      ORDER BY DateTime ASC`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      return res.send(results);
    }
  );
});

router.route("/resolve-conflict").post((req, res) => {
  if (req.body.shouldAssignToNewUser) {
    connection.query(
      `UPDATE Breezecard
        SET BelongsTo = "${req.body.username}"
        WHERE BreezecardNum = "${req.body.breezecardNum}"`,
      () => {
        return res.send({});
      }
    );
  }
  connection.query(
    `DELETE FROM Conflict WHERE BreezecardNum = "${req.body.breezecardNum}"`
  );
});

router.route("/breeze-cards").get((req, res) => {
  const conditions = [];
  if (req.query.username)
    conditions.push(`BelongsTo = "${req.query.username}"`);
  if (req.query.breezecardNum)
    conditions.push(`BreezecardNum = "${req.query.breezecardNum}"`);
  if (req.query.minValue) conditions.push(`Value >= ${req.query.minValue}`);
  if (req.query.maxValue) conditions.push(`Value <= ${req.query.maxValue}`);

  const whereClause =
    conditions.length > 0 ? `\nWHERE ${conditions.join(" AND ")}\n` : "";

  connection.query(
    `SELECT b.BreezecardNum, b.Value, b.BelongsTo
      FROM Breezecard AS b NATURAL LEFT OUTER JOIN Conflict\
      ${whereClause}`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      return res.send(results);
    }
  );
});

router.route("/update-card-value").post((req, res) => {
  connection.query(
    `UPDATE Breezecard
      SET Value = ${req.body.newValue}
      WHERE BreezecardNum = "${req.body.breezecardNum}"`,
    (err) => {
      if (err) return res.status(500).send();
      return res.send({});
    }
  );
});

router.route("/update-card-owner").post((req, res) => {
  connection.query(
    `UPDATE Breezecard
      SET BelongsTo = "${req.body.newOwner}"
      WHERE BreezecardNum = "${req.body.breezecardNum}"`,
    (err) => {
      if (err) return res.status(500).send(err);
      return res.send();
    }
  );
});

router.route("/flow-report").get((req, res) => {
  connection.query(
    `SELECT A.Name AS Name, InFlow, IFNULL(OutFlow, 0) AS OutFlow, (InFlow - IFNULL(OutFlow, 0)) AS Flow, A.Revenue AS Revenue
      FROM
      (SELECT S.StopID AS SID, S.Name AS Name, COUNT(*) AS Inflow, SUM(T.Tripfare) AS Revenue
      FROM Station AS S, (
        SELECT * FROM Trip
        WHERE StartTime >= "${req.query.startTime}"
        AND StartTime <= "${req.query.endTime}" 
      ) AS T
      WHERE S.StopID = T.StartsAt
      GROUP BY T.StartsAt) AS A
      LEFT OUTER JOIN
      (SELECT S.StopID AS SID, S.Name AS Name, COUNT(*) AS Outflow, SUM(T.Tripfare) AS Revenue
      FROM Station AS S, (
        SELECT * FROM Trip
        WHERE StartTime >= "${req.query.startTime}"
        AND StartTime <= "${req.query.endTime}"
      ) AS T
      WHERE S.StopID = T.EndsAt
      GROUP BY T.EndsAt) AS B
      ON A.SID = B.SID`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      return res.send(results);
    }
  );
});

module.exports = router;
