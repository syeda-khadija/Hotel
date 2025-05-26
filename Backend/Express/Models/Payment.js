let mongo = require("mongoose");

let payment =mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
        required: true
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ['Cash', 'Credit Card', 'UPI', 'Online'],
        required: true
    },
    created_at:{
        type:Date,
        default:Date.now
        }
});

module.exports = mongo.model("Payment", payment);
