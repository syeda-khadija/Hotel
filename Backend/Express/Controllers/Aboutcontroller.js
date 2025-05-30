const AboutUs = require('../Models/Aboutus');

// Get all
exports.getAllAbout = async (req, res) => {
  try {
    const abouts = await AboutUs.find().sort({ createdAt: -1 });
    res.json(abouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create
exports.createAbout = async (req, res) => {
  try {
    const { heading, description, mission, vision } = req.body;
    const picture = req.file ? req.file.filename : null;

    const newAbout = new AboutUs({
      heading,
      description,
      mission,
      vision,
      picture,
    });

    await newAbout.save();
    res.status(201).json(newAbout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateAbout = async (req, res) => {
  try {
    const { heading, description, mission, vision } = req.body;
    const picture = req.file ? req.file.filename : undefined;

    const updatedData = {
      heading,
      description,
      mission,
      vision,
    };

    if (picture) updatedData.picture = picture;

    const updated = await AboutUs.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteAbout = async (req, res) => {
  try {
    await AboutUs.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
