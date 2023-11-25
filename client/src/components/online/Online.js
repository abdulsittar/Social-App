import { withStyles } from '@material-ui/core/styles';
import {styles} from './onlineStyle';
import { Link } from "react-router-dom";

function Online({user, classes}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className={classes.rightbarFriend}>
        <Link key={user._id} to={"/profile/" + user.username} className={classes.linkToFriendProfile}>
            <div className={classes.rightbarProfileImgContainer}>
                <img src={user.profilePicture ? PF + user.profilePicture : PF+'person/noAvatar.png'} alt="" className={classes.rightbarProfileImg}/>
                <span className={classes.rightbarOnline}></span>
            </div>
            </Link>
            <span className={classes.rightbarUsername}>{user.username}</span>

        </li>
    )
}

export default withStyles(styles)(Online);
