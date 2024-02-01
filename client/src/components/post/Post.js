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

function Post({ post, classes, isDetail }) {
  const [comments, setComments] = useState([]);
  const inputEl = React.useRef<HTMLInputElement>(null);
  //console.log(post);
  const [like, setLike] = useState(post.likes.length);
  const [dislike, setDislike] = useState(post.dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLikedByOne, setIsLikedByOne] = useState(false);
  const [isDislikedByOne, setIsDislikedByOne] = useState(false);
  const [user, setUser] = useState({});
  const [text, setText] = useState('')
  
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
    setIsLiked(post.likes.includes(currentUser._id));
    setIsLikedByOne(post.likes.length == 1)
    setIsDisliked(post.dislikes.includes(currentUser._id));
    setIsDislikedByOne(post.dislikes.length == 1)
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

  function handleViewedChange(view) {
    console.log("view ", view);
    if(view == true){
      axios.put("/users/" + currentUser._id + "/viewed", { postId: post._id });

    }
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

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    if (post.likes.length == 1){
      setIsLikedByOne(false);
    }
  };

  const dislikeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/dislike", { userId: currentUser._id });
    } catch (err) { }
    setDislike(isDisliked ? dislike - 1 : dislike + 1);
    setIsDisliked(!isDisliked);
    if (post.dislikes.length == 1){
      setIsDislikedByOne(false);
    }
  };

  const showCommentsHandler = () => {
    var bottomdiv = document.getElementsByClassName("form")
    bottomdiv.style.display="none";
  }


  return (
    <InView as="div" onChange={(inView, entry) => handleViewedChange(inView)}>
    <div className={classes.post} style={{margin: isDetail && "5px 0"}} >
      <div className={classes.postWrapper}>
        <div className={classes.postTop}>
          <div className={classes.postTopLeft}>
            <Link  style={{textDecoration: 'none', color: '#FFF'}} to={`profile/${user.username}`}>
              <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="" className={classes.postProfileImg} />
            </Link>
            <Link style={{textDecoration: 'none', color: '#FFF'}} to={`profile/${user.username}`}>
            <span className={classes.postUsername}>
              {user.username}
            </span>
            </Link>
            <span className={classes.postDate}>{format(post.createdAt)}</span>
          </div>
          { (!isDetail)?
          <div className={classes.postTopRight}>
          <Link style={{textDecoration: 'none', color: '#FFF'}} to={{pathname:`/postdetail/${user.username}`, state:{myObj: post}}}> <ArrowForwardIcon /></Link></div>: <div></div>
          }
        </div>
        <div className={classes.postCenter}>
        <Linkify><div className={classes.postText}>{post?.desc}</div></Linkify>
          <img src={PF + post.img} alt="" className={classes.postImg} />
          
        </div>
        <div className={classes.postBottom}>
          <div className={classes.postBottomLeft}>
            <img src={`${PF}like.png`} alt="" className={classes.likeIcon} onClick={likeHandler} />
            <span className={classes.postLikeCounter}>{like}</span>
                  
            <img src={`${PF}dislike.png`} alt="" className={classes.likeIcon} onClick={dislikeHandler} />
            <span className={classes.postDislikeCounter}>{dislike}</span>
             
          </div>
          <div className={classes.postBottomRight}>
            <div className={classes.postCommentText} onClick={(e) => { e.stopPropagation(); setIsVisible(!isVisible);}} >{comments.length} comments</div>
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
            
            {comments.slice(0).reverse().map((item, i) => {
                      //return <CommentSA key={item._id} post={post} comment={item} isDetail={false}/>
              if(isDetail===false && i < 2) {
                  return <CommentSA key={item._id} post={post} comment={item} isDetail={false}/>

              } else if(isDetail === true) {
                  return <CommentSA key={item._id} post={post} comment={item} isDetail={false}/>
                  
              }
              })
            }
        
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
