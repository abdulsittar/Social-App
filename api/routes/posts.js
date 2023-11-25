const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

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


// like a post
router.put('/:id/like', async(req, res) =>{
    try {
        // Like a post
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: { likes: req.body.userId } });
            res.status(200).json('The post has been liked');
        } else {
            // Dislike a post
            await post.updateOne({$pull: { likes: req.body.userId } });
            res.status(403).json('Post disliked!');
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

// get a post
router.get('/:id', async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id).populate('Comment').exec();
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
})

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
	console.log(posts.length)
    //res.send(userMap);
    res.status(200).json(posts)
  }).populate('comments').exec();
	}
  catch (err) {
  console.log(err)
      res.status(500).json(err);
    }
});


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
        console.log(friendPosts.length)

        res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        res.status(500).json(err);
    }
});


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
        console.log(friendPosts.length)      
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        res.status(500).json(err);
    }
});

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