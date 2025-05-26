let mongo = require("mongoose");

let guestSchema = mongoose.Schema({
    guest_name: {
        type: String,
        required: true
    },
    guest_email: {
        type: String,
        required: true,
        unique: true
    },
    guest_phone: {
        type: String,
        required: true
        },
    created_at:{
        type:Date,
        default:Date.now
        }
 });

module.exports = mongo.model("Guest", guestSchema);
