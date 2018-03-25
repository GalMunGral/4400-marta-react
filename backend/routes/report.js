const md5 = require('md5');


router.route('/flow-report')
.get((req, res) => {
    const cond = `${req.query.start === "null" && req.query.end === "null" ? "" : "AND"}
    ${req.query.start !== "null" ? "T.StartTime >= " + "'" + req.query.start.substring(0, 10) + " " + req.query.start.substring(10) + "'" : ""}
    ${req.query.start !== "null" && req.query.end !== "null" ? "AND" : ""}
    ${req.query.end !== "null" ? "T.StartTime <= " + "'" + req.query.end.substring(0, 10) + " " + req.query.end.substring(10) + "'" : ""}`;
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
        ORDER BY ${req.query.attr} ${req.query.asc === "true" ? "ASC" : "DESC"}`,
        (err, results) => {
            res.send({
                results,
                err: results.length ? "" : "NOT FOUND! Time: " + new Date()
            });
        });
});

module.exports = router;