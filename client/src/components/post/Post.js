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

function Post({ post, classes, isDetail }) {
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
      await axios.post("/posts/" + post._id + "/comment", { userId: currentUser._id, username: currentUser.username, txt: text, postId: post._id });

      // refresh the page after posting something
      window.location.reload();
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

  const commentBody = item => {
    return (
      <p className={classes.commentText}>
        <Link  style={{textDecoration: 'none', color: '#FFF'}} to={`/profile/${item.username}`}>{item.username}</Link>
        <br />
        {item.body}{'   '}
        <span className={classes.postDate}>
          {format(item.createdAt)} || {'   '}
          {currentUser._id === item.userId &&
            <button className={classes.sendButton} type="submit" >Delete</button>
            //<Icon className={classes.dltButton}>Delete</Icon>
            //<LinkPreview url={urls[0]} />
            //{true && <LinkPreview url='https://www.express.pk/story/2598089/1/' width='20px' height='20px'/>}
          }
        </span>
      </p>
    )
  }
  return (
    <div className={classes.post}>
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
            <img onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} src={`${PF}like.png`} alt="" className={classes.likeIcon} onClick={likeHandler} />
            {isHovered && !isMobileDevice && !isTabletDevice ? (isLiked ? <span className={classes.postLikeCounter}>{isLikedByOne ? "you only " : "you and " + (like - 1).toString() + " others"} liked it</span>  :  <span className={classes.postLikeCounter}>{like} liked it</span>): <span className={classes.postLikeCounter}>{like}</span>}
                  
            <img onMouseOver={handleDisMouseEnter} onMouseLeave={handleDisMouseLeave} src={`${PF}dislike.png`} alt="" className={classes.likeIcon} onClick={dislikeHandler} />
            {isDisHovered  && !isMobileDevice && !isTabletDevice? (isLiked ? <span className={classes.postDislikeCounter}>{isDislikedByOne ? "you only " : "you and " + (dislike - 1).toString() + " others"} disliked it</span>  :  <span className={classes.postDislikeCounter}>{dislike} disliked it</span>): <span className={classes.postDislikeCounter}>{dislike}</span>}
             
          </div>
          <div className={classes.postBottomRight}>
            <div className={classes.postCommentText} onClick={(e) => { e.stopPropagation(); setIsVisible(!isVisible);}} >{post.comments.length} comments</div>
          </div>
        </div>
        <div ref={ref} className={classes.commentsWrapper}  style={{ display: isVisible ? "block" : "none" }}>
        <hr className={classes.shareHr} />
        
          <div className={classes.txtnButtonRight}>
            <CardHeader
              avatar={<Avatar className={classes.smallAvatar} src={user.profilePicture? PF + user.profilePicture: PF + "person/noAvatar.png"} />}
              title={
                <InputEmoji className={classes.shareInput} fontSize= "15" height ="30px" multiline onChange={handleChange}  onEnter={handleChange} placeholder="Write something ..." />}
              className={classes.cardHeader}/>
            </div>
            <form onSubmit={submitHandler} class = "form">
            <SendIcon className={classes.sendButton2} style={{ display:"flex", margin:"20px"}} type="submit" onClick={submitHandler}/>
            {post.comments.map((item, i) => {
              //console.log(item)
              console.log(i)
              if(isDetail===false && i < 2){
                return <Linkify><CardHeader
                  avatar={<Avatar className={classes.smallAvatar} src={item.userId.profilePicture? PF + item.userId.profilePicture: PF + "person/noAvatar.png"} />}
                  title={commentBody(item)}
                  className={classes.cardHeader2}
                  key={i} /></Linkify>

              } else if(isDetail === true) {

                return <Linkify><CardHeader
                  avatar={<Avatar className={classes.smallAvatar} src={item.userId.profilePicture? PF + item.userId.profilePicture: PF + "person/noAvatar.png"} />}
                  title={commentBody(item)}
                  className={classes.cardHeader2}
                  key={i} /></Linkify>
              }
              })
            }
        </form>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}
export default withStyles(styles)(Post);
