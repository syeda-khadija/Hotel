const mongo = require('mongoose');

const feedbackSchema = mongo.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    created_at:{
        type:Date,
        default:Date.now
    },
  },
 
);

module.exports = mongo.model('Feedback', feedbackSchema);