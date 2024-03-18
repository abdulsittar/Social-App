const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         profilePicture:
 *           type: string
 *           description: Currently, empty string
 *         coverPicture:
 *           type: string
 *           description: Currently, empty string
 *         followers:
 *           type: array
 *           description: The followers of the user
 *         followings:
 *           type: array
 *           description: The followings of the user
 *         viewedPosts:
 *           type: array
 *           description: The posts viewed by this user
 *         readPosts:
 *           type: array
 *           description: The posts read by this user
 *         username:
 *           type: string
 *           description: The username of the user
 *         pool:
 *           type: string
 *           description: Pool A or B
 *         description:
 *           type: string
 *           description: Biography of the user
 *         city:
 *           type: string
 *           description: City of the user
 *         from:
 *           type: string
 *           description: Country of the user
 *         relationship:
 *           type: string
 *           description: Marrital status of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         username: XYZ
 *         email: XYZ@gmail.com
 *         password: 123456
 */



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing APIs
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: username
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: email
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: password (minimum 6 alpha-numerics)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

// REGISTER USER
router.post('/register/:userId', requireUserId, async (req, res) => {
try{
    console.log("here");
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    //console.log(req.body.password)
    //console.log(salt)
    console.log(req.query.userId);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // create new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        uniqueId: req.query.userId
    });

    // save user and send response


    const user = await newUser.save();
    res.status(200).json(user);

} catch (err) {
    //console.log(err)
    res.status(500).json(err);
}
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing APIs
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: email
 *       - in: path
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: password (minimum 6 alpha-numerics)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: You are logged-In.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

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
//console.log(err)
    res.status(500).json(err);
}
})


function requireUserId(req, res, next) { 
    console.log(req.params.userId);
    console.log(req.body);
    const userId = req.params.userId;

    if (!userId) {
        console.log("id not found");
        // If userId parameter is missing, respond with an error or redirect
        return res.status(400).json({ error: 'User ID is required' });
    }
    if(process.env.USER_IDS.indexOf(userId) > -1){
        console.log("id found");
        next();

    }else{
        console.log("id not found");
        // If userId parameter is missing, respond with an error or redirect
        return res.status(400).json({ error: 'User ID is required' });
    }
    }

module.exports = router;