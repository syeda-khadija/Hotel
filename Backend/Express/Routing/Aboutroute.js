const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const aboutController = require('../controllers/aboutController');
const multer = require('multer');

router.get('/all', aboutController.getAllAbout);
router.post('/', upload.single('picture'), aboutController.createAbout);
router.put('/:id', upload.single('picture'), aboutController.updateAbout);
router.delete('/:id', aboutController.deleteAbout);

module.exports = router;
