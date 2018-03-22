const { Breezecard, Conflict } = require('../../models');

const get = (req, res) => {
  const array = [];
  const {
    owner,
    cardNumber,
    minValue,
    maxValue,
    showSuspended
  } = req.query;



  if (req.query.owner !== "null") {
      array.push("BelongsTo = '" + req.query.owner + "'");
  }
  if (req.query.cardNumber !== "null") {
      array.push("BreezecardNum = '" + req.query.cardNumber + "'");
  }
  if (req.query.minValue !== "null") {
      array.push("Value >= " + req.query.minValue);
  }
  if (req.query.maxValue !== "null") {
      array.push("Value <= " + req.query.maxValue);
  }
  if (req.query.showSuspended === "false") {
      array.push("DateTime IS NULL");
  }
  
  const condition = array.join(" AND ");
  connection.query(
      `SELECT b.BreezecardNum, b.Value, b.BelongsTo
      FROM Breezecard AS b NATURAL LEFT OUTER JOIN Conflict${condition.length !== 0 ? "\nWHERE " + condition + "\n" : ""}
      ORDER BY ${req.query.attr} ${req.query.asc === "true" ? "ASC" : "DESC"}`,
      (err, results) => {
          res.send({
              results,
              err: results.length ? "" : "NOT FOUND! errorID: " + md5(condition)
          });
      });
}

module.exports = {
    get
}