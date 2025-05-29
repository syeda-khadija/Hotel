const Booking = require('../models/Booking');
const Room = require('../Models/Room');

exports.createBooking = async (req, res) => {
  try {
    const { guest, room, arrival, departure, no_of_person } = req.body;

    if (!guest || !room || !arrival || !departure || !no_of_person) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.status(404).json({ msg: 'Room not found.' });
    }

    if (!roomData.is_available) {
      return res.status(400).json({ msg: 'Room is not available.' });
    }

    const booking = new Booking({ guest, room, arrival, departure, no_of_person });
    await booking.save();

    // Optionally, mark room as unavailable
    roomData.is_available = false;
    await roomData.save();

    res.status(201).json({ msg: 'Booking successful.', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
