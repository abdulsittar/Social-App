const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        max: 500
    },
    img:{
        type: String
    },
    likes: {
        type:Array,
        default:[]
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment'
        }],
    postedBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }},
{timestamps: true}
);

module.exports = mongoose.model('Post', PostSchema);

