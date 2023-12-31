const User = require('../models/User');
const router = require('express').Router();
const mongoose = require('mongoose');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require("fs");
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
var uniqueId = uuidv4();
const { Readable } = require('stream');

const conn = mongoose.createConnection(process.env.DB_URL);

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});






// update user
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json('Account has been updated')
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can update only your account!')
    }
})




/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Remove the user APIs
 * /:id:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

// delete user
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted successfully')
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can delete only your account!')
    }
})

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Fetch a user APIs
 * /:
 *   get:
 *     summary: Fetch a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username
 *     responses:
 *       200:
 *         description: Here is the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
// get a user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId 
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }
})

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Follow a user APIs
 * /:id/follow:
 *   put:
 *     summary: Follow a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The current user id!
 *       - in: path
 *         name: id2
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user who is going to be followed!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Here is the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

// follow a user
router.put('/:id/follow', async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push:{followers: req.body.userId}});
                await currentUser.updateOne({$push:{followings: req.params.id}});
                res.status(200).json('user has been followed');
            } else {
                res.status(403).json('You already follow this user');
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can\'t follow yourself');
    }
})

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Unfollow a user API
 * /:id/unfollow:
 *   put:
 *     summary: Unfollow a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The current user id!
 *       - in: path
 *         name: id2
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user who is going to be unfollowed!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Here is the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull:{followers: req.body.userId}});
                await currentUser.updateOne({$pull:{followings: req.params.id}});
                res.status(200).json('user has been unfollowed');
            } else {
                res.status(403).json('You dont follow this user');
            }
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You can\'t unfollow yourself');
    }
})

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Get all users API
 * /usersList2:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */


// all users
router.get('/usersList2', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
});

// all users
router.get('/usersList/:userId', async (req, res) => {
	try {
	let friendList = [];
	User.find({}, function(err, users) {
	    //console.log(users.length)
    users.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
    //res.send(userMap);
    res.status(200).json(friendList)
  });
	}
  catch (err) {
  //console.log(err)
      res.status(500).json(err);
    }
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Get all the followings API
 * /followings/:userId:
 *   get:
 *     summary: Get all the followings
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

//get friends
router.get("/followings/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Get all the followers API
 * /followers/:userId:
 *   get:
 *     summary: Get all the followers
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

//get friends
router.get("/followers/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followers.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;