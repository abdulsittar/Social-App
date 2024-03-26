const mongoose = require('mongoose');

const SelectedUsers = new mongoose.Schema({
username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true
},
available: {
    type: Boolean,
    default: true,
},
profilePicture: {
    type: String,
    default: '',
},
password: {
    type: String,
    default: '',
},
},
{timestamps: true}
);

module.exports = mongoose.model('SelectedUsers', SelectedUsers);

