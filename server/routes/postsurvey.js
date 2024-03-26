const PostSurvey = require('../models/PostSurvey');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.DB_URL);
const { ObjectId } = require('mongodb');
const IDStorage = require('../models/IDStorage');

// Submit pre survey
router.post('/pstsurvey/:uniqId', async (req, res) => {
    try{
        console.log("herelkjkl");
        console.log(req.params.uniqId);
        const newSurvey = new PostSurvey({
            "userId": req.params.uniqId,
            "q1": req.body.q1,
            "q2": req.body.q2,
            "q3": req.body.q3,
            "q4": req.body.q4,
            "q5": req.body.q5,
            "q6": req.body.q6,
            "q7": req.body.q7,
            "q8": req.body.q8,
            "q9": req.body.q9,
            "q10": req.body.q10,
            "q11": req.body.q11,
            "q12": req.body.q12,
            "q13": req.body.q13,
            "q14": req.body.q14,
            "q15": req.body.q15,
            "q16": req.body.q16,
            "q17": req.body.q17
        });
        console.log("newSurvey")
        //console.log(newSurvey)
        // save user and send response
        const survey = await newSurvey.save();
        //console.log(survey)
        res.status(200).json(survey);
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
    });
    
    module.exports = router;