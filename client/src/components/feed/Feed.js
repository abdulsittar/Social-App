import {useState, useEffect} from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './feedStyle';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader/loader";

function Feed({username, classes, selectedValue}) {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(0);


    const {user} = useContext(AuthContext);
    const [followed, setFollowed] = useState([]
        //currentUser.followings.includes(user?.id)
      );

      //console.log("selected radio avlues");
      //console.log(selectedValue);
      const fetchPosts = async () => {

        //console.log("fetchpost")
        //console.log(user.feedValue)
        var whPosts = "/posts/timelinePag/";

        if(selectedValue == 0){
            whPosts = "/posts/timelinePag/"
        }
        else if (selectedValue == 1){
            whPosts = "/posts/onlyFollowers/"
        }
        else if (selectedValue == 2){
            whPosts = "/posts/onlyFollowings/"
        }

        const res = username ?  await axios.get("/posts/profile/" + username) : await axios.get(whPosts + user._id+`?page=${index}`);
        console.log(res.data)
        console.log("fetch posts")
        if(res.data.length > 0){
        setPosts((prevItems) => [...prevItems, ...res.data
            //.sort((p1,p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);})
        ]); 
        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
        setIndex((index) => index + 1);
        }
        //setPosts(res.data.sort((p1,p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);})); 
    };

    const fetchMoreData = async () => {

        //console.log("fetchpost")
        //console.log(user.feedValue)
        var whPosts = "/posts/timelinePag/";

        if(selectedValue == 0){
            whPosts = "/posts/timelinePag/"
        }
        else if (selectedValue == 1){
            whPosts = "/posts/onlyFollowers/"
        }
        else if (selectedValue == 2){
            whPosts = "/posts/onlyFollowings/"
        }

        const res = username ?  await axios.get("/posts/profile/" + username): await axios.get(whPosts + user._id+`?page=${index}`);
        console.log(res.data)
        console.log("fetch more  posts")
        if(res.data.length > 0){
            setPosts((prevItems) => [...prevItems, ...res.data
                //.sort((p1,p2) => {return new Date(p2.createdAt) - new Date(p1.createdAt);})
            ]); 
            res.data.length > 0 ? setHasMore(true) : setHasMore(false);
            setIndex((index) => index + 1);
        }
    };

    useEffect(() => {
        //console.log("selected radio avlues") 
        if (selectedValue !=10){
         fetchPosts();
        }
    }, [username, user._id, selectedValue])

    return (
        <div className={classes.feed}>
            <InfiniteScroll dataLength={posts.length} next={fetchMoreData} hasMore={hasMore} loader={<Loader />} >
            <div className={classes.feedWrapper}>
                {( !username || username === user.username) && <Share/> }
                {posts.map((p) => {
                    return <Post key={p._id} post={p}/>
                })}
            </div>
            </InfiniteScroll>
        </div>
    )
}

export default withStyles(styles)(Feed);
