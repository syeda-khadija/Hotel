const AboutUs = require('../Models/Aboutus');

// @desc    Create About Us entry
// @route   POST /about
// @access  Public or Protected (as needed)
exports.createAbout = async (req, res) => {
  const { heading, description, mission, vision } = req.body;

  if (!heading || !description || !mission || !vision) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const aboutData = new AboutUs({ heading, description, mission, vision });
    await aboutData.save();

    res.status(201).json({ message: 'About Us details saved successfully' });
  } catch (err) {
    console.error('Error saving About Us:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
