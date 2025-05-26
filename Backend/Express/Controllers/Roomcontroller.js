const Room = require("../Models/Room");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Email transporter
const email_info = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let roomController = {
  home: async function (req, res) {
    res.send("Room Home Page");
  },

  create_room: async function (req, res) {
    try {
      const {
        room_type,
        description,
        room_number,
        floor_no,
        no_of_bed,
        price,
        is_available,
      } = req.body;

      const check_room = await Room.findOne({ room_number });
      if (check_room) {
        return res.status(409).json({ msg: "Room number already exists" });
      }

      const image = req.file ? req.file.filename : null;
      if (!image) {
        return res.status(400).json({ msg: "Image is required" });
      }

      const room_data = new Room({
        room_type,
        description,
        room_number,
        floor_no,
        no_of_bed,
        price,
        is_available,
        image,
      });

      await room_data.save();
      res.status(200).json({ msg: "Room created successfully" });

      // Send Email Notification
      const Email_body = {
        to: process.env.EMAIL,
        from: process.env.EMAIL,
        subject: "New Room Created",
        html: `<h3>New Room Added</h3><p>Room Number: ${room_number}<br/>Type: ${room_type}</p>`,
      };

      email_info.sendMail(Email_body, function (error, info) {
        if (error) {
          console.log("Email Error:", error.message);
        } else {
          console.log("Notification email sent");
        }
      });
    } catch (error) {
      console.error(error.message);
      if (!res.headersSent) {
        res.status(500).json({ msg: "Internal server error" });
      }
    }
  },

  get_rooms: async function (req, res) {
    try {
      const rooms = await Room.find().sort({ created_at: -1 });
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  delete_room: async function (req, res) {
    try {
      const { id } = req.params;
      const room = await Room.findById(id);
      if (room) {
        await Room.findByIdAndDelete(id);
        res.status(200).json({ msg: "Room deleted successfully" });
      } else {
        res.status(404).json({ msg: "Room not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  update_room: async function (req, res) {
    try {
      const { id } = req.params;
      const {
        room_type,
        description,
        room_number,
        floor_no,
        no_of_bed,
        price,
        is_available,
      } = req.body;

      const image = req.file ? req.file.filename : undefined;

      const updateData = {
        room_type,
        description,
        room_number,
        floor_no,
        no_of_bed,
        price,
        is_available,
      };

      if (image) updateData.image = image;

      const room = await Room.findById(id);
      if (!room) {
        return res.status(404).json({ msg: "Room not found" });
      }

      await Room.findByIdAndUpdate(id, updateData);
      res.status(200).json({ msg: "Room updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = roomController;
