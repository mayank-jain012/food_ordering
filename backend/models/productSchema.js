const mongoose = require('mongoose'); // Erase if already required
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique:false
    },
    slug: {
        type: String,
        required: true,
        unique: true,
      },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
        select: false
    },
    
    tags: [],
    images: [{
        data: Buffer,
        contentType: String
    }],
    rating: [{
        star: Number,
        comment: String,
        postedby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    totalrating: {
        type: String,
        default: 0
    }
},
    {
        timestamps: true
    });

//Export the model
module.exports = mongoose.model('Product', productSchema);