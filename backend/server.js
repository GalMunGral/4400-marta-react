const express = require("express");
const bodyParser = require("body-parser");

const PORT = 8081;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
    });
    res.end();
  } else {
    next();
  }
});

const router = express.Router();

router.use("/auth", require("./routes/auth"));
router.use("/stations", require("./routes/stations"));
router.use("/passenger", require("./routes/passenger"));
router.use("/admin", require("./routes/admin"));

app.use("/api", router);

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on port ${PORT}!`);
  }
});
