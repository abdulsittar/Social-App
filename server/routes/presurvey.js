const SelectedUsers = require('../models/SelectedUser');
const PreSurvey = require('../models/PreSurvey');
const User = require('../models/User');
const IDStorage = require('../models/IDStorage');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const PostSurvey = require('../models/PostSurvey');
const conn = mongoose.createConnection(process.env.DB_URL);
var ObjectId = require('mongodb').ObjectID;

// Submit pre survey
router.post('/psurvey/:uniqId', async (req, res) => {
    try{
        console.log("herelkjkl");
        console.log(req.params.uniqId);
        const idstor = await IDStorage.find({"yourID": req.params.uniqId});
        
        const fid = idstor[0]
        //console.log(fid)
        if(fid._id){
        const newSurvey = new PreSurvey({
            "uniqueId": fid["_id"],
            "q1": req.body.q1,
            "q2": req.body.q2,
            "q3": req.body.q3,
            "q4": req.body.q4,
            "q5": req.body.q5,
            "q6": req.body.q6,
            "q7": req.body.q7,
            "q8": req.body.q8,
            "q9": req.body.q9,
            "q10": req.body.q10
        });
        console.log("newSurvey")
        //console.log(newSurvey)
        // save user and send response
        const survey = await newSurvey.save();
        //console.log(survey)
        res.status(200).json(survey);

    }else{
        res.status(400).json("Failed");

    }
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
    });
    
// Submit pre survey
router.post('/postsurvey/:uniqId', async (req, res) => {
    try{
        console.log("herelkjkl");
        //console.log(req.params.uniqId);
        const idstor = await IDStorage.find({"yourID": req.params.uniqId});
        
        const fid = idstor[0]
        //console.log(fid)
        if(fid._id){
        const newSurvey = new PostSurvey({
            "uniqueId": fid["_id"],
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

    }else{
        res.status(400).json("Failed");

    }
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
    });

// LOGIN
router.post('/isSubmitted/:val', async (req, res) => {
    try {
        console.log(req.params.val);
        const idstor = await IDStorage.find({"yourID": req.params.val});
        const fid = idstor[0]
        const idExists = await PreSurvey.find({"uniqueId": fid["_id"]});
        console.log(idExists)
        console.log(idExists[0])
        if (idExists.length > 0) {
            

            const userExist = await User.find({"uniqueId": fid["_id"]});
            console.log(userExist)
            console.log(userExist[0])
            if (userExist.length > 0) {
                const usr = {"data": true, "login": true, "user": userExist[0]}
                res.status(200).json(usr);

            }else{
                const users = await SelectedUsers.aggregate([
                    { $sample: { size: 3 } }
                  ])
                //console.log(users);
                const usr = {"data": true, "users": users}
                res.status(200).json(usr);

            }
            return
        }else{
            const usr = {"data": false}
            res.status(200).json(usr);
            return
        }
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
    })

    module.exports = router;