const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'marta',
    dateStrings: true
});

const Sequelize = require('sequelize');
const User = sequelize.import('./models/User');

router.route('/')
.get((req, res) => {
    connection.query(
        `SELECT Name,StopID,EnterFare,ClosedStatus,IsTrain,Intersection
        FROM Station NATURAL LEFT OUTER JOIN bus_station_intersection
        ORDER BY ${req.query.attr} ${req.query.asc === "true" ? "ASC" : "DESC"}
        `,
        (err, results) => {
            console.log(err)
            res.send({
                results
            });
        }
    );
});

module.exports = router;