const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../Controllers/Fedback');

// POST /feedback
router.post('/feedback', submitFeedback);

module.exports = router;
