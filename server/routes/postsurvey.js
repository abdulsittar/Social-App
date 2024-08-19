const PostSurvey = require('../models/PostSurvey');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.DB_URL);
const { ObjectId } = require('mongodb');
const IDStorage = require('../models/IDStorage');
const verifyToken = require('../middleware/verifyToken');

// Submit pre survey
router.post('/pstsurvey/:userId', verifyToken, async (req, res) => {
    try{
        console.log("herelkjkl");
        console.log(req.params);
        const newSurvey = new PostSurvey({
            "userId": req.params.userId,
            "q1": req.body.survey.q1,
            "q2": req.body.survey.q2,
            "q3": req.body.survey.q3,
            "q4": req.body.survey.q4,
            "q4b": req.body.survey.q4b,
            "q5": req.body.survey.q5,
            "q6": req.body.survey.q6,
            "q7": req.body.survey.q7,
            "q8": req.body.survey.q8,
            "q9": req.body.survey.q9,
            "q10": req.body.survey.q10,
            "q11": req.body.survey.q11,
            "q12": req.body.survey.q12,
            "q13": req.body.survey.q13,
            "q14": req.body.survey.q14,
            "q15": req.body.survey.q15,
            "q16": req.body.survey.q16,
            "q17": req.body.survey.q17
        });
        console.log("newSurvey");
        //console.log(newSurvey)
        // save user and send response
        const survey = await newSurvey.save();
        //console.log(survey)
        res.status(200).json(survey);
        return
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
    });
    
    module.exports = router;