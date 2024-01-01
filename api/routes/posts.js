const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - desc
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         userId:
 *           type: string
 *           description: The userid of user who is creating the post 
 *         desc:
 *           type: string
 *           description: The text of the post
 *         likes:
 *           type: string
 *           description: The likes of the user
 *         comments:
 *           type: string
 *           format: email
 *           description: The comments of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: XYZ@gmail.com
 *         password: 123456
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing APIs
 * /:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *       - in: path
 *         name: desc
 *         schema:
 *           type: string
 *         required: true
 *         description: text of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post is created!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error!
 */


// create a post
router.post('/', async(req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save(); 
        res.status(200).json(savedPost);
    }catch(err) {
        res.status(500).json(err);
    }
})

//update a post
router.put('/:id', async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json('The post has been updated');
        } else {
            res.status(403).json('You can only update your post!');
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

// delete a post
router.delete('/:id', async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json('The post has been deleted');
        } else {
            res.status(403).json('You can only delete your post!');
        }
    } catch(err) {
        res.status(500).json(err);
    }
})


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing APIs
 * /:id/like:
 *   put:
 *     summary: Like or dislike a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: post id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post is liked or disliked by you!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error!
 */

// like a post
router.put('/:id/like', async(req, res) =>{
    try {
        // Like a post
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: { likes: req.body.userId } });
            res.status(200).json('The post has been liked!');
        } else {
            // Dislike a post
            await post.updateOne({$pull: { likes: req.body.userId } });
            res.status(403).json('The post has been disliked!');
        }
    } catch(err) {
        res.status(500).json(err);
    }
})


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing APIs
 * /:id:
 *   get:
 *     summary: Fetch a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Here is the post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error!
 */

// get a post
router.get('/:id', async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id).populate('Comment').exec();
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
})

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing APIs
 * /timeline2/:userId:
 *   get:
 *     summary: Fetch posts of a user and his/her followings
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post is created!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error!
 */


// get all posts
router.get('/timeline2/:userId', async(req, res) =>{
    try {
        const currentUser = await User.findById(req.params.userId).populate('Comment').exec();
        const userPosts = await Post.find({ userId: currentUser._id });

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId }).populate('Comment').exec();
            })
        );

        res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        res.status(500).json(err);
    }
})

// all users
router.get('/timeline/:userId', async (req, res) => {
	try {
	let postList = [];
	Post.find({}, function(err, posts) {
	//console.log(posts.length)
    //res.send(userMap);
    res.status(200).json(posts)
  }).populate('comments').exec();
	}
  catch (err) {
  //console.log(err)
      res.status(500).json(err);
    }
});

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing APIs
 * /onlyFollowers/:userId:
 *   get:
 *     summary: Fetch posts of only followers!
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Here are the posts by your followers!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error!
 */

// post of only follower
router.get('/onlyFollowers/:userId', async (req, res) => {
	try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();

        const friendPosts = await Promise.all(
            currentUser.followers.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        //console.log(friendPosts.length)

        res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        res.status(500).json(err);
    }
});

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing APIs
 * /onlyFollowings/:userId:
 *   get:
 *     summary: Fetch posts of only followings!
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Here are the posts by your followings!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error!
 */

// posts of only followings
router.get('/onlyFollowings/:userId', async (req, res) => {
	try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId }).populate('Comment').exec();
            })
        );
        //console.log(friendPosts.length)      
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        res.status(500).json(err);
    }
});



/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing APIs
 * /onlyFollowings/:userId:
 *   get:
 *     summary: Fetch all of your posts!
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: username
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Here is the list of your posts!
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error!
 */

// get all posts of a user
router.get('/profile/:username', async(req, res) =>{
    try {
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id}).populate('Comment').exec();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
});

// get all comments

// add a comment
router.post('/:id/comment', async(req, res) => {
        const comment = new Comment({body:req.body.txt, userId:req.body.userId, postId:req.body.postId, username: req.body.username});
        try{
            await comment.save();
            const post = await Post.findById(req.body.postId);
            await post.updateOne({$push: { comments: comment } });
            //await post.comments.push(comment);

            //await post.save(function(err) {
            //    if(err) {
            //        console.log(err)
            //    }
            //    });
            //await post.updateOne({_id:req.body.postId}, {$push: {comments:comment}});
            res.status(200).json('The comment has been added');
        
        } catch(err) {
            //console.log(res.status(500).json(err));
        }
    // create a comment
   /* console.log(req.body.postId)
    console.log(req.body.txt)
    console.log(req.body.userId)
    //const post = await Post.findById(req.params.id);
    try{
        let result = await Post.findOneAndUpdate({_id:req.body.postId}, {Comment: {body: req.body.txt, userId:req.body.userId, postId:req.body.postId}},
                    function(err,post){
                        if (err || !post) {
                            console.log(res.json({ error: err }));
                        }
                    }
                )
    } catch(err) {
        console.log(err)
    console.log(res.status(500).json(err));
    }*/
});

// delete a comment
// delete a post

module.exports = router;