let mongoose = require("mongoose");

let booking = mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  arrival: {
    type: Date,
    required: true
  },
  departure: {
    type: Date,
    required: true
  },
   no_of_person: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", booking);
