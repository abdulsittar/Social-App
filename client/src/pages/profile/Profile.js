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
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [relationship, setRelationship] = useState("");
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
        setBio(user.desc);
        setCity(user.city);
        setCountry(user.from);
        setRelationship(user.relationship);
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
    
      // Implement your upload logic here (e.g., send the image to the server)
      //console.log('Selected image:', selectedImage);

      const profData = {
        userId: user._id,
        desc: bio,
        city: city,
        from: country,
        relationship: relationship,
      };

      const formData = new FormData();
      formData.append('id', user._id);
      formData.append('desc', bio);
      formData.append('city', city);
      formData.append('relationship', relationship);
      formData.append('from', country);
      try {
        
        if (selectedImage) {
          formData.append('profilePicture', selectedImage);
          await axios.put(`/users/${user._id}/updateProfile`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
      } 
      else 
      {
        console.log(formData);
          await axios.post(`/users/${user._id}/updateProfile2`, profData);
      }
        //console.log('Image uploaded successfully.');
        // Handle success or any other actions after successful upload
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
      }
      const fetchUser = async () => {
        const res = await axios.get(`/users?username=${username}`)
        setUser(res.data);
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
                <input placeholder={user.desc? user.desc: "Enter your biography"} className={classes.shareInput} onChange={handleDescription}  value={bio} />
                <input placeholder={user.city? user.city:"Enter the name of your City"} className={classes.shareInput} onChange={handleCity}  value={city} />
                <input placeholder={user.from? user.from:"Enter the name of your Country"} className={classes.shareInput} onChange={handleCountry}    value={country} />
                <input placeholder={user.relationship? user.relationship:"Whats is the status of your relationship?"} className={classes.shareInput} onChange={handleRelationship}    value={relationship} />
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
