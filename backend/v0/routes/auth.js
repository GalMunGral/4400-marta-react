const md5 = require('md5');
const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'marta_v0',
    dateStrings: true
});

router.route('/login')
.post((req, res) => {
    connection.query(
        `SELECT * FROM User
        WHERE Username = "${req.body.username}"
        AND Password = "${md5(req.body.password)}"`,
        (err, results) => {
            if (results.length !== 0) {
                const myResult = {
                    success: true,
                    userType: results[0].IsAdmin === 1 ? "ADMIN" : "PASSENGER"
                };
                res.send(myResult);
            } else {
                res.send({
                    success: false
                });
            }
        });
});


router.route('/register')
.post((req, res) => {
    const username = () => req.body.username;
    const email = () => req.body.email;
    connection.query(
        `INSERT INTO User VALUES ("${req.body.username}", "${md5(req.body.password)}", 0)`,
        (err, results, field) => {
            connection.query(`INSERT INTO Passenger VALUES ("${username()}", "${email()}")`,
                (e1) => {
                    if (e1) {
                        res.send({err: "Username already exists!"});
                        return;
                    }
                    if (req.body.cardNo === null) {
                        connection.query(
                            `INSERT INTO Breezecard VALUES ("${Math.floor(Math.random() * Math.pow(10, 16))}", 0, "${username()}")`,
                            (e2) => {
                                if (e2) {
                                    res.send({res: "System error! Please try again later"});
                                }
                                res.send({
                                    success: true
                                });
                            });
                    } else {
                        connection.query(
                            `SELECT * FROM Breezecard WHERE BreezecardNum = "${req.body.cardNo}"`,
                            (e3, r3) => {
                                if (r3.length === 0) {
                                    connection.query(
                                        `INSERT INTO Breezecard VALUES ("${req.body.cardNo}", 0, "${req.body.username}")`,
                                        () => {
                                            res.send({
                                                success: true
                                            });
                                        });
                                } else {
                                    if (r3[0].BelongsTo === null) {
                                        connection.query(
                                            `UPDATE Breezecard
                                            SET BelongsTo = "${req.body.username}"
                                            WHERE BreezecardNum = "${req.body.cardNo}"`,
                                        () => {
                                            res.send({
                                                success: true
                                            });
                                        });
                                    } else {
                                        if (r3[0].BelongsTo !== req.body.username) {
                                            connection.query(
                                                `INSERT INTO Conflict VALUES ("${req.body.username}", "${req.body.cardNo}", NOW())`,
                                                (e6) => {
                                                    connection.query(
                                                        `INSERT INTO Breezecard VALUES ("${Math.floor(Math.random() * Math.pow(10, 16))}", 0, "${username()}")`,
                                                        (e7) => {
                                                            if (e7) {
                                                                res.send({err: "System error! Please try again later."});
                                                            }
                                                            res.send({
                                                                success: true,
                                                                err: "Card suspended!"
                                                            });
                                                        });
                                                });
                                        }
                                    }
                                }
                            });
                    }
                });
        });
});

module.exports = router;