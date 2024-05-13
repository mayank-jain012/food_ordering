const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model('Coupon', couponSchema)

//Export the model