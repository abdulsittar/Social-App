const IDStorage = require('../models/IDStorage');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.DB_URL);
const { ObjectId } = require('mongodb');

router.post('/getKey/:uniqueId', async (req, res) => {
    try {
    const idstor = await IDStorage.find({"_id": req.params.uniqueId});
    console.log(idstor)
        const fid = idstor[0]
        console.log("Key")
        console.log(fid)
        res.status(200).json({"key":fid.yourID});
        return

    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
    })

    module.exports = router;