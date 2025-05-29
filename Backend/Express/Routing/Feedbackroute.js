const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback } = require('../Controllers/Fedback');

// POST route to submit feedback
router.post('/feedback', submitFeedback);

// ✅ NEW: GET route to fetch all feedback
router.get('/feedback/all', getAllFeedback);

module.exports = router;