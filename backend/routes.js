const express = require('express');
const passenger = require('./passenger');
const admin = require('./admin');
const stations = require('./stations');
const auth = require('./auth');

const router = express.Router();
router.use('/auth', auth);
router.use('/stations', stations);
router.use('/passenger', passenger);
router.use('/admin', admin);

module.exports = router;