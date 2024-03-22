const mongoose = require('mongoose');

const PreSurvey = new mongoose.Schema({
    q1: { type: String, required: false,},
    q2: { type: String, required: false,},
    q3: { type: String, required: false,},
    q4: { type: String, required: false,},
    q5: { type: String, required: false,},
    q6: { type: String, required: false,},
    q7: { type: String, required: false,},
    q8: { type: String, required: false,},
    q9: { type: String, required: false,},
},{
  timestamps: true 
});

module.exports = mongoose.model('PreSurvey', PreSurvey);