const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER USER
router.post('/register', async (req, res) => {
    try{
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        console.log(req.body.password)
        console.log(salt)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save user and send response
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
		console.log(err)
        res.status(500).json(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(404).json("user not found");
            return
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword){
             res.status(404).json("wrong password");
            return
        }
        res.status(200).json(user);

    } catch(err) {
    console.log(err)
      res.status(500)
    }
})

module.exports = router;