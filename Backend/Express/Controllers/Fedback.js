// controllers/feedbackController.js

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    // Validation
    if (!name || !email || !feedback) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // You can save this to a database here (e.g., MongoDB, MySQL)
    console.log("Feedback received:", { name, email, feedback });

    return res.status(200).json({ msg: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback submission error:", error.message);
    return res.status(500).json({ msg: "Server error. Please try again later." });
  }
};
