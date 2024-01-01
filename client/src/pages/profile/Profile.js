import {useState, useEffect} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './profileStyle';
import { useMediaQuery } from 'react-responsive';
import TextField from '@material-ui/core/TextField'
import { colors } from '@material-ui/core';
//import User from '../../../../api/models/User';

function Profile({ classes }) {
    const [user, setUser] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [preImage, setPreImage] = useState(null);
    const [desc, setDesc] = useState("");
    const [city, setCity] = useState("");
    const username = useParams().username;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data);
        };

        fetchUser();
        //console.log("picture url:");
        //console.log(user.profilePicture);
        setSelectedImage(user.profilePicture);
        setPreImage(user.profilePicture);
    }, [username])


  const handleImageInputChange = (e) => {
    //console.log("handleImageInputChange");
    const file = e.target.files[0];
    //console.log('Selected image:', e.target.name);
    //console.log('Selected image:', file);
    // Validate file type if needed
    user.profilePicture = file;
    setSelectedImage(file);
    setPreImage(URL.createObjectURL(file));
  };

  const handleUploadFromGallery = () => {
    //console.log("handleUploadFromGallery");
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Allow only image files
    input.onchange = (e) => {

      const file = e.target.files[0];
      // Validate file type if needed
      //console.log('Selected image:', file);
      //console.log("selected file");
      //console.log(file);
      setSelectedImage(file);
      //user.profilePicture = file;
      setPreImage(URL.createObjectURL(file));
    };
    input.click();
  };
  const handleUpload = async () => {
    //console.log("handleUpload");
    // Handle the selected image and perform upload logic
    if (selectedImage) {
      // Implement your upload logic here (e.g., send the image to the server)
      //console.log('Selected image:', selectedImage);
      const ext = selectedImage.type.split('/')
      //console.log(ext);
      const formData = new FormData();
      formData.append('profilePicture', selectedImage);
      formData.append('id', user._id);
      formData.append('desc', desc);
      formData.append('city', city);
      try {
        await axios.put(`/users/${user._id}/updateProfile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        //console.log('Image uploaded successfully.');
        // Handle success or any other actions after successful upload
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
      }
    } else {
      console.error('No image selected.');
    }
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
                  src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.png"}
                  alt=""
                />
                <div className={classes.photosInfo}>
                  <button onClick={handleUploadFromGallery}>Select from Gallery</button>
                  <input accept="image/*" type="file" onChange={handleImageInputChange} style={{ display: 'none' }} />
                  <button onClick={handleUpload}>Save profile</button>
                </div>
                <img
                  id='profileImg'
                  className={classes.profileUserImg}
                  src={user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"}
                  alt=""
                />
              </div>
              <div className={classes.profileInfo}>
                <h4 className={classes.profileInfoName}>{user.username} </h4>
                <TextField className={classes.profileInfoDesc} style={{color:'white'}} id="outlined-basic" label="Bio" variant="outlined" value={user.desc? `${user.desc}`: 'No description available'}/>
                <TextField className={classes.profileInfoDesc} style={{color:'white'}} id="outlined-basic" label="City" variant="outlined" value={user.city? "" : "City: " + `${user.city}`}/>
                <TextField className={classes.profileInfoDesc} style={{color:'white'}} id="outlined-basic" label="From" variant="outlined" value={user.from? "" : "From: " + `${user.from}`}/>
                <TextField className={classes.profileInfoDesc} style={{color:'white'}} id="outlined-basic" label="Relationship" variant="outlined" value={user.relationship? "" : "Relationship: " + `${user.relationship}`}/>
              </div>
            </div>
          <div className={classes.profileRightBottom}>
              <Feed username={username} />
              { isMobileDevice && isTabletDevice && <Rightbar  user={user}/>}
            </div>
        </div>
        </div>
      </>
    )
}

export default withStyles(styles)(Profile);
