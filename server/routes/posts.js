    {const router = require('express').Router();
    const Post = require('../models/Post');
    const User = require('../models/User');
    const PostDislike = require('../models/PostDislike');
    const PostLike = require('../models/PostLike');
    const Repost = require('../models/Repost');
    
    const Comment = require('../models/Comment');
    const Subscription = require('../models/Subscription');
    const webPush = require ('web-push');
    const mongoose = require('mongoose');
    const conn = mongoose.createConnection(process.env.DB_URL);
    const { ObjectId } = require('mongodb');
    const verifyToken = require('../middleware/verifyToken');
    const axios = require('axios');
    const cheerio = require('cheerio');
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
     *           type: array
     *           description: an array of post-likes'
     *         dislikes:
     *           type: array
     *           description: an array of post-dislikes'
     *         reposts:
     *           type: array
     *           description: an array of reposts-users'
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
     * components:
     *   schemas:
     *     Postlike:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post
     *         userId:
     *           type: string
     *           description: The id of a user who is liking the post.
     *         postId:
     *           type: string
     *           description: The id of a post which is being liked.
     */

     /**
     * @swagger
     * components:
     *   schemas:
     *     Postdislike:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post
     *         userId:
     *           type: string
     *           description: The id of a user who is disliking the post.
     *         postId:
     *           type: string
     *           description: The id of a post which is being disliked.
     */


     /**
     * @swagger
     * components:
     *   schemas:
     *     Repost:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the reposted object
     *         userId:
     *           type: string
     *           description: The id of a user who is reposting the post.
     *         postId:
     *           type: string
     *           description: The id of a post which is being reposted.
     */

     /**
     * @swagger
     * components:
     *   schemas:
     *     Readpost:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post which is being read
     *         userId:
     *           type: string
     *           description: The id of the user who is reading it.
     *         postId:
     *           type: string
     *           description: The id of the post which is being read
     */

    /**
     * 
     /**
     * @swagger
     * components:
     *   schemas:
     *     Viewpost:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post which is being viewed
     *         userId:
     *           type: string
     *           description: The id of the user who is viewing it.
     *         postId:
     *           type: string
     *           description: The id of the post which is being viewed
     */

    /**



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


    const extractUrls = (text) => {
        const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
        return text.match(urlRegex) || [];
    };

    // create a post
    router.post('/:id/create',  async(req, res) => { //verifyToken, 
        console.log(req.params);
        console.log(req.body);
        var linktoAdd = ""
        var urls = extractUrls(req.body.desc);
        
        if (urls.length > 0) {
            linktoAdd = urls[0]
        }
        const newPost = new Post({userId: req.body.userId, desc: req.body.desc, thumb: linktoAdd});
        console.log(newPost);
        
        try {
            const savedPost = await newPost.save(); 
            res.status(200).json(savedPost);
        }catch(err) {
            res.status(500).json(err);
        }
        })

    //repost a post
    router.post('/:id/repost', verifyToken, async(req, res) =>{
    try {

        const postRepost = new Repost({userId:req.body.userId, postId:req.params.id});
        await postRepost.save();
        console.log(postRepost);
         console.log("postRepost is added");
         //const post = await Post.findById(req.params.id);
         await Post.findOneAndUpdate({"_id": req.params.id},{$push: { reposts: req.body.userId }});
        res.status(200).json('The post has been reposted!');

    } catch(err) {
    res.status(500).json(err);
    console.log(err)
    }
    })


    //update a post
    router.put('/:id', verifyToken, async(req, res) =>{
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

    // notification
    router.post('/subscribe', async(req, res) =>{
    console.log(req);
    const newSubscription = await Subscription.create ({...req.body});
    const options = {
    vapidDetails: {
    subject: 'mailto:myemail@example.com',
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    },
    };
    console.log(req.body)
    console.log(options)
    console.log(newSubscription.endpoint)
    try {
    const res2 = await webPush.sendNotification (
    newSubscription,
    JSON.stringify ({
    title: 'Hello from server',
    description: 'this message is coming from the server',
    image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
    }),
    options
    );
    console.log(res2);
    res.sendStatus(200);
    } catch (error) {
    console.log (error);
    res.sendStatus (500);
    }
    });

    router.post('/fetch-thumbnail', async (req, res) => {
        const { url } = req.body;

        try {
            const { data } = await axios.get(req.body.urls);
            const $ = cheerio.load(data);
    
            // Example: Extract Open Graph Image
            const thumbnail = $('meta[property="og:image"]').attr('content');
    
            if (thumbnail) {
                res.json({ thumbnail });
            } else {
                res.status(404).json({ error: 'Thumbnail not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching thumbnail' });
        }
    });


    // delete a post
    router.delete('/:id', verifyToken, async(req, res) =>{
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

    function waitForOneSecond() {
        setTimeout(() => {
          // Code to execute after 1 second
          console.log('One second has passed!');
        }, 1000); // 1000 milliseconds = 1 second
      }

// like a post
router.put('/:id/like', verifyToken, async(req, res) => {

    //const post = await Post.find({"_id":req.params.id,"PostLike.userId": ObjectId(req.body.userId), "PostDislike.userId": ObjectId(req.body.userId)}, {"PostLike.$": 1,"PostDislike.$": 1 }).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
    const post = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike", match: { "userId": req.body.userId}}, {path : "dislikes", model: "PostDislike", match: { "userId": req.body.userId}}]).sort({ createdAt: 'descending' }).exec();
    //const posttoReturn = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         
    console.log("Disliked objects");
    console.log(post.dislikes.length);
 
    //const likedObj = await PostLike.find({"postId": req.params.id, "userId" : req.body.userId})
    console.log("Liked objects");
    console.log(post.likes.length);
 
    var isAlreadyLiked = false;
    var isAlreadyDisliked = false;
 
    if(post.likes.length > 0){
     isAlreadyLiked = true
     try {
        console.log("LIKE - 1");
         const idl = new ObjectId(post.likes[0]._id)
         Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'likes': {$in: idl}}}, (err, block) => {
             console.log(err)
             console.log(block)
         });
         const dltobj = await PostLike.findByIdAndDelete({_id:idl}, (err, block) => {
             console.log(err)
             console.log(block)
         });

         const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         //console.log(post2);
         var diction = {"likes": -1, "dislikes": parseInt(0)}
         res.status(200).json(diction);
     } catch(err) {
         console.log(err);
         res.status(500).json(err);
        }
    } 
 
    else if(post.dislikes.length > 0){
     isAlreadyDisliked = true
     try{
        console.log("LIKE - 2");
         const idl = new ObjectId(post.dislikes[0]._id)
         Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'dislikes': {$in: idl}}}, (err, block) => {
             console.log(err)
             console.log(block)
         });
 
         const dltobj = await PostLike.findByIdAndDelete(idl, (err, block) => {
            console.log(err)
            console.log(block)
        });

         const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         //console.log(post2);
         var diction = {"likes": parseInt(0), "dislikes":-1 }
         res.status(200).json(diction);
     }catch(err) {
         res.status(500).json(err);
     
        }
    }
 
    if(!isAlreadyLiked){
     if(!isAlreadyDisliked){
     try {
        console.log("LIKE - 3");
         const postLike = new PostLike({userId:req.body.userId, postId:req.params.id});
         await postLike.save();
         console.log(postLike);
         console.log("postLike is added");
         //const post = await Post.findById(req.params.id);
         await Post.findOneAndUpdate({"_id": req.params.id},{$push: { likes: postLike }});
         const post2       = await Post.findById(req.params.id, { upsert:true, new: true }).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         //console.log(post2);
         var diction = {"likes": 1, "dislikes":parseInt(0) }
         res.status(200).json(diction);
 
     } catch(err) {
         console.log(err);
         res.status(500).json(err);
 
     }
 }else{
     console.log("Both are not false");
     console.log(isAlreadyLiked);
     console.log(isAlreadyDisliked);
 }
     }else{console.log(isAlreadyLiked);
     }
 });
 
 // dislike a post
 router.put('/:id/dislike', verifyToken, async(req, res) =>{
 
     const post = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike", match: { "userId": req.body.userId}}, {path : "dislikes", model: "PostDislike", match: { "userId": req.body.userId}}]).sort({ createdAt: 'descending' }).exec();
     console.log("Disliked objects");
     console.log(post.dislikes.length);
  
     //const likedObj = await PostLike.find({"postId": req.params.id, "userId" : req.body.userId})
     console.log("Liked objects");
     console.log(post.likes.length);

     var isAlreadyLiked = false;
     var isAlreadyDisliked = false;
  
     if(post.likes.length > 0){
        const idd = post.likes[0]._id
         isAlreadyLiked = true
         try {
            
            console.log("DISLIKE - 1");
            const idl = new ObjectId(idd);
            Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'likes': {$in: idl}}}, (err, block) => {
                 console.log(err)
                 console.log(block)
             });
             const dltobj = await PostLike.findByIdAndDelete({_id:idl}, (err, block) => {
                 console.log(err)
                 console.log(block)

             });

             const post = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
             console.log(post);
             var diction = {"likes": -1, "dislikes": parseInt(0)}
            res.status(200).json(diction);
             
             
         } catch(err) {
             console.log(err);
             res.status(500).json(err);
            }
        } else if(post.dislikes.length > 0){
         isAlreadyDisliked = true
         try{
            console.log("DISLIKE - 2");
             const idl = new ObjectId(post.dislikes[0]._id)
             Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'dislikes': {$in: idl}}}, (err, block) => {
                 console.log(err)
                 console.log(block)
             });
     
             const dltobj = await PostLike.findByIdAndDelete(idl, (err, block) => {
                 console.log(err)
                 console.log(block)
             });
             const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
             console.log(post2);
             var diction = {"likes": parseInt(0), "dislikes":-1 }
            res.status(200).json(diction);
             
         }catch(err) {
             res.status(500).json(err);
         
            }
        }
 
     if(!isAlreadyLiked){
         if(!isAlreadyDisliked){
         try {
        console.log("DISLIKE - 3");
         const postDislike = new PostDislike({userId:req.body.userId, postId:req.params.id});
         await postDislike.save();
         console.log(postDislike);
         console.log("postDislike is added");
 
         const post = await Post.findById(req.params.id);
         await post.updateOne({$push: { dislikes: postDislike } });
         const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         console.log(post2);
         var diction = {"likes": parseInt(0), "dislikes": 1}
         res.status(200).json(diction);
     } catch(err) {
         console.log(err);
         res.status(500).json(err);
     }
 }else{

     console.log("Both are not false");
     console.log(isAlreadyLiked);
     console.log(isAlreadyDisliked);
 }
     }else{console.log(isAlreadyLiked);
     }
 });

    // like a post
    router.put('/:id/like2', verifyToken,async(req, res) =>{
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

    // like a post
    router.put('/:id/dislike2', verifyToken, async(req, res) =>{
    try {
    // Dislike a post
    const post = await Post.findById(req.params.id);
    if(!post.dislikes.includes(req.body.userId)) {
    await post.updateOne({$push: { dislikes: req.body.userId } });
    res.status(200).json('The post has been disliked!');
    } else {
    // Dislike a post
    await post.updateOne({$pull: { dislikes: req.body.userId } });
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
    router.get('/:id', verifyToken, async(req, res) =>{
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
    router.get('/timeline2/:userId', verifyToken, async(req, res) =>{
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

    // get pagination posts
    router.get('/timelinePag/:userId', verifyToken, async(req, res) =>{
    console.log("hereherehereh");
    console.log(req.query.page);
    try {
    let page = req.query.page //starts from 0
    let posts= await getPostsPaginated(page)
    if (posts && posts.length > 0) {
        res.status(200).json(posts)
    } else {
        res.status(200).json(err);
    //console.log(res);
    }

    } catch(err) {
        res.status(500).json(err);
    }
    })


    //service
    const getPostsPaginated = async (page) => {
    let resultsPerPage = 20

    return await Post.find({})
    .populate({path : 'comments', model:'Comment', populate:[{path : "userId", model: "User"}, {path: "likes", model: "CommentLike"}, {path: "dislikes", model: "CommentDislike"}]})
    .sort({ rank: -1 })
    //.lean()
    .skip(page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    }

    // all users
    router.get('/timeline/:userId', verifyToken, async (req, res) => {
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
    router.get('/onlyFollowers/:userId', verifyToken, async (req, res) => {
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

    //service
    const getPostsPaginatedFollowers = async (page, req) => {
    let resultsPerPage = 20
    const currentUser = await User.findById(req.params.userId);
    //const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();
    let userPosts = []
    const friendPosts = await Promise.all(
    currentUser.followers.map((friendId) => {
    return Post.find({ userId: friendId })
    .populate({path : 'comments', populate:{path : "userId", model: "User"}})
    .sort({ createdAt: 'descending' })
    //.lean()
    .skip(page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    }))

    //console.log([].concat(...friendPosts))
    //const filtPost =  follPosts.sort({ createdAt: 'descending' }).lean().limit(resultsPerPage).skip(page * resultsPerPage)
    return [].concat(...friendPosts)
    }

    // post of only follower
    router.get('/onlyFollowersPag/:userId', verifyToken, async (req, res) => {
    console.log("hereherehereh");
    console.log(req.query.page);

    try {
    let page = req.query.page //starts from 0
    let posts= await getPostsPaginatedFollowers(page, req)

    if (posts && posts.length > 0) {
    res.status(200).json(posts)
    } else {
    res.status(200).json(posts);
    //console.log(res);
    }

    } catch(err) {
    //console.log(err);
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

    //service
    const getPostsPaginatedFollowings = async (page, req) => {
    let resultsPerPage = 20
    const currentUser = await User.findById(req.params.userId);
    //const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();

    const friendPosts = await Promise.all(
    currentUser.followings.map((friendId) => {
    return Post.find({ userId: friendId })
    .populate({path : 'comments', populate:{path : "userId", model: "User"}})
    .sort({ createdAt: 'descending' })
    //.lean()
    .skip(page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    }))

    let userPosts = []
    userPosts.concat(...friendPosts)
    //console.log([].concat(...friendPosts));
    //const filtPost =  follPosts.sort({ createdAt: 'descending' }).lean().limit(resultsPerPage).skip(page * resultsPerPage)
    return [].concat(...friendPosts)
    }

    // posts of only followings
    router.get('/onlyFollowingsPag/:userId', verifyToken, async (req, res) => {
    try {
    let page = req.query.page 
    const currentUser = await User.findById(req.params.userId);
    let posts= await getPostsPaginatedFollowings(page, req)
    if (posts && posts.length > 0) {
    res.status(200).json(posts)
    } else {
    res.status(200).json(posts);
    //console.log(res);
    }

    } catch(err) {
    //console.log(err);
    res.status(500).json(err);
    }
    });

    // posts of only followings
    router.get('/onlyFollowings/:userId', verifyToken, async (req, res) => {

    try {
    let page = req.query.page //starts from 0
    let posts= await getPostsPaginatedFollowings(page)
    if (posts && posts.length > 0) {
    res.status(200).json(posts)
    } else {
    //res.status(200).json("error");
    console.log(res);
    }

    } catch(err) {
    res.status(500).json(err);
    }


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
    router.get('/profile/:username', verifyToken, async(req, res) =>{
    try {
    let resultsPerPage = 20
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({userId: user._id})
    .populate({path : 'comments', populate:{path : "userId", model: "User"}})
    .sort({ createdAt: 'descending' })
    //.lean()
    .skip(req.query.page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    res.status(200).json(posts);
    } catch(err) {
    res.status(500).json(err);
    console.log(err);
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
    const comm = await Comment.findOne({postId: req.body.postId}).sort({ createdAt: 'descending' })
    //post.comments.findOne(sort=[('$natural', DESCENDING)]);
    //await post.comments.push(comment);

    //await post.save(function(err) {
    //    if(err) {
    //        console.log(err)
    //    }
    //    });
    //await post.updateOne({_id:req.body.postId}, {$push: {comments:comment}});
    res.status(200).json(comm);

    } catch(err) {
    console.log(res.status(500).json(err));
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

    module.exports = router;}