import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './topbarStyle';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SimplePopover from '../popover/SimplePopover';

function Topbar({ classes,  setSelectedValue }) {
    const [fv, setFv] = useState(0);
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [anchorEl, setAnchorEl] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    


    const timeLineClick = (event) => {

    console.log('Clicked ' + event.currentTarget )
    };

    const openProfileDetails = (event) => {
        console.log('Clicked ' + event.currentTarget )
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const onRadioChanged = e => {
    
        console.log("radio avlues")
        console.log(e.target.value)
        setSelectedValue(e.target.value)
        

        //setUpdatedPosts(e.target.value)
        //dispatch({ type: "RADIO", payload: e.target.value });
        //this.props.fetchPosts(e.target.value)
    };



    return (
        <div className={classes.topbarContainer}>
            <div className={classes.topbarLeft}>
            <Link to='/' style={{textDecoration: 'none'}}>
                <span className={classes.logo}>Twin of Online Social Networks</span>
            </Link>
            </div>
            <div className={classes.topbarCenter}>
                <div className={classes.searchbar}>
                    <Search className={classes.searchIcon}/>
                    <input placeholder="Search" className={classes.searchInput} />
                </div>
            </div>
            <div className={classes.topbarRight}>
            <div className={classes.topbarLinks2}>
                    <span style={{'fontSize': '20px', 'color':'white'}}>Posts</span>
                </div>
            <FormControl row={true}>
                <FormLabel id="demo-radio-buttons-group-label" style={{text:'white'}}></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="0"
                    row={true}
                    name="radio-buttons-group"
                    onChange={onRadioChanged}
                    
                >
                <FormControlLabel value="0" control={<Radio />} label="All" />
                <FormControlLabel value="1" control={<Radio />} label="Followers" />
                <FormControlLabel value="2" control={<Radio />} label="Followings" />
            </RadioGroup>
            </FormControl>
   
                <div className={classes.userInfo}>
                    <Link to={`/profile/${user.username}`} style={{textDecoration:'none', display: 'flex', alignItems: 'center'}}>
                        <img
                            src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                            className={classes.topbarImg}
                        />
                        <p className={classes.username}>{user.username}</p>
                    </Link>
                    <KeyboardArrowDownIcon className={classes.downArrow} onClick={openProfileDetails} />
                    <SimplePopover anchorEl={anchorEl} handleClose={handleClose} />
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Topbar);