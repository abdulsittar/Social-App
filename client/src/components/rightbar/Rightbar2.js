import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './rightbarStyle'

function Rightbar2({ classes }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/followers/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);


  const HomeRightbar = () => {
    return (
      <>
        <h4 className={classes.rightbarTitle}>Followers</h4>
        <ul className={classes.rightbarFriendList}>
          {friends.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className={classes.rightbar}>
      <div className={classes.rightbarWrapper}>
        {<HomeRightbar />}
      </div>
    </div>
  );
}

export default withStyles(styles)(Rightbar2);