import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withStyles } from '@material-ui/core/styles';
import { styles } from './topbarStyle';
import { useMediaQuery } from 'react-responsive';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SimplePopover from '../popover/SimplePopover';

function Topbar({ classes, setSelectedValue }) {
    const [fv, setFv] = useState(0);
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [anchorEl, setAnchorEl] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext);

    const isMobileDevice = useMediaQuery({ query: "(min-device-width: 480px)", });
    const isTabletDevice = useMediaQuery({ query: "(min-device-width: 768px)", });
    const isLaptop = useMediaQuery({ query: "(min-device-width: 1024px)", });
    const isDesktop = useMediaQuery({ query: "(min-device-width: 1200px)", });
    const isBigScreen = useMediaQuery({ query: "(min-device-width: 1201px )", });

    const timeLineClick = (event) => {

        console.log('Clicked ' + event.currentTarget)
    };

    const openProfileDetails = (event) => {
        console.log('Clicked ' + event.currentTarget)
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
        <div className={classes.topbarContainer} style={{ 'backgroundColor': '#3e3f40', 'display': (isMobileDevice || isTabletDevice) && 'flex' }}>
            <div className={classes.topbarLeft} style={{ textDecoration: 'none', 'margin-top': (isMobileDevice || isTabletDevice) && '20px' }}>
                <Link to='/'  >
                    <span className={classes.logo}>Twin of Online Social Networks</span>
                </Link>
            </div>
            <div className={classes.topbarCenter} style={{ 'backgroundColor': '#3e3f40', 'margin-top': (isMobileDevice || isTabletDevice) && '20px', 'display':  !isMobileDevice && !isTabletDevice && 'flex'}}  >
                <div className={classes.searchbar}>
                    <Search className={classes.searchIcon} />
                    <input placeholder="Search" className={classes.searchInput} />
                </div>
                {!isMobileDevice && !isTabletDevice &&
                     <div className={classes.userInfo} style={{ alignItems: 'flex-end', 'flex-direction': 'column' }}>
                     <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
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
                }
            </div>
            <div className={classes.topbarRight} style={{ 'margin': '0', 'backgroundColor': '#3e3f40', 'margin-top': (isMobileDevice || isTabletDevice) && '20px', 'display':  'flex', 'flex':  '4', 'flex-direction':  'row' }}>
                <FormControl row={true} style={{ 'margin-left': '0', "fontSize": "10px" }}>
                    <FormLabel id="demo-radio-buttons-group-label" style={{ text: 'white', 'margin': '0' }}></FormLabel>
                    <RadioGroup style={{ 'margin': '0', "fontSize": "10px" }} aria-labelledby="demo-radio-buttons-group-label" defaultValue="0" row={true} name="radio-buttons-group" onChange={onRadioChanged}>
                        <FormControlLabel value="0" control={<Radio />} label={<span style={{ "fontSize": !isMobileDevice && !isTabletDevice && "12px"}}>{"All Posts"}</span>} />
                        <FormControlLabel value="1" control={<Radio />} label={<span style={{ "fontSize": !isMobileDevice && !isTabletDevice && "12px"}}>{"Followers"}</span>} />
                        <FormControlLabel value="2" control={<Radio />} label={<span style={{ "fontSize": !isMobileDevice && !isTabletDevice && "12px"}}>{"Followings"}</span>} />
                    </RadioGroup>
                </FormControl>
            </div>
            {(isMobileDevice || isTabletDevice) &&
            <div className={classes.topbarRight} >
                <div className={classes.userInfo} style={{ alignItems: 'flex-end', 'flex-direction': !isMobileDevice && !isTabletDevice && 'column' }}>
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
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
}
        </div>
    )
}

export default withStyles(styles)(Topbar);