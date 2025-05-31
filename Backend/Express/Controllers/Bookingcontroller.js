const Booking = require("../Models/Booking");
const Room = require("../Models/Room");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { User, room, arrival, departure, no_of_person } = req.body;

    if (!User || !room || !arrival || !departure || !no_of_person) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.status(404).json({ msg: "Room not found." });
    }

    if (!roomData.is_available) {
      return res.status(400).json({ msg: "Room is not available." });
    }

    const booking = new Booking({
      User,
      room,
      arrival,
      departure,
      no_of_person,
      status: "Pending", // default
    });

    await booking.save();

    // Optionally mark room as unavailable
    roomData.is_available = false;
    await roomData.save();

    res.status(201).json({ msg: "Booking successful.", booking });
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ msg: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    if (status === "Rejected") {
      const deleted = await Booking.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "Booking not found" });
      }
      return res.status(200).json({ message: "Booking rejected and deleted successfully!" });
    }

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking accepted successfully!", booking: updated });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
};

