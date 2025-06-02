let mongoose = require("mongoose");

let booking = mongoose.Schema({
   User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel_user",
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
  },status:{
    type:String,
    default:"pending"
    
  }
});

module.exports = mongoose.model("Booking", booking);
