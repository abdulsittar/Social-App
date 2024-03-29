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
import { useHistory } from "react-router";
import { ToastContainer } from 'react-toastify';
import {regSw, subscribe} from '../../helper.js';
import { Line, Circle } from 'rc-progress';
import { CSSTransition } from 'react-transition-group';
import { useScrollBy } from "react-use-window-scroll";
import {post_q4_1, post_q4_2, post_q4_3, post_q4_4, post_q4_5, post_info_0, post_info_1,post_q1,post_info_2,post_q2, post_q2_op1,post_q2_op2,post_q2_op3, post_q2_op4,post_q2_op5 ,post_q3 ,post_q3_op1 , post_q3_op2 , post_q3_op3 ,post_q3_op4 ,post_q3_op5 , post_info_3 , post_info_4 , post_q4 ,post_q4_op1 ,post_q4_op2 ,post_q4_op3 , post_q4_op4,post_q4_op5 ,post_q4_op6 ,post_q4_op7 ,post_q5_op1 ,post_q5_op2  ,post_q5_op3 ,post_q5_op4 ,post_q5_op5 ,post_q5_op6,post_q5_op7,post_q6_op1 ,post_q6_op2 ,post_q6_op3 ,post_q6_op4 ,post_q6_op5 ,post_q6_op6 ,post_q6_op7 ,post_q7_op1 ,post_q7_op2 ,post_q7_op3 ,post_q7_op4 ,post_q7_op5 ,post_q7_op6 ,post_q7_op7 ,post_q8_op1 , post_q8_op2,post_q8_op3 ,post_q8_op4 ,post_q8_op5 ,post_q8_op6 , post_q8_op7, post_q9_op1, post_q9_op2, post_q9_op3,post_q9_op4 ,post_q9_op5 ,post_q9_op6 , post_q9_op7, post_info_5,post_q10 ,post_q10_op1 ,post_q10_op2,post_q10_op3 ,post_q10_op4 ,post_q10_op5 ,post_q11 ,post_q11_op1 ,post_q11_op2 ,post_q11_op3 ,post_q11_op4,post_q11_op5 ,post_q12 ,post_q12_op1 ,post_q12_op2 ,post_q12_op3 ,post_q12_op4 ,post_q12_op5 ,post_q13 ,post_q13_op1 ,post_q13_op2 , post_q13_op3,post_q13_op4 , post_q13_op5,post_info_6 ,post_q14 ,post_q14_op1 ,post_q14_op2 ,post_q14_op3 , post_q14_op4,post_q14_op5 ,post_q15 ,post_q15_op1, post_q15_op2, post_q15_op3, post_q15_op4,post_q15_op5 ,post_q16 , post_q16_op1,post_q16_op2 ,post_q16_op3 ,post_q16_op4 ,post_q16_op5 ,post_q17 , post_q17_op1, post_q17_op2, post_q17_op3, post_q17_op4, post_q17_op5,post_info_7 ,post_q18, post_info_8 } from '../../constants';


function Progress({ classes }) {
    
  const scrollBy = useScrollBy();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preImage, setPreImage] = useState(null);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [bio, setBio] = useState("");
    const [userId, setUserId] = useState("");
    const history = useHistory();
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
    const [percent, setPercent] = useState(0);
    
    const [day_One_Percent, setDay_One_Percent] = useState(0);
    const [day_Two_Percent, setDay_Two_Percent] = useState(0);
    const [day_Three_Percent, setDay_Three_Percent] = useState(0);
    const [day_Four_Percent, setDay_Four_Percent] = useState(0);
    const [day_Five_Percent, setDay_Five_Percent] = useState(0);

    const [passwordErr, setPasswordErr] = useState('');

    const [isVisible, setIsVisible] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [status_msg, stStatus_msg] = useState('');
    
    const [value_q2, stValue_q2] = useState('');
    const [value_q3, stValue_q3] = useState('');
    const [value_q4, stValue_q4] = useState('');
    const [value_q4_1, stValue_q4_1] = useState('');
    const [value_q4_2, stValue_q4_2] = useState('');
    const [value_q4_3, stValue_q4_3] = useState('');
    const [value_q4_4, stValue_q4_4] = useState('');
    const [value_q4_5, stValue_q4_5] = useState('');

    const [value_q10, stValue_q10] = useState('');
    const [value_q11, stValue_q11] = useState('');
    const [value_q12, stValue_q12] = useState('');
    const [value_q13, stValue_q13] = useState('');
    const [value_q14, stValue_q14] = useState('');
    const [value_q15, stValue_q15] = useState('');
    const [value_q16, stValue_q16] = useState('');
    const [value_q17, stValue_q17] = useState('');


  const [is_Q2_visible, setIs_Q2_visible] = useState(false);
  const [is_Q3_visible, setIs_Q3_visible] = useState(false);
  const [is_Q4_visible, setIs_Q4_visible] = useState(false);
  const [is_Q5_visible, setIs_Q5_visible] = useState(false);
  const [is_Q6_visible, setIs_Q6_visible] = useState(false);
  const [is_Q7_visible, setIs_Q7_visible] = useState(false);
  const [is_Q8_visible, setIs_Q8_visible] = useState(false);
  const [is_Q9_visible, setIs_Q9_visible] = useState(false);
  const [is_Q10_visible, setIs_Q10_visible] = useState(false);
  const [is_Q11_visible, setIs_Q11_visible] = useState(false);
  const [is_Q12_visible, setIs_Q12_visible] = useState(false);
  const [is_Q13_visible, setIs_Q13_visible] = useState(false);
  const [is_Q14_visible, setIs_Q14_visible] = useState(false);
  const [is_Q15_visible, setIs_Q15_visible] = useState(false);
  const [is_Q16_visible, setIs_Q16_visible] = useState(false);
  const [is_Q17_visible, setIs_Q17_visible] = useState(false);
  const [is_Q18_visible, setIs_Q18_visible] = useState(false);
    

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
  fetchTimeSpent();
  setIsProfileFetched(false);

  if(day_One_Percent > 50){
    console.log("day_One_Percent");
    setIsVisible(true);
  }

}, []);

const fetchTimeSpent = async () => {
  
  const res = await axios.get("/users/" + currentUser._id + "/getTimeSpent")
  console.log(res.data);
  setDay_One_Percent(calculatePercentage(res.data["today"], 2));
  setDay_Two_Percent(calculatePercentage(res.data["oneDayBefore"], 2));
  setDay_Three_Percent(calculatePercentage(res.data["twoDayBefore"], 2));
  setDay_Four_Percent(calculatePercentage(res.data["threeDayBefore"], 2));
  setDay_Five_Percent(calculatePercentage(res.data["fourDayBefore"], 2));
  updateMsg();

  
};

const calculatePercentage = (numerator, denominator) => {
  // Ensure denominator is not 0 to avoid division by zero error
  if (denominator !== 0) {
    const perct = (numerator/denominator) * 100
    console.log(numerator)
    console.log(denominator)
    console.log(perct)
    return (perct).toFixed(0);
  } else {
    return 'N/A';
  }
};
  
const updateMsg = async () => {
  console.log("here"+day_One_Percent)
if(day_One_Percent > 50){
  stStatus_msg("Herzlichen Glückwunsch!!! Sie sind jetzt berechtigt, an der Nachbefragung teilzunehmen.");

}else{
  
  stStatus_msg("Sie sind nicht berechtigt, an der Nachbefragung teilzunehmen");
}
}

const handleUserNameChange = async (e) => {
    if(e.target.value != ""){
      if(is_Q2_visible.length == 1){
        scrollBy({ top: 500, left: 0, behavior: "smooth" })
      }
      setIs_Q2_visible(true);
      
    }else{
      setIs_Q2_visible(false);
    }
}


  const handle_Q2_Changed = async (e) => { stValue_q2(e.target.value); 
    if(e.target.value != ""){
    setIs_Q3_visible(true);
    scrollBy({ top: 500, left: 0, behavior: "smooth" })

  } else {
    setIs_Q3_visible(false);
  }  };
  const handle_Q3_Changed = async (e) => { stValue_q3(e.target.value); 
    if(e.target.value != ""){
      setIs_Q4_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q4_visible(false);
    }  };
  const handle_Q4_Changed = async (e) => { stValue_q4(e.target.value); 
    if(e.target.value != ""){
      setIs_Q5_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q5_visible(false);
    }  };
  const handle_Q4_1_Changed = async (e) => { stValue_q4_1(e.target.value); 
    if(e.target.value != ""){
      setIs_Q6_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q6_visible(false);
    }  };
  const handle_Q4_2_Changed = async (e) => { stValue_q4_2(e.target.value);
    if(e.target.value != ""){
      setIs_Q7_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q7_visible(false);
    }   };
  const handle_Q4_3_Changed = async (e) => { stValue_q4_3(e.target.value); 
    if(e.target.value != ""){
      setIs_Q8_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q8_visible(false);
    }  };
  const handle_Q4_4_Changed = async (e) => { stValue_q4_4(e.target.value);
    if(e.target.value != ""){
      setIs_Q9_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q9_visible(false);
    }   };
  const handle_Q4_5_Changed = async (e) => { stValue_q4_5(e.target.value); 
    if(e.target.value != ""){
      setIs_Q10_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q10_visible(false);
    }  };

  const handle_Q10_Changed = async (e) => { stValue_q10(e.target.value); 
    if(e.target.value != ""){
      setIs_Q11_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q11_visible(false);
    }  };
  const handle_Q11_Changed = async (e) => { stValue_q11(e.target.value); 
    if(e.target.value != ""){
      setIs_Q12_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q12_visible(false);
    }  };
  const handle_Q12_Changed = async (e) => { stValue_q12(e.target.value); 
    if(e.target.value != ""){
      setIs_Q13_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q13_visible(false);
    }  };
  const handle_Q13_Changed = async (e) => { stValue_q13(e.target.value); 
    if(e.target.value != ""){
      setIs_Q14_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q14_visible(false);
    }  };
  const handle_Q14_Changed = async (e) => { stValue_q14(e.target.value); 
    if(e.target.value != ""){
      setIs_Q15_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q15_visible(false);
    }  };
  const handle_Q15_Changed = async (e) => { stValue_q15(e.target.value); 
    if(e.target.value != ""){
      setIs_Q16_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q16_visible(false);
    }  };
  const handle_Q16_Changed = async (e) => { stValue_q16(e.target.value); 
    if(e.target.value != ""){
      setIs_Q17_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q17_visible(false);
    }  };
  const handle_Q17_Changed = async (e) => { stValue_q17(e.target.value); 
    if(e.target.value != ""){
      setIs_Q18_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q18_visible(false);
    }  };


  const handleClick = async (e) => {

    e.preventDefault()
    const username = document.getElementById('username').value;
    const someelse = document.getElementById('someelse').value;
    
    if(username != currentUser.username){
      toast.error("Question 1. Sie haben einen falschen Benutzernamen eingegeben!");
      return
    }else if (value_q2 == ""){
      toast.error("Question 2. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q3 == ""){
      toast.error("Question 3. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q4 == ""){
      toast.error("Question 4. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q4_1 == ""){
      toast.error("Question 5. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q4_2 == ""){
      toast.error("Question 6. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q4_3 == ""){
      toast.error("Question 7. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q4_4 == ""){
      toast.error("Question 8. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q4_5 == ""){
      toast.error("Question 9. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q10 == ""){
      toast.error("Question 10. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q11 == ""){
      toast.error("Question 11. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q12 == ""){
      toast.error("Question 12. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q13 == ""){
      toast.error("Question 13. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q14 == ""){
      toast.error("Question 14. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q15 == ""){
      toast.error("Question 15. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q16 == ""){
      toast.error("Question 16. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }else if (value_q17 == ""){
      toast.error("Question 17. Bitte wählen Sie eine vorgegebene Auswahl aus!");
      return
    }

    const survey = {
      q1: username,
      q2: value_q2,
      q3: value_q3,
      q4: value_q4_1,
      q5: value_q4_2,
      q6: value_q4_3,
      q7: value_q4_4,
      q8: value_q4_5,
      q9: value_q10,
      q10: value_q11,
      q11: value_q12,
      q12: value_q13,
      q13: value_q14,
      q14: value_q15,
      q15: value_q16,
      q16: value_q17,
      q17: someelse,
    };
        try {
          console.log(survey)
          const res = await axios.post(`/postsurvey/pstsurvey/${currentUser.uniqueId}`, survey);

          localStorage.removeItem("user");
	        const urlParts = window.location.pathname.split('/');
          const valu = urlParts[urlParts.length-1]
          window.open('https://survey.maximiles.com/static-complete?p=123929_0b2e7809', '_blank');
	        history.push(`/login/${valu}`);
        } catch (err) {
          console.log(err);
          setPasswordErr("A user with this name/email already exists. Use a different name/email. OR the used url for registrationis wrong.");
  
        }
  };

  useEffect(() => {
      setFollowed(currentUser.followings.includes(usr._id));
        //setSelectedImage(usr.profilePicture);
        setPreImage(usr.profilePicture);
    }, []);


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

        <h3 className={classes.progressHead}>{status_msg}</h3>

        <h3 className={classes.progressHead}>Progress Day 1 = {day_One_Percent}%</h3>
        <Line percent={day_One_Percent} strokeWidth={4} strokeColor={day_One_Percent < 30? "red": day_One_Percent < 60? "yellow": "green"} className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 2 = {day_Two_Percent}%</h3>
        <Line percent={day_Two_Percent} strokeWidth={4} strokeColor={day_Two_Percent < 30? "red": day_Two_Percent < 60? "yellow": "green"} className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 3 = {day_Three_Percent}%</h3>
        <Line percent={day_Three_Percent} strokeWidth={4} strokeColor={day_Three_Percent < 30? "red": day_Three_Percent < 60? "yellow": "green"} className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 4 = {day_Four_Percent}%</h3>
        <Line percent={day_Four_Percent} strokeWidth={4} strokeColor={day_Four_Percent < 30? "red": day_Four_Percent < 60? "yellow": "green"} className={classes.progressVal}/>

        <h3 className={classes.progressHead}>Progress Day 5 = {day_Five_Percent}%</h3>
        <Line percent={day_Five_Percent} strokeWidth={4} strokeColor={day_Five_Percent < 30? "red": day_Five_Percent < 60? "yellow": "green"} className={classes.progressVal}/>
        
          {/*<Circle percent={percent} strokeWidth={4} strokeColor="green" />*/}
        </div>

          <form className={classes.form} noValidate autoComplete="off">
        <CSSTransition in={day_One_Percent > 50 && day_Two_Percent > -1 && day_Three_Percent > -1 && day_Four_Percent > -1 && day_Five_Percent > -1} timeout={300} classNames="fade" unmountOnExit >
      <div id='toShow'>
      <p className={classes.secon_disclaimor}>{post_info_0}</p>
      <p className={classes.secon_disclaimor}>{post_info_1}</p>
      <p className={classes.secon_disclaimor}>{post_q1}</p>
      <input id="username" onChange = {handleUserNameChange}className={classes.label2} placeholder={post_q1}/>
      </div>
        </CSSTransition>

        <CSSTransition in={is_Q2_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
      <p className={classes.secon_disclaimor}>{post_info_2}</p>
        <p className={classes.secon_disclaimor}>{post_q2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q2 === 'option1'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q2 === 'option2'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q2 === 'option3'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option4"  checked={value_q2 === 'option4'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q2 === 'option5'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q2_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q3_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q3}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q3 === 'option1'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q3 === 'option2'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q3 === 'option3'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op3}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option4"  checked={value_q3 === 'option4'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q3 === 'option5'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q3_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q4_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
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
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q5_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q4_1}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_1 === 'option1'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_1 === 'option2'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_1 === 'option3'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_1 === 'option4'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_1 === 'option5'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_1 === 'option6'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_1 === 'option7'} onChange={handle_Q4_1_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q5_op7}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q6_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q4_2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_2 === 'option1'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_2 === 'option2'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_2 === 'option3'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_2 === 'option4'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_2 === 'option5'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_2 === 'option6'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_2 === 'option7'} onChange={handle_Q4_2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q6_op7}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q7_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q4_3}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_3 === 'option1'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_3 === 'option2'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_3 === 'option3'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_3 === 'option4'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_3 === 'option5'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_3 === 'option6'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_3 === 'option7'} onChange={handle_Q4_3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q7_op7}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q8_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q4_4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_4 === 'option1'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_4 === 'option2'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_4 === 'option3'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_4 === 'option4'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_4 === 'option5'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_4 === 'option6'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_4 === 'option7'} onChange={handle_Q4_4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q8_op7}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q9_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q4_5}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q4_5 === 'option1'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4_5 === 'option2'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4_5 === 'option3'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4_5 === 'option4'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q4_5 === 'option5'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q4_5 === 'option6'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q4_5 === 'option7'} onChange={handle_Q4_5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q9_op7}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q10_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_info_5}</p>
        <p className={classes.secon_disclaimor}>{post_q10}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q10 === 'option1'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10 === 'option2'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10 === 'option3'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10 === 'option4'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q10 === 'option5'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q10_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q11_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q11}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q11 === 'option1'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q11 === 'option2'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q11 === 'option3'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q11 === 'option4'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q11 === 'option5'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q11_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q12_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q12}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q12 === 'option1'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q12 === 'option2'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q12 === 'option3'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q12 === 'option4'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q12 === 'option5'} onChange={handle_Q12_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q12_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q13_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q13}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q13 === 'option1'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q13 === 'option2'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q13 === 'option3'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q13 === 'option4'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q13 === 'option5'} onChange={handle_Q13_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q13_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q14_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_info_6}</p>
        <p className={classes.secon_disclaimor}>{post_q14}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q14 === 'option1'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q14 === 'option2'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q14 === 'option3'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q14 === 'option4'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q14 === 'option5'} onChange={handle_Q14_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q14_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q15_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q15}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q15 === 'option1'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q15 === 'option2'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q15 === 'option3'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q15 === 'option4'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q15 === 'option5'} onChange={handle_Q15_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q15_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q16_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q16}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q16 === 'option1'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q16 === 'option2'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q16 === 'option3'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q16 === 'option4'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q16 === 'option5'} onChange={handle_Q16_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q16_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q17_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_q17}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q17 === 'option1'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q17 === 'option2'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q17 === 'option3'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q17 === 'option4'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q17 === 'option5'} onChange={handle_Q17_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{post_q17_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>
        <CSSTransition in={is_Q18_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{post_info_7}</p>
        <p className={classes.secon_disclaimor}>{post_q18}</p>
        <input id="someelse" className={classes.label2} placeholder={post_q18}/>
        <p className={classes.secon_disclaimor}>{post_info_8}</p>

				<button onClick={handleClick} type="submit" className={classes.button}> Submit Post Survey </button>
        </div>
        </CSSTransition>
					</form>

        
      </>
    );
  }

export default withStyles(styles)(Progress);
