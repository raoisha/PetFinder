const express = require('express');

//
const { demoCall } = require('../controllers/demoController.js');

const router = express.Router();

// demo
router.route('/demoCall').post(demoCall);

module.exports = router;