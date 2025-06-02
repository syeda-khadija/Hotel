const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Booking = require("../Models/Booking");
const Room = require("../Models/Room");

require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSKEY,
  },
});

const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
} = require("../Controllers/Bookingcontroller");

router.post("/create", createBooking);          
router.get("/all", getAllBookings);             
router.put("/update/:id", updateBookingStatus); 
router.get("/user/:user_id", getUserBookings);  // ✅ Get bookings by user ID

// ✅ Email logic when status updates
router.put("/booking/update/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("User"); // ✅ use lowercase field as in model

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const mailOptions = {
      from: process.env.EMAIL,
      to: booking.User.user_email,
      subject: `Your booking has been ${status}`,
      html: `
        <h3>Booking ${status}</h3>
        <p>Dear ${booking.User.user_name || "User"},</p>
        <p>Your booking from <b>${booking.arrival.toISOString().slice(0, 10)}</b> to <b>${booking.departure.toISOString().slice(0, 10)}</b> has been <b>${status}</b>.</p>
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
// Update booking status and optionally update room status
router.put("/booking/checkout/:id", async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    // Update the booking status
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // If booking is Checked Out, update the room status to Available
    if (status === "Checked Out") {
      await Room.findByIdAndUpdate(booking.room, { is_available: true });
    }

    res.json({ message: "Booking updated successfully", booking });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ message: err.meesage });
  }
});



module.exports = router;
