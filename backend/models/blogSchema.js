const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
      
    },
    isNumViews: {
        type: Number,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default:false,
    },
    isdisLiked:
    {
        type: Boolean,
        default:false,
    },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    disLike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    images: [{
        contentType:String,
        data:Buffer
    }],
    author: {
        type: String,
        default: "Admin",
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);