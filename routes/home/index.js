const express = require('express');
const HomeController = require('./HomeController');

const router = express.Router();

/* GET homepage */
router.get('/', HomeController.index);

module.exports = router;
