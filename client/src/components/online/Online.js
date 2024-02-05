import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './onlineStyle';
import { Link } from "react-router-dom";
import {COLORS} from '../values/colors.js';

function Online({user, classes}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className={classes.rightbarFriend}>
        <Link  style={{textDecoration: 'none'}} key={user._id} to={"/profile/" + user.username}>
            <div className={classes.rightbarProfileImgContainer}>
                <img src={user.profilePicture ? PF + user.profilePicture : PF+'person/noAvatar.png'} alt="" className={classes.rightbarProfileImg}/>
                <span className={classes.rightbarOnline}></span>
            </div>
            </Link>
            <Link  style={{textDecoration: 'none', 'color': COLORS.textColor}} key={user._id} to={"/profile/" + user.username}>
            <span className={classes.rightbarUsername}>{user.username}</span>
            </Link>

        </li>
    )
}

export default withStyles(styles)(Online);
