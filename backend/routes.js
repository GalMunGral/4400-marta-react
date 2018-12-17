const express = require('express');
const passenger = require('./routes/passenger');
const admin = require('./routes/admin');
const stations = require('./routes/stations');
const auth = require('./routes/auth');

const router = express.Router();
router.use('/auth', auth);
router.use('/stations', stations);
router.use('/passenger', passenger);
router.use('/admin', admin);

module.exports = router;