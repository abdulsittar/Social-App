import { useContext, useEffect, useState, useRef } from "react";
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import Icon from '@material-ui/core/Icon'
import axios from "axios"
import { MoreVert } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './postStyle'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import CommentSA from '../comment/commentSA';
import PropTypes from 'prop-types'

function Post({ post, classes }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedByOne, setIsLikedByOne] = useState(false);
  const [user, setUser] = useState({});
  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const desc = useRef();
  
  var cover = true;

  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
    setIsLikedByOne(post.likes.length == 1)
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      setUser(res.data);
    };
    console.log(post.comments.length)
    fetchUser();

  }, [post.userId])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleChange = event => {
    setText(event.target.value)
  }

  // submit a comment
  const submitHandler = async (e) => {
    e.preventDefault();
    const newComment = {
      userId: user._id,
      description: text,
    };
    try {
      await axios.post("/posts/" + post._id + "/comment", { userId: currentUser._id, username: currentUser.username, txt: text, postId: post._id });
      // refresh the page after posting something
      window.location.reload();
    } catch (err) { console.log(err) }
  };

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const showCommentsHandler = () => {
    var bottomdiv = document.getElementsByClassName("form")
    bottomdiv.style.display="none";
    

  }

  const commentBody = item => {
    console.log(item)
    console.log(item.userId)
    console.log(item.body)
    console.log(item.username)
    console.log(item.postId)
    console.log(item.createdAt)
    return (
      <p className={classes.commentText}>
        <Link to={"/user/" + item.userId}>{item.username}</Link>
        <br />
        {item.body}{'   '}
        <span className={classes.postDate}>
          {format(item.createdAt)} || {'   '}
          {currentUser._id === item.userId &&
            <button className={classes.sendButton} type="submit" >Delete</button>
            //<Icon className={classes.dltButton}>Delete</Icon>
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
            <Link to={`profile/${user.username}`}>
              <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="" className={classes.postProfileImg} />
            </Link>
            <span className={classes.postUsername}>
              {user.username}
            </span>
            <span className={classes.postDate}>{format(post.createdAt)}</span>
          </div>
          <div className={classes.postTopRight}>
            <MoreVert />
          </div>
        </div>
        <div className={classes.postCenter}>
          <span className={classes.postText}>{post?.desc}</span>
          <img src={PF + post.img} alt="" className={classes.postImg} />
        </div>
        <div className={classes.postBottom}>
          <div className={classes.postBottomLeft}>
            <img src={`${PF}like.png`} alt="" className={classes.likeIcon} style={{ display: "none" }} onClick={likeHandler} />
            <img src={`${PF}heart.png`} alt="" className={classes.likeIcon} onClick={likeHandler} />
            {isLiked ? <span className={classes.postLikeCounter}>{isLikedByOne ? "you only " : "you and " + (like - 1).toString() + " others"} liked it</span>  :  <span className={classes.postLikeCounter}>{like} liked it</span>} 
          </div>
          <div className={classes.postBottomRight}>
            <div className={classes.postCommentText} onClick={(e) => { e.stopPropagation(); setIsVisible(!isVisible);}} >{post.comment} comments</div>
          </div>
        </div>
        <div ref={ref} className={classes.commentsWrapper}  style={{ display: isVisible ? "block" : "none" }}>
        <hr className={classes.shareHr} />
        <form onSubmit={submitHandler} class = "form">
          <div className={classes.txtnButtonRight}>
            <CardHeader
              avatar={ <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + currentUser._id} />}
              title={<TextField multiline onChange={handleChange} ref={desc} placeholder="Write something ..." className={classes.shareInput} margin="normal"/>}
              className={classes.cardHeader}
            />
            <button className={classes.sendButton} type="submit" >Send</button>
            </div>
            {post.comments.map((item, i) => {
              console.log(item)
              console.log(i)

              return <CardHeader
                avatar={<Avatar className={classes.smallAvatar} src={'/api/users/photo/' + item.postId} />}
                title={commentBody(item)}
                className={classes.cardHeader2}
                key={i} />
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
