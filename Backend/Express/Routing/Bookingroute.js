const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",        // ✅ Replace with your email
    pass: "your-app-password",           // ✅ Use App Password or env var
  },
});

const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../Controllers/Bookingcontroller");

router.post("/create", createBooking);          // For booking form
router.get("/all", getAllBookings);             // For ShowBooking component
router.put("/update/:id", updateBookingStatus); // For Accept/Reject buttons

// Email Work
router.put("/booking/update/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("User"); // Make sure "User" is a reference in your model

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Send email to the user
    const mailOptions = {
      from: "your-email@gmail.com",
      to: booking.User.email, // assuming User model has email
      subject: `Your booking has been ${status}`,
      html: `
        <h3>Booking ${status}</h3>
        <p>Dear ${booking.User.name || "User"},</p>
        <p>Your booking from <b>${booking.arrival.slice(0, 10)}</b> to <b>${booking.departure.slice(0, 10)}</b> has been <b>${status}</b>.</p>
        <br/>
        <p>Thank you!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `Booking ${status} and email sent.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Example Node.js Express route
router.get("/booking/user/:id", async (req, res) => {
  const bookings = await Booking.find({ User: req.params.id }).populate("room");
  res.json(bookings);
});


module.exports = router;
