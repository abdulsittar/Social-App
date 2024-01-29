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
import {styles} from './profileStyle';
import { useMediaQuery } from 'react-responsive';
import TextField from '@material-ui/core/TextField'
import { colors } from '@material-ui/core';
//import User from '../../../../api/models/User';

function Profile({ classes }) {
    
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

    useEffect(() => {
      setFollowed(currentUser.followings.includes(usr._id));
    }, [currentUser.followings, usr]);


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`)
            console.log("fetch user");
            console.log(res.data)
            setUsr(res.data);
            console.log(usr);
        };

        fetchUser();
        //setBio(usr.desc);
        //setCity(usr.city);
        //setCountry(usr.from);
        //setRelationship(usr.relationship);
        //console.log(usr.profilePicture);
        setSelectedImage(usr.profilePicture);
        setPreImage(usr.profilePicture);
    }, [username])


  const handleImageInputChange = (e) => {
    //console.log("handleImageInputChange");
    const file = e.target.files[0];
    //console.log('Selected image:', e.target.name);
    //console.log('Selected image:', file);
    // Validate file type if needed
    usr.profilePicture = file;
    setSelectedImage(file);
    setPreImage(URL.createObjectURL(file));
  };

  const handleDescription = (e) => {
    setBio(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    console.log("country value");
    console.log(country);
  };

  const handleRelationship = (e) => {
    setRelationship(e.target.value);
  };

  const handleUploadFromGallery = () => {
    //console.log("handleUploadFromGallery");
    document.getElementById('fileSeleID').innerHTML = "Select from Gallery";
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Allow only image files
    input.onchange = (e) => {
      document.getElementById('fileSeleID').innerHTML = "File is selected!";
      const file = e.target.files[0];
      // Validate file type if needed
      //console.log('Selected image:', file);
      //console.log("selected file");
      //console.log(file);
      setSelectedImage(file);
      //usr.profilePicture = file;
      setPreImage(URL.createObjectURL(file));
    };
    input.click();
  };

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${usr._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: usr._id });
      } else {
        await axios.put(`/users/${usr._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: usr._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const handleUpload = async () => {
    //console.log("handleUpload");
    // Handle the selected image and perform upload logic
    
      // Implement your upload logic here (e.g., send the image to the server)
      //console.log('Selected image:', selectedImage);

      const profData = {
        userId: usr._id,
        desc: bio,
        city: city,
        from: country,
        relationship: relationship,
      };

      const formData = new FormData();
      formData.append('id', usr._id);
      formData.append('desc', bio);
      formData.append('city', city);
      formData.append('relationship', relationship);
      formData.append('from', country);

      try {
        if (selectedImage) {
          formData.append('profilePicture', selectedImage);
          await axios.put(`/users/${usr._id}/updateProfile`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
      } 
      else 
      {
        console.log(formData);
          await axios.post(`/users/${usr._id}/updateProfile2`, profData);
      }
        //console.log('Image uploaded successfully.');
        // Handle success or any other actions after successful upload
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
      }
      const fetchUser = async () => {
        const res = await axios.get(`/users?username=${username}`)
        setUsr(res.data);
    };
    fetchUser()
  };
    return (
        <>
        <Topbar isProfile="true"/>
        <div className={classes.profile}>
          <div className={classes.profileRight}>
            <div className={classes.profileRightTop}>
              <div className={classes.profileCover}>
                <img
                  className={classes.profileCoverImg}
                  src={usr.coverPicture ? PF+usr.coverPicture : PF+"person/noCover.png"}
                  alt=""
                />
                {username == currentUser.username && (
                <div className={classes.photosInfo}>
                  <button id="fileSeleID" onClick={handleUploadFromGallery}>{"Select from Gallery"}</button>
                  <input accept="image/*" type="file" onChange={handleImageInputChange} style={{ display: 'none' }} />
                  <button onClick={handleUpload}>Save profile</button>
                </div>
                )}
                <img id='profileImg'
                  className={classes.profileUserImg}
                  src={usr.profilePicture ? PF + usr.profilePicture : PF+"person/noAvatar.png"}
                  alt=""
                />
              </div>
              <div className={classes.profileInfo}>
              {usr.username !== currentUser.username && (
          <button className={classes.rightbarFollowButton} onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
                <h4 className={classes.profileInfoName}>{usr.username} </h4>
                <input readOnly={!(usr.username == currentUser.username)}  placeholder={usr.desc? usr.desc: "Enter your biography"} className={classes.shareInput} onChange={handleDescription}  value={usr.desc? usr.desc: bio} />
                <input readOnly={!(usr.username == currentUser.username)} placeholder={usr.city? usr.city:"Enter the name of your City"} className={classes.shareInput} onChange={handleCity}  value={usr.city? usr.city: city} />
                <input readOnly={!(usr.username == currentUser.username)} placeholder={usr.from? usr.from:"Enter the name of your Country"} className={classes.shareInput} onChange={handleCountry}    value={usr.from? usr.from: country} />
                <input readOnly={!(usr.username == currentUser.username)} placeholder={usr.relationship? usr.relationship:"Whats is the status of your relationship?"} className={classes.shareInput} onChange={handleRelationship}    value={usr.relationship? usr.relationship:relationship} />
              </div>
            </div>
          <div className={classes.profileRightBottom} >
              <Feed username={username}/>
              { isMobileDevice && isTabletDevice && <Rightbar  user={usr}/>}
            </div>
        </div>
        </div>
      </>
    )
}

export default withStyles(styles)(Profile);
