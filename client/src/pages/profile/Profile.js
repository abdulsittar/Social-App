import {useState, useEffect} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './profileStyle'

function Profile({ classes }) {
    const [user, setUser] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [desc, setDesc] = useState("");
    const [city, setCity] = useState("");
    const username = useParams().username;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data);
        };

        fetchUser();
        setSelectedImage(user.profilePicture);
    }, [username])


  const handleImageInputChange = (e) => {
    console.log("handleImageInputChange");
    const file = e.target.files[0];
    console.log('Selected image:', e.target.name);
    console.log('Selected image:', file);
    // Validate file type if needed
    user.profilePicture = file;
    setSelectedImage(file);
  };

  const handleUploadFromGallery = () => {
    console.log("handleUploadFromGallery");
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Allow only image files
    input.onchange = (e) => {

      const file = e.target.files[0];
      // Validate file type if needed
      console.log('Selected image:', file);
      console.log("selected file");
      console.log(file);
      setSelectedImage(file);
      user.profilePicture = file;
    };
    input.click();
  };

  const handleUploadFromCamera = async () => {
    console.log("handleUploadFromCamera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        setInterval(() => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            setSelectedImage(blob);
          }, 'image/jpeg');
        }, 100); // Adjust the interval for capturing frames
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleUpload = async () => {
    console.log("handleUpload");
    // Handle the selected image and perform upload logic
    if (selectedImage) {
      // Implement your upload logic here (e.g., send the image to the server)
      console.log('Selected image:', selectedImage);
      const ext = selectedImage.type.split('/')
      console.log(ext);
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
        console.log('Image uploaded successfully.');
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
        <Topbar />
        <div className={classes.profile}>
          <Sidebar />
          <div className={classes.profileRight}>
            <div className={classes.profileRightTop}>
              <div className={classes.profileCover}>
                <img
                  className={classes.profileCoverImg}
                  src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.png"}
                  alt=""
                />
                <div>
                  <button onClick={handleUploadFromGallery}>Select from Gallery</button>
                  <button onClick={handleUploadFromCamera}>Take Photo</button>
                  <input accept="image/*" type="file" onChange={handleImageInputChange} style={{ display: 'none' }} />
                  <button onClick={handleUpload}>Upload Image</button>
                </div>
                <img
                  id='profileImg'
                  className={classes.profileUserImg}
                  src={selectedImage ? selectedImage : PF+"person/noAvatar.png"}
                  alt=""
                />
              </div>
              <div className={classes.profileInfo}>
                <h4 className={classes.profileInfoName}>{user.username} </h4>
                <span className={classes.profileInfoDesc}>
                  {user.desc 
                    ? `~ ${user.desc} ~` 
                    : 'No description available'
                  }
                </span>
              </div>
            </div>
            <div className={classes.profileRightBottom}>
              <Feed username={username} />
              <Rightbar user={user} />
            </div>
          </div>
        </div>
      </>
    )
}

export default withStyles(styles)(Profile);
