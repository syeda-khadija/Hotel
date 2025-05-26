const express = require("express");
const router = express.Router();
const roomController = require("../Controllers/Roomcontroller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/create", upload.single('image'), roomController.create_room);
// Home route
router.get("/", roomController.home);

// Get all rooms
router.get("/all", roomController.get_rooms);

// Delete a room by ID
router.delete("/delete/:id", roomController.delete_room);

// Update a room by ID
router.put("/update/:id", roomController.update_room);

module.exports = router;
