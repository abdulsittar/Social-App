
import { useContext, useEffect, useState, useRef } from "react";
import { format } from 'timeago.js'
import { AuthContext } from "../../context/AuthContext";
import Icon from '@material-ui/core/Icon'
import axios from "axios"
import { MoreVert } from '@material-ui/icons';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './postStyle'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import CommentSA from '../comment/commentSA';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import SendIcon from '@mui/icons-material/Send';
import { useMediaQuery } from 'react-responsive';
//import 'emoji-mart/css/emoji-mart.css';
import InputEmoji from "react-input-emoji";
import MoodIcon from '@mui/icons-material/Mood';
import React from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { InView } from 'react-intersection-observer';
import { COLORS } from "../values/colors";
import linkifyit from 'linkify-it';

function Post({onScrolling,  post, classes, isDetail }) {
  const [comments, setComments] = useState([]);
  const inputEl = React.useRef<HTMLInputElement>(null);
  //console.log(post);
  const [like, setLike] = useState(post.likes.length);
  const [dislike, setDislike] = useState(post.dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLikedByOne, setIsLikedByOne] = useState(false);
  const [isDislikedByOne, setIsDislikedByOne] = useState(false);

  const [repost, setRepost] = useState(post.reposts? post.reposts.length: 0);
  const [rank, setRank] = useState(parseFloat(post.rank.toFixed(2)));//useState(post.reposts? post.reposts.length: 0);

  const [isReposted, setIsReposted] = useState(false);

  const [user, setUser] = useState({});
  const [text, setText] = useState('');
  const linkify = linkifyit();
  
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef(null);
  const desc = useRef();
  const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)"});
  const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)"});
  const extractUrls = require("extract-urls");
  let url = extractUrls(post?.desc? post?.desc: "testing teseting");
  const [urls, setUrls] = useState(url);
  var cover = true;

 

  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isHovered, setIsHovered] = useState(false);
  const [isDisHovered, setIsDisHovered] = useState(false);

      const handleMouseEnter = e => {
        setIsHovered(true);
      };

      const handleMouseLeave = e => {
        setIsHovered(false);
      };

      const handleDisMouseEnter = e => {
        setIsDisHovered(true);
      };

      const handleDisMouseLeave = e => {
        setIsDisHovered(false);
      };
      
      const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
      };
  //console.log("here is the url")
  //console.log(PF)
    /*const fetchComments = async () => {
    console.log("fetchComments")
    const res = await axios.get( + user._id+`?page=${index}`);
    console.log(res.data)
    console.log("fetch posts")
    if(res.data.length > 0){
      setPosts((prevItems) => [...prevItems, ...res.data
      //.sort((p1,p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);})
      ]); 
    res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      //setIndex((index) => index + 1);
      increment(index, 1);
    } else {
      //setPosts([]);
      //setIndex((index) => 0);
      //increment(index, -index);
    }

      //setPreFilter(whPosts);
      console.log(whPosts);
      //setPosts(res.data.sort((p1,p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);})); 
  };*/


  useEffect(() => {
    //setIsLiked(post.likes.includes(currentUser._id));
    //setIsLikedByOne(post.likes.length == 1)
    //setIsDisliked(post.dislikes.includes(currentUser._id));
    //setIsDislikedByOne(post.dislikes.length == 1)
    setComments(post.comments);

  }, [currentUser._id, post.likes, post.dislikes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data);
    };
    //console.log(post.comments.length)
    fetchUser();
  }, [post.userId])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(true);
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  function handleChange(text) {
    setText(text)
    console.log("enter", text);

  }

  const handleReadChange = () => {
      axios.put("/users/" + currentUser._id + "/read", { postId: post._id });
  };



  function handleOnEnter(text) {
    console.log("enter", text);
  }

  // postDetails
  const postDetailsHandler = async (e) => {
    e.preventDefault();
  };

  // submit a comment
  const submitHandler = async (e) => {
    e.preventDefault();
    const newComment = { userId: user._id, description: text,};
    try {
      const lc = await axios.post("/posts/" + post._id + "/comment", { userId: currentUser._id, username: currentUser.username, txt: text, postId: post._id });
      console.log("Posted a comment");
      console.log(lc.data)
      setComments([...comments, lc.data]);
      // refresh the page after posting something
      //window.location.reload();
    } catch (err) { 
      console.log("Posted a comment");
      console.log(err); }
  };

  /*const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    if (post.likes.length == 1){
      setIsLikedByOne(false);
    }
  };*/


  const repostHandler = async () => {
    try {
      axios.post("/posts/" + post._id + "/repost", { userId: currentUser._id });
    } catch (err) {
      console.log(err)
     }
    setRepost(isReposted ? repost + 1 : repost + 1);
    setIsReposted(true);

  };


  const likeHandler = async () => {
    //if(!isDisliked){
      try {
        const p = await axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        console.log("likeHandler");
        console.log(p);

        //console.log(p.data.likes.length);
        //if(p.data.likes.length > 0){
        const vl = Number(like) + p.data.likes
        if(vl < 0){setLike(0);}else{setLike(vl);}

        const vl2 = Number(dislike) + p.data.dislikes
        if(vl2 < 0){setDislike(0);}else{setDislike(vl2);}

        //}else{
        //  setLike(0);
        //}
        //if(p.data.dislikes.length > 0){
        
        //}else{
           // setDislike(0);
        //}

      } catch (err) { console.log(err); }
    
    //if (p.likes.length == 1){
    //  setIsLikedByOne(false);
    //}
   /* }else{
      try {
        const totLikes = axios.put("/posts/" + post._id + "/dislike", { userId: currentUser._id });

        console.log(totLikes.length);
        setDislike(totLikes.length);
        if(totLikes.length > 0){
          setIsDisliked(totLikes.includes(currentUser._id));}else{setIsDisliked(false);}
      } catch (err) {console.log(err);}
  }*/
  };

  const dislikeHandler = async () => {
    //if(!isLiked){
    try {
      const p = await axios.put("/posts/" + post._id + "/dislike", { userId: currentUser._id });
      console.log("dislike Handler");
        console.log(p);
      //if(p.data.likes.length > 0){
        const vl = Number(like) + p.data.likes
        if(vl < 0){setLike(0);}else{setLike(vl);}

        const vl2 = Number(dislike) + p.data.dislikes
        if(vl2 < 0){setDislike(0);}else{setDislike(vl2);}

      //}else{
      //  setLike(0);

      //}

      //if(p.data.dislikes.length > 0){
          //setDislike(p.data.dislikes.length);
      //}else{
      //    setDislike(0);
      //}

    } catch (err) {console.log(err);}
    
    //if (p.dislikes.length == 1){
    //  setIsDislikedByOne(false);
    //}
 /* }else{
    setIsLiked(false);

    try {
      const totLikes = axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });

      console.log(totLikes.length);
      setLike(totLikes.length);
      if(totLikes.length > 0){
        setIsLiked(totLikes.includes(currentUser._id));}else{setIsLiked(false);}

    } catch (err) { console.log(err);
    }
  }*/
  };

  const showCommentsHandler = () => {
    var bottomdiv = document.getElementsByClassName("form")
    bottomdiv.style.display="none";
  }

  function handleViewedChange(view, post) {
    /*if(view == true){
    console.log("view ", view);
    onScrolling(post._id);
    }*/
  }
  //<img src={PF + post.img} alt="" className={classes.postImg} />

  return (
    <InView as="div" onChange={(inView, entry) => handleViewedChange(inView, post)}>
    <div className={classes.post} style={{margin: isDetail && "5px 0"}} >
      <div className={classes.postWrapper}>
        <div className={classes.postTop}>
          <div className={classes.postTopLeft}>
            <Link  style={{textDecoration: 'none', color: COLORS.textColor}} to={isDetail? `/profile/${user.username}`: `/profile/${user.username}` }>
              <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="" className={classes.postProfileImg} />
            </Link>
            <Link style={{textDecoration: 'none', color: COLORS.textColor}} to={isDetail? `/profile/${user.username}`: `/profile/${user.username}`}>
            <span className={classes.postUsername}>
              {user.username}
            </span>
            </Link>
            <span className={classes.postDate}>{format(post.createdAt)}</span>
            <span className={classes.postDate} style={{margin: '0px 0px 0px 20px',}}>{" Ranking " + rank}</span>
          </div>
          { (!isDetail)?
          <div className={classes.postTopRight}>
          <Link style={{textDecoration: 'none', color: COLORS.textColor}} onClick={repostHandler}> <ArrowForwardIcon /></Link></div>: <div></div>
          }
        </div>
        <div className={classes.postCenter}>
        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
         <a
           target="blank"
           rel="noopener noreferrer"
           href={decoratedHref}
           key={key}
         >
           {decoratedText}
         </a>
       )}><div className={classes.postText} >{!isDetail && post?.desc.length > 100? <div className={classes.postText} >{post?.desc.substring(0, 100)} <Link to={{pathname:`/postdetail/${user.username}`, state:{myObj: post}}}>"...Read more"</Link></div> :post?.desc}</div></Linkify>
          
          
        </div>
        <div className={classes.postBottom}>
          <div className={classes.postBottomLeft}>
            <img src={`${PF}clike.png`} alt="" className={classes.likeIcon} onClick={likeHandler} />
            <span className={classes.postLikeCounter}>{like}</span>
                  
            <img src={`${PF}cdislike.png`} alt="" className={classes.likeIcon} onClick={dislikeHandler} />
            <span className={classes.postDislikeCounter}>{dislike}</span>
             
          </div>
          <div className={classes.postBottomRight}>
          <Link style={{textDecoration: 'none', color: COLORS.textColor}} to={{pathname:`/postdetail/${user.username}`, state:{myObj: post}}}> <div className={classes.postCommentText} >{comments.length} comments</div></Link>
          </div>
        </div>
        <div ref={ref} className={classes.commentsWrapper}  style={{ display: isVisible ? "block" : "none" }}>
        <hr className={classes.shareHr} />
        
          <div className={classes.txtnButtonRight}>
            <CardHeader
              avatar={<Avatar className={classes.smallAvatar} src={user.profilePicture? PF + user.profilePicture: PF + "person/noAvatar.png"} />}
              title={<InputEmoji className={classes.shareInput} style = {{fontSize: "15", height: "20px"}} onChange={handleChange}  onEnter={handleChange} placeholder="Write something ..." />}
              className={classes.cardHeader}/>

            <form onSubmit={submitHandler} class = "form">
              <SendIcon className={classes.sendButton2} style={{ display:"flex", margin:"0px 20px"}} type="submit" onClick={submitHandler}/>
            </form>
            </div>
            <div className={classes.commentTop}>
            {comments.slice(0).reverse().map((item, i) => {
                      //return <CommentSA key={item._id} post={post} comment={item} isDetail={false}/>
              if(isDetail===false && i < 1) {
                  return <CommentSA key={item._id} post={post} comment={item} isDetail={false}/>

              } else if(isDetail === true) {
                  return <CommentSA key={item._id} post={post} comment={item} isDetail={false}/>
                  
              }
              })
            }
        </div>
        </div>
      </div>
    </div>
    </InView>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}
export default withStyles(styles)(Post);
