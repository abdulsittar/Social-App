import React from 'react';
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
import {styles} from './progressStyle';
import { useMediaQuery } from 'react-responsive';
import TextField from '@material-ui/core/TextField'
import { colors } from '@material-ui/core';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {regSw, subscribe} from '../../helper.js';
import { Line, Circle } from 'rc-progress';
import { CSSTransition } from 'react-transition-group';
import {post_info_0, post_info_1,post_q1,post_info_2,post_q2, post_q2_op1,post_q2_op2,post_q2_op3, post_q2_op4,post_q2_op5 ,post_q3 ,post_q3_op1 , post_q3_op2 , post_q3_op3 ,post_q3_op4 ,post_q3_op5 , post_info_3 , post_info_4 , post_q4 ,post_q4_op1 ,post_q4_op2 ,post_q4_op3 , post_q4_op4,post_q4_op5 ,post_q4_op6 ,post_q4_op7 ,post_q5_op1 ,post_q5_op2  ,post_q5_op3 ,post_q5_op4 ,post_q5_op5 ,post_q5_op6,post_q5_op7,post_q6_op1 ,post_q6_op2 ,post_q6_op3 ,post_q6_op4 ,post_q6_op5 ,post_q6_op6 ,post_q6_op7 ,post_q7_op1 ,post_q7_op2 ,post_q7_op3 ,post_q7_op4 ,post_q7_op5 ,post_q7_op6 ,post_q7_op7 ,post_q8_op1 , post_q8_op2,post_q8_op3 ,post_q8_op4 ,post_q8_op5 ,post_q8_op6 , post_q8_op7, post_q9_op1, post_q9_op2, post_q9_op3,post_q9_op4 ,post_q9_op5 ,post_q9_op6 , post_q9_op7, post_info_5,post_q10 ,post_q10_op1 ,post_q10_op2,post_q10_op3 ,post_q10_op4 ,post_q10_op5 ,post_q11 ,post_q11_op1 ,post_q11_op2 ,post_q11_op3 ,post_q11_op4,post_q11_op5 ,post_q12 ,post_q12_op1 ,post_q12_op2 ,post_q12_op3 ,post_q12_op4 ,post_q12_op5 ,post_q13 ,post_q13_op1 ,post_q13_op2 , post_q13_op3,post_q13_op4 , post_q13_op5,post_info_6 ,post_q14 ,post_q14_op1 ,post_q14_op2 ,post_q14_op3 , post_q14_op4,post_q14_op5 ,post_q15 ,post_q15_op1, post_q15_op2, post_q15_op3, post_q15_op4,post_q15_op5 ,post_q16 , post_q16_op1,post_q16_op2 ,post_q16_op3 ,post_q16_op4 ,post_q16_op5 ,post_q17 , post_q17_op1, post_q17_op2, post_q17_op3, post_q17_op4, post_q17_op5,post_info_7 ,post_q18, post_info_8 } from '../../constants';


function Progress({ classes }) {
    
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
    const [isProfileFetched, setIsProfileFetched] = useState(true);
    const [prevUN, setPrevUN] = useState("");
    const [percent, setPercent] = useState(10);

    const [isVisible, setIsVisible] = useState(true);

    const [value_q2, stValue_q2] = useState('option1');
    const [value_q3, stValue_q3] = useState('option1');
    const [value_q4, stValue_q4] = useState('option1');
    const [value_q4_1, stValue_q4_1] = useState('option1');
    const [value_q4_2, stValue_q4_2] = useState('option1');
    const [value_q4_3, stValue_q4_3] = useState('option1');
    const [value_q4_4, stValue_q4_4] = useState('option1');
    const [value_q4_5, stValue_q4_5] = useState('option1');

    const [value_q10, stValue_q10] = useState('option1');
    const [value_q11, stValue_q11] = useState('option1');
    const [value_q12, stValue_q12] = useState('option1');
    const [value_q13, stValue_q13] = useState('option1');
    const [value_q14, stValue_q14] = useState('option1');
    const [value_q15, stValue_q15] = useState('option1');
    const [value_q16, stValue_q16] = useState('option1');
    const [value_q17, stValue_q17] = useState('option1');
    


useEffect(() => {
  const fetchUser = async () => {
    const res = await axios.get(`/users?username=${username}`)
    console.log("fetch user");
    console.log(res.data)
    setUsr(res.data);
    console.log(usr);
    setPrevUN(username);
};
  fetchUser();
  setIsProfileFetched(false);
}, [username]);

  
  const handle_Q2_Changed = async (e) => { stValue_q2(e.target.value); };
  const handle_Q3_Changed = async (e) => { stValue_q3(e.target.value); };
  const handle_Q4_Changed = async (e) => { stValue_q4(e.target.value); };
  const handle_Q4_1_Changed = async (e) => { stValue_q4_1(e.target.value); };
  const handle_Q4_2_Changed = async (e) => { stValue_q4_2(e.target.value); };
  const handle_Q4_3_Changed = async (e) => { stValue_q4_3(e.target.value); };
  const handle_Q4_4_Changed = async (e) => { stValue_q4_4(e.target.value); };
  const handle_Q4_5_Changed = async (e) => { stValue_q4_5(e.target.value); };

  const handle_Q10_Changed = async (e) => { stValue_q10(e.target.value); };
  const handle_Q11_Changed = async (e) => { stValue_q11(e.target.value); };
  const handle_Q12_Changed = async (e) => { stValue_q12(e.target.value); };
  const handle_Q13_Changed = async (e) => { stValue_q13(e.target.value); };
  const handle_Q14_Changed = async (e) => { stValue_q14(e.target.value); };
  const handle_Q15_Changed = async (e) => { stValue_q15(e.target.value); };
  const handle_Q16_Changed = async (e) => { stValue_q16(e.target.value); };
  const handle_Q17_Changed = async (e) => { stValue_q17(e.target.value); };


  const handleClick = async (e) => {

  };

  useEffect(() => {
      setFollowed(currentUser.followings.includes(usr._id));
        //setSelectedImage(usr.profilePicture);
        setPreImage(usr.profilePicture);
    }, [currentUser.followings, usr]);


   return (
        <>
        <Topbar isProfile="true"/>
        <ToastContainer></ToastContainer>
        <div className={classes.profile}>
          <div className={classes.profileRight}>
            <div className={classes.profileRightTop}>
              <div className={classes.profileCover}>
                <img
                  className={classes.profileCoverImg}
                  src={usr.coverPicture ? PF+usr.coverPicture : PF+"person/noCover.png"}
                  alt=""
                />
                <img id='profileImg'
                  className={classes.profileUserImg}
                  src={usr.profilePicture ? PF + usr.profilePicture : PF+"person/noAvatar.png"}
                  alt=""
                />
              </div>
              <div className={classes.profileInfo}>
              {usr.username !== currentUser.username /*&& (
          {<button className={classes.rightbarFollowButton} onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>}
        )*/}
                <h4 className={classes.profileInfoName}>{usr.username} </h4>
                {/*<textarea style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.desc? usr.desc: "Enter your biography"} className={classes.shareInput} onChange={handleDescription}  />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.city? usr.city:"Enter the name of your City"} className={classes.shareInput} onChange={handleCity}   />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.from? usr.from:"Enter the name of your Country"} className={classes.shareInput} onChange={handleCountry}  />
                <input style= {{borderWidth: '1px', marginBottom: '10px'}} readOnly={!(usr.username == currentUser.username)} placeholder={usr.relationship? usr.relationship:"Whats is the status of your relationship?"} className={classes.shareInput} onChange={handleRelationship}  />*/}
              </div>
            </div>

        </div>
        </div>
        <div style= {{width: 'auto', alignItems: 'center', "margin":"50px"}}>

        <h3 className={classes.progressHead}>Progress Day 1 {percent}%</h3>
        <Line percent={percent} strokeWidth={4} strokeColor="green" className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 2 {percent}%</h3>
        <Line percent={percent} strokeWidth={4} strokeColor="green" className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 3 {percent}%</h3>
        <Line percent={percent} strokeWidth={4} strokeColor="green" className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 4 {percent}%</h3>
        <Line percent={percent} strokeWidth={4} strokeColor="green" className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 5 {percent}%</h3>
        <Line percent={percent} strokeWidth={4} strokeColor="green" className={classes.progressVal}/>
        
          {/*<Circle percent={percent} strokeWidth={4} strokeColor="green" />*/}
        </div>

          <form className={classes.form} noValidate autoComplete="off" onSubmit={handleClick}>
        <CSSTransition in={isVisible} timeout={300} classNames="fade" unmountOnExit >
      <div id='toShow'>
      <p className={classes.secon_disclaimor}>{post_info_0}</p>
      <p className={classes.secon_disclaimor}>{post_info_1}</p>
      <p className={classes.secon_disclaimor}>{post_q1}</p>
      <input className={classes.label2} placeholder={post_q1}/>

      <p className={classes.secon_disclaimor}>{post_info_2}</p>
        <p className={classes.secon_disclaimor}>{post_q2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q2 === 'option1'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q2 === 'option2'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q2 === 'option3'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option4"  checked={value_q2 === 'option4'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q2 === 'option5'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q3}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q3 === 'option1'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q3 === 'option2'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q3 === 'option3'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option4"  checked={value_q3 === 'option4'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q3 === 'option5'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_info_3}</p>
        <p className={classes.secon_disclaimor}>{post_info_4}</p>

        <p className={classes.secon_disclaimor}>{post_q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4 === 'option1'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4 === 'option2'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4 === 'option3'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4 === 'option4'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4 === 'option5'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4 === 'option6'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4 === 'option7'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q4_op7}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_1 === 'option1'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_1 === 'option2'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_1 === 'option3'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_1 === 'option4'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_1 === 'option5'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_1 === 'option6'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_1 === 'option7'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op7}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_2 === 'option1'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_2 === 'option2'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_2 === 'option3'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_2 === 'option4'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_2 === 'option5'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_2 === 'option6'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_2 === 'option7'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op7}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_3 === 'option1'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_3 === 'option2'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_3 === 'option3'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_3 === 'option4'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_3 === 'option5'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_3 === 'option6'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_3 === 'option7'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op7}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_4 === 'option1'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_4 === 'option2'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_4 === 'option3'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_4 === 'option4'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_4 === 'option5'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_4 === 'option6'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_4 === 'option7'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op7}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_5 === 'option1'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_5 === 'option2'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_5 === 'option3'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_5 === 'option4'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_5 === 'option5'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_5 === 'option6'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_5 === 'option7'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op7}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_info_5}</p>
        <p className={classes.secon_disclaimor}>{post_q10}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q10 === 'option1'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10 === 'option2'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10 === 'option3'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10 === 'option4'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q10 === 'option5'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q11}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q11 === 'option1'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q11 === 'option2'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q11 === 'option3'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q11 === 'option4'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q11 === 'option5'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q12}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q12 === 'option1'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q12 === 'option2'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q12 === 'option3'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q12 === 'option4'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q12 === 'option5'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q13}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q13 === 'option1'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q13 === 'option2'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q13 === 'option3'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q13 === 'option4'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q13 === 'option5'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op5}</span></label></div>
        </form>


        <p className={classes.secon_disclaimor}>{post_info_6}</p>
        <p className={classes.secon_disclaimor}>{post_q14}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q14 === 'option1'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q14 === 'option2'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q14 === 'option3'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q14 === 'option4'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q14 === 'option5'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q15}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q15 === 'option1'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q15 === 'option2'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q15 === 'option3'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q15 === 'option4'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q15 === 'option5'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q16}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q16 === 'option1'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q16 === 'option2'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q16 === 'option3'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q16 === 'option4'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q16 === 'option5'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_q17}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q17 === 'option1'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q17 === 'option2'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q17 === 'option3'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q17 === 'option4'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q17 === 'option5'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{post_info_7}</p>
        <p className={classes.secon_disclaimor}>{post_q18}</p>
        <input className={classes.label2} placeholder={post_q18}/>
        <p className={classes.secon_disclaimor}>{post_info_8}</p>

				<button type="submit" className={classes.button}> Submit Post Survey </button>
        </div>
        </CSSTransition>
					</form>

        
      </>
    );
  }

export default withStyles(styles)(Progress);
