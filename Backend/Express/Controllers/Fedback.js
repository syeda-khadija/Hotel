const Feedback = require('../Models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    if (!name || !email || !feedback) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();

    res.status(200).json({ msg: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }

};
exports.getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(allFeedback);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch feedback' });
  }
};