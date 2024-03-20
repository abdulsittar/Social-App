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
import {q1, q1_op1, q1_op2, q1_op3, q1_op4, q1_op5,  nein, ja, disclaimor_1, dear_part_2, wlcome_3, bitte_4,aimHEADING_5 ,aim_6 ,procedureHEADING_7 ,procedure_8 ,voluntaryHEADING_9 ,voluntary_10 ,other_11 ,dataprotHEADING_12 ,dataprot_13 ,datasharingHEADING_14 ,datasharing_15 ,retentionHEADING_16 ,retention_17 ,furtherHEADING_18 ,further_19 ,complaints_20 ,best_21 ,nme_22 ,consentHEADING_23 ,consent_24,
  stat_info, geborn, ukraine, dank, login, noteusername, q2, q2_op1 , q2_op2,q2_op3 ,q3 ,q3_op1,q3_op2 ,q3_op3,q3_op4 ,q3_op5,q3_op6,q3_op7, q4 ,q4_op1,q4_op2,q4_op3,q4_op4,q4_op5, 
  q5 , q5_op1 ,q5_op2, q5_op3 , q5_op4, q6, q6_op1, q6_op2,  q6_op3,  q6_op4,   q6_op5,  q6_op6,  q6_op7,  q6_op8,  q6_op9,  q6_op10,  q6_op11, q7 ,
  q7_op1,  q7_op2, q7_op3, q7_op4, q7_op5, q8, q8_op1, q8_op2,  q8_op3,  q8_op4, q8_op5,  q9, q9_op1, q9_op2, q9_op3,  q9_op4 ,q9_op5, q10, q10_op1 ,
  q10_op2, q10_op3 ,q10_op4 ,q10_op5 } from '../../constants';


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

    const [value_q0, stValue_q0] = useState('option2');
    const [value_q1, stValue_q1] = useState('option1');
    const [value_q2, stValue_q2] = useState('option1');
    const [value_q3, stValue_q3] = useState('option1');
    const [value_q4, stValue_q4] = useState('option1');
    const [value_q5, stValue_q5] = useState('option1');
    const [value_q6, stValue_q6] = useState('option1');
    const [value_q7, stValue_q7] = useState('option1');
    const [value_q8, stValue_q8] = useState('option1');
    const [value_q9, stValue_q9] = useState('option1');
    const [value_q10, stValue_q10] = useState('option1');
    const [value_q11, stValue_q11] = useState('option1');


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

const handle_Q0_Changed = async (e) => { stValue_q0(e.target.value); if(e.target.value == "option1"){setIsVisible(true);}else{setIsVisible(false);} };
  const handle_Q1_Changed = async (e) => { stValue_q1(e.target.value); };
  const handle_Q2_Changed = async (e) => { stValue_q2(e.target.value); };
  const handle_Q3_Changed = async (e) => { stValue_q3(e.target.value); };
  const handle_Q4_Changed = async (e) => { stValue_q4(e.target.value); };
  const handle_Q5_Changed = async (e) => { stValue_q5(e.target.value); };
  const handle_Q6_Changed = async (e) => { stValue_q6(e.target.value); };
  const handle_Q7_Changed = async (e) => { stValue_q7(e.target.value); };
  const handle_Q8_Changed = async (e) => { stValue_q8(e.target.value); };
  const handle_Q9_Changed = async (e) => { stValue_q9(e.target.value); };
  const handle_Q10_Changed = async (e) => { stValue_q10(e.target.value); };


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

        <p className={classes.secon_disclaimor}>{dear_part_2}</p>
        <p className={classes.secon_disclaimor}>{wlcome_3}</p>
        <p className={classes.secon_disclaimor}>{bitte_4}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{aimHEADING_5}</h1>
        <p className={classes.secon_disclaimor}>{aim_6}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{procedureHEADING_7}</h1>
        <p className={classes.secon_disclaimor}>{procedure_8}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{voluntaryHEADING_9}</h1>
        <p className={classes.secon_disclaimor}>{voluntary_10}</p>
        <p className={classes.secon_disclaimor}>{other_11}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{dataprotHEADING_12}</h1>
        <p className={classes.secon_disclaimor}>{dataprot_13}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{datasharingHEADING_14}</h1>
        <p className={classes.secon_disclaimor}>{datasharing_15}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{retentionHEADING_16}</h1>
        <p className={classes.secon_disclaimor}>{retention_17}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{furtherHEADING_18}</h1>
        <p className={classes.secon_disclaimor}>{further_19}</p>
        <p className={classes.secon_disclaimor}>{complaints_20}</p>
        <p className={classes.secon_disclaimor}>{best_21}</p>
        <p className={classes.disclaimor2}>{nme_22}</p>

        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{consentHEADING_23}</h1>

        <p className={classes.secon_disclaimor}>{consent_24}</p>
        <form className={classes.question} style={{textAlign: 'Left'}}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q0 === 'option1'} onChange={handle_Q0_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{ja}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option2" checked={value_q0 === 'option2'} onChange={handle_Q0_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{nein}</span></label></div>
        </form>
        <CSSTransition in={isVisible} timeout={300} classNames="fade" unmountOnExit >
      <div id='toShow'>
        <p className={classes.secon_disclaimor}>{q1}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q1 === 'option1'} onChange={handle_Q1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q1_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q1 === 'option2'} onChange={handle_Q1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q1_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q1 === 'option3'} onChange={handle_Q1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q1_op3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option4"  checked={value_q1 === 'option4'} onChange={handle_Q1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q1_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q1 === 'option5'} onChange={handle_Q1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q1_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{stat_info}</p>
        <p className={classes.secon_disclaimor}>{geborn}</p>
        <input className={classes.label2} placeholder={""}/>

        <p className={classes.secon_disclaimor}>{q2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q2 === 'option1'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q2_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q2 === 'option2'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q2_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q2 === 'option3'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q2_op3}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{q3}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q3 === 'option1'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q3 === 'option2'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q3 === 'option3'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q3 === 'option4'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q3 === 'option5'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q3 === 'option6'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op5}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q3 === 'option7'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op1}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q4 === 'option1'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4 === 'option2'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4 === 'option3'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4 === 'option4'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q4 === 'option5'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{q5}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q5 === 'option1'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q5 === 'option2'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q5 === 'option3'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q5 === 'option4'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op4}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{q6}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q6 === 'option1'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"   checked={value_q6 === 'option2'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q6 === 'option3'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"   checked={value_q6 === 'option4'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"   checked={value_q6 === 'option5'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"   checked={value_q6 === 'option6'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"   checked={value_q6 === 'option7'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op7}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option8"   checked={value_q6 === 'option8'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op8}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option9"   checked={value_q6 === 'option9'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op9}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option10"   checked={value_q6 === 'option10'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op10}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option11"   checked={value_q6 === 'option11'} onChange={handle_Q6_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q6_op11}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{ukraine}</p>
        <p className={classes.secon_disclaimor}>{q7}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q7 === 'option1'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q7 === 'option2'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3" checked={value_q7 === 'option3'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q7 === 'option4'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q7 === 'option5'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op5}</span></label></div>
        </form>

        
        <p className={classes.secon_disclaimor}>{q8}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q8 === 'option1'}  onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q8 === 'option2'}  onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q8 === 'option3'}  onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q8 === 'option4'} onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q8 === 'option5'} onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{q9}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q9 === 'option1'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q9 === 'option2'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q9 === 'option3'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q9 === 'option4'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q9 === 'option5'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{q10}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q10 === 'option1'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10 === 'option2'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10 === 'option3'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10 === 'option4'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q10 === 'option5'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op5}</span></label></div>
        </form>

        <p className={classes.secon_disclaimor}>{dank}</p>
        <p className={classes.secon_disclaimor}>{login}</p>
        <p className={classes.secon_disclaimor}>{noteusername}</p>
        


				{/*<p className={classes.text}>already have an account? <Link  style={{textDecoration: 'none'}} to={"/login/" + userId}>log in now</Link></p><p className={classes.disclaimor}>{disclaimor_1}</p>*/}
				{/*<Avatar alt='choose avatar' src="" className={classes.avatar}/>
            	<TextField className={classes.textField} id='username' name='username' label="Username" required/>
				<TextField className={classes.textField} id='email' name='email' label="Email" type="email" required />
				<TextField className={classes.textField} id="password" label="Password" type="password" minLength="6" autoComplete="current-password"/>
				<TextField className={classes.textField} id='passwordAgain' name='passwordAgain' label="Password Again" type="password" required/>
    <p className={classes.errorMessage}>{passwordErr}</p>*/}
				<button type="submit" className={classes.button}> Submit Post Survey </button>
        </div>
        </CSSTransition>
					</form>

        
      </>
    );
  }

export default withStyles(styles)(Progress);
