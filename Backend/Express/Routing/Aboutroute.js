const express = require('express');
const router = express.Router();
const aboutController = require('../Controllers/Aboutcontroller');

// POST /about
router.post('/about', aboutController.createAbout);

module.exports = router;
