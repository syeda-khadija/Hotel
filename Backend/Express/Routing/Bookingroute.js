const express = require('express');
const router = express.Router();
const { createBooking } = require('../Controllers/Bookingcontroller');

// POST /booking/create
router.post('/create', createBooking);

module.exports = router;
