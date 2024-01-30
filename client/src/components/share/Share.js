import { PermMedia, Label, Room, EmojiEmotions, Cancel, Height } from '@material-ui/icons';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './shareStyle';
import { useMediaQuery } from 'react-responsive';
import InputEmoji from "react-input-emoji";
import SendIcon from '@mui/icons-material/Send';

function Share({classes}) {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [text, setText] = useState('')
    const desc = useRef();
    const [file, setFile] = useState(null);
    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });

    // submit a post
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
          userId: user._id,
          desc: text,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.img = fileName;
          //console.log(newPost);
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          await axios.post("/posts", newPost);

          // refresh the page after posting something
          window.location.reload();

        } catch (err) {}
    };

    function handleChange(text) {
        setText(text)
        console.log("enter", text);
    
      }


    return (
        <div className={classes.share}>
            <div className={classes.shareWrapper}>
                <div className={classes.shareTop}>
                    <img
                        className={classes.shareProfileImg}
                        style={{height : (!isMobileDevice && !isTabletDevice)? '40px' : '50px' }}
                        src={
                        user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                    />
                    <InputEmoji
                        placeholder={"What's in your mind " + user.username + "?"}
                        className={classes.shareInput}
                        onChange={handleChange}
                        ref={desc}
                    />
                </div>
                <hr className={classes.shareHr}/>
                {file && (
                    <div className={classes.shareImgContainer}>
                        <img className={classes.shareImg} src={URL.createObjectURL(file)} alt="" />
                        <Cancel className={classes.shareCancelImg} onClick={() => setFile(null)} />
                    </div>
                )}
                <form className={classes.shareBottom} onSubmit={submitHandler}>
                    <div className={classes.shareOptions} style={{ height: "0px"}}>
                        <label htmlFor="file" className={classes.shareOption}>
                            <PermMedia htmlColor="tomato" className={classes.shareIcon} style={{ display: "none" }}/>
                            <span className={classes.shareOptionText} style={{ display: "none" }}>Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className={classes.shareOption} style={{ display: "none" }}>
                            <Label htmlColor="blue" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Tag</span>
                        </div>
                        <div className={classes.shareOption} style={{ display: "none" }}>
                            <Room  className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Location</span>
                        </div>
                        <div className={classes.shareOption} style={{ display: "none" }}>
                            <EmojiEmotions htmlColor="goldenrod" className={classes.shareIcon}/>
                            <span className={classes.shareOptionText}>Feelings</span>
                        </div>
                    </div>
                    <SendIcon style={{ align: "right" }} type="submit" onClick={submitHandler}/>
                </form>
            </div>
        </div>
    )
}

export default withStyles(styles)(Share);