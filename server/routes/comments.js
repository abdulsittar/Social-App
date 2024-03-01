const Comment = require('../models/Comment');
const CommentDislike = require('../models/CommentDislike');
const CommentLike = require('../models/CommentLike');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.DB_URL);
const { ObjectId } = require('mongodb');

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


// like a comment
router.put('/:id/like', async(req, res) => {

   const dislikedObj = await CommentDislike.find({"commentId": req.params.id, "userId" : req.body.userId})
   console.log("Disliked objects");
   console.log(dislikedObj.length);

   const likedObj = await CommentLike.find({"commentId": req.params.id, "userId" : req.body.userId})
   console.log("Liked objects");
   console.log(likedObj.length);

   var isAlreadyLiked = false;
   var isAlreadyDisliked = false;


   if(likedObj.length > 0){
    isAlreadyLiked = true
    try {

        const idl = new ObjectId(likedObj[0]._id)
        Comment.findOneAndUpdate({_id: req.params.id}, {$pull: {'likes': {$in: idl}}}, (err, block) => {
            console.log(err)
            console.log(block)
        });
        const dltobj = await CommentLike.findByIdAndDelete({_id:idl}, (err, block) => {
            console.log(err)
            console.log(block)
        });
        res.status(200).json(comment);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
       }
   } 

   if(dislikedObj.length > 0){
    isAlreadyDisliked = true
    try{

        const idl = new ObjectId(dislikedObj[0]._id)
        Comment.findOneAndUpdate({_id: req.params.id}, {$pull: {'dislikes': {$in: idl}}}, (err, block) => {
            console.log(err)
            console.log(block)
        });

        const dltobj = await CommentLike.findByIdAndDelete(dislikedObj[0]._id);
        res.status(200).json(comment);
    }catch(err) {
        res.status(500).json(err);
    
       }
   }


   if(!isAlreadyLiked){
    if(!isAlreadyDisliked){
    try {
        const commentLike = new CommentLike({userId:req.body.userId, commentId:req.params.id});
        await commentLike.save();
        console.log(commentLike);
        console.log("Commentlike is added");
        const comment = await Comment.findById(req.params.id);
        await comment.updateOne({$push: { likes: commentLike } });
        const comment2 = await Comment.findById(req.params.id).populate({path : "likes", model: "CommentLike"}).sort({ createdAt: 'descending' }).exec();
        console.log(comment2);
        console.log("Comment is liked");
        res.status(200).json(comment2);

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
router.put('/:id/dislike', async(req, res) =>{

    const dislikedObj = await CommentDislike.find({"commentId": req.params.id, "userId" : req.body.userId})
    console.log("Disliked objects");
    console.log(dislikedObj.length);
 
    const likedObj = await CommentLike.find({"commentId": req.params.id, "userId" : req.body.userId})
    console.log("Liked objects");
    console.log(likedObj.length);
 
    var isAlreadyLiked = false;
    var isAlreadyDisliked = false;
 
    if(likedObj.length > 0){
        isAlreadyLiked = true
        try {
    
            const idl = new ObjectId(likedObj[0]._id)
            Comment.findOneAndUpdate({_id: req.params.id}, {$pull: {'likes': {$in: idl}}}, (err, block) => {
                console.log(err)
                console.log(block)
            });
            const dltobj = await CommentLike.findByIdAndDelete({_id:idl}, (err, block) => {
                console.log(err)
                console.log(block)
            });
            res.status(200).json("Done");
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
           }
       } 
 
    if(dislikedObj.length > 0){
        isAlreadyDisliked = true
        try{
    
            const idl = new ObjectId(dislikedObj[0]._id)
            Comment.findOneAndUpdate({_id: req.params.id}, {$pull: {'dislikes': {$in: idl}}}, (err, block) => {
                console.log(err)
                console.log(block)
            });
    
            const dltobj = await CommentLike.findByIdAndDelete(dislikedObj[0]._id);
            res.status(200).json(comment);
        }catch(err) {
            res.status(500).json(err);
        
           }
       }

    if(!isAlreadyLiked){
        if(!isAlreadyDisliked){
        try {
        const commentDislike = new CommentDislike({userId:req.body.userId, commentId:req.params.id});
        await commentDislike.save();
        console.log(commentDislike);
        console.log("commentDislike is added");

        const comment = await Comment.findById(req.params.id);
        await comment.updateOne({$push: { dislikes: commentDislike } });
        console.log(comment);
        console.log("Comment is disliked");
        res.status(200).json(comment);

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


// like a comment
router.put('/:id/like2', async(req, res) =>{
console.log(req.params.id);
try {
    // Like a post
    
    const comment = await Comment.findById(req.params.id);
    console.log("testing");
    console.log(comment);
    if(!comment.likes.includes(req.body.userId)) {
        await comment.updateOne({$push: { likes: req.body.userId } });
        res.status(200).json('The comment has been liked!');
    } else {
        // Dislike a post
        await comment.updateOne({$pull: { likes: req.body.userId } });
        res.status(403).json('The comment has been disliked!');
    }
} catch(err) {
    res.status(500).json(err);
}
})

// like a post
router.put('/:id/dislike2', async(req, res) => {
try {
    // Dislike a post
    const comment = await Comment.findById(req.params.id);
    console.log("testing");
    console.log(comment)
    if(!comment.dislikes.includes(req.body.userId)) {
        await comment.updateOne({$push: { dislikes: req.body.userId } });
        res.status(200).json('The comment has been disliked!');
    } else {
        // Dislike a post
        await comment.updateOne({$pull: { dislikes: req.body.userId } });
        res.status(403).json('The comment has been disliked!');
    }
} catch(err) {
    res.status(500).json(err);
}
})


/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - username
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         body:
 *           type: string
 *           description: The text of the comment
 *         userID:
 *           type: string
 *           description: The id of the user who is commenting
 *         postId:
 *           type: string
 *           description: The id of the post where this comment will be added
 *         likes:
 *           type: array
 *           description: an array of comment-likes'
 *         dislikes:
 *           type: array
 *           description: an array of comment-dislikes'
 *         username:
 *           type: string
 *           description: The username of the user who is commenting
 *       example:
 *         username: XYZ
 *         email: XYZ@gmail.com
 *         password: 123456
 * 
 */


   /**
     * @swagger
     * components:
     *   schemas:
     *     Commentlike:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the object
     *         userId:
     *           type: string
     *           description: The id of a user who is liking the comment.
     *         postId:
     *           type: string
     *           description: The id of a comment which is being liked.
     */

     /**
     * @swagger
     * components:
     *   schemas:
     *     Commentdislike:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the object
     *         userId:
     *           type: string
     *           description: The id of a user who is disliking the comment.
     *         postId:
     *           type: string
     *           description: The id of a comment which is being disliked.
     */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing APIs
 * /:id/comment:
 *   post:
 *     summary: add a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user who is commenting
 *       - in: path
 *         name: body
 *         schema:
 *           type: string
 *         required: true
 *         description: The text of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
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

// add a comment
router.post('/:id/comment', async(req, res) => {
const comment = new Comment({body:req.body.txt, userId:req.body.userId, postId:req.body.postId, username: req.body.username});
try{
    await comment.save();
    const post = await Comment.findById(req.body.postId);
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

module.exports = router;