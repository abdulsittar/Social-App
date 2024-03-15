import React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from 'react-router';
import { Add, Remove } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './progressStyle';
import { useMediaQuery } from 'react-responsive';
import TextField from '@material-ui/core/TextField'
import { colors } from '@material-ui/core';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {regSw, subscribe} from '../../helper.js';
import { Line, Circle } from 'rc-progress';

function Progress({ classes }) {
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [preImage, setPreImage] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [bio, setBio] = useState("");
    const [usr, setUsr] = useState({});
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [relationship, setRelationship] = useState("");
    const username = useParams().username;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });
    const [followed, setFollowed] = useState([]);
    const [isProfileFetched, setIsProfileFetched] = useState(true);
    const [prevUN, setPrevUN] = useState("");
    const [percent, setPercent] = useState(10);

useEffect(() => {
  const fetchUser = async () => {
    const res = await axios.get(`/users?username=${username}`)
    console.log("fetch user");
    console.log(res.data)
    setUsr(res.data);
    console.log(usr);
    setPrevUN(username);
};
  fetchUser();
  setIsProfileFetched(false);
}, [username]);


    useEffect(() => {
      setFollowed(currentUser.followings.includes(usr._id));
        //setSelectedImage(usr.profilePicture);
        setPreImage(usr.profilePicture);
    }, [currentUser.followings, usr]);


   return (
        <>
        <Topbar isProfile="true"/>
        <ToastContainer></ToastContainer>
        <div className={classes.profile}>
          <div className={classes.profileRight}>
            <div className={classes.profileRightTop}>
              <div className={classes.profileCover}>
                <img
                  className={classes.profileCoverImg}
                  src={usr.coverPicture ? PF+usr.coverPicture : PF+"person/noCover.png"}
                  alt=""
                />
                <img id='profileImg'
                  className={classes.profileUserImg}
                  src={usr.profilePicture ? PF + usr.profilePicture : PF+"person/noAvatar.png"}
                  alt=""
                />
              </div>
              <div className={classes.profileInfo}>
              {usr.username !== currentUser.username /*&& (
          {<button className={classes.rightbarFollowButton} onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>}
        )*/}
                <h4 className={classes.profileInfoName}>{usr.username} </h4>
                {/*<textarea style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.desc? usr.desc: "Enter your biography"} className={classes.shareInput} onChange={handleDescription}  />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.city? usr.city:"Enter the name of your City"} className={classes.shareInput} onChange={handleCity}   />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.from? usr.from:"Enter the name of your Country"} className={classes.shareInput} onChange={handleCountry}  />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.relationship? usr.relationship:"Whats is the status of your relationship?"} className={classes.shareInput} onChange={handleRelationship}  />*/}
              </div>
            </div>

        </div>
        </div>
        <div style= {{width: '250px'}}>
        <h3>Line Progress {percent}%</h3>
          <Line percent={percent} strokeWidth={4} strokeColor="green" />
          <Circle percent={percent} strokeWidth={4} strokeColor="green" />
        </div>
      </>
    );
  }

export default withStyles(styles)(Progress);
