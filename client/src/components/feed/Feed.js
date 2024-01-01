import {useState, useEffect} from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './feedStyle'

function Feed({username, classes, selectedValue}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    const [followed, setFollowed] = useState([]
        //currentUser.followings.includes(user?.id)
      );

      //console.log("selected radio avlues");
      //console.log(selectedValue);
      

      const fetchPosts = async () => {

        //console.log("fetchpost")
        //console.log(user.feedValue)
        var whPosts = "/posts/timeline/";

        if(selectedValue == 0){
            whPosts = "/posts/timeline/"
        }
        else if (selectedValue == 1){
            whPosts = "/posts/onlyFollowers/"
        }
        else if (selectedValue == 2){
            whPosts = "/posts/onlyFollowings/"
        }

        const res = username 
            ?  await axios.get("/posts/profile/" + username)
            : await axios.get(whPosts + user._id);
          setPosts(res.data.sort((p1,p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
          })); 
    };

    useEffect(() => {
        //console.log("selected radio avlues")
        if (selectedValue !=10){
         fetchPosts();
        }
    }, [username, user._id, selectedValue])

    return (
        <div className={classes.feed}>
            <div className={classes.feedWrapper}>
                {( !username || username === user.username) && <Share/> }
                {posts.map((p) => {
                    return <Post key={p._id} post={p}/>
                })}
            </div>
        </div>
    )
}

export default withStyles(styles)(Feed);
