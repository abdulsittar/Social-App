import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './registerPageStyle'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { render } from "react-dom";
import axios from "axios";
import TimeMe from "timeme.js";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { useScrollBy } from "react-use-window-scroll";
import {  AlertDialog,  AlertDialogLabel,  AlertDialogDescription,  AlertDialogOverlay,  AlertDialogContent,} from "@reach/alert-dialog";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';




import {theChoiceNew, A_user_with, toGet, theChoice, whats, plzCon, infoPass, screen, note, enony, excell, welcome, q11, q1, q1_op1, q1_op2, q1_op3, q1_op4, q1_op5,  nein, ja, disclaimor_1, dear_part_2, wlcome_3, bitte_4,aimHEADING_5 ,aim_6 ,procedureHEADING_7 ,procedure_8 ,voluntaryHEADING_9 ,voluntary_10 ,other_11 ,dataprotHEADING_12 ,dataprot_13 ,datasharingHEADING_14 ,datasharing_15 ,retentionHEADING_16 ,retention_17 ,furtherHEADING_18 ,further_19 ,complaints_20 ,best_21 ,nme_22 ,consentHEADING_23 ,consent_24,
  stat_info, geborn, ukraine, dank, login1,login2,login3, noteusername, q2, q2_op1 , q2_op2,q2_op3 ,q3 ,q3_op1,q3_op2 ,q3_op3,q3_op4 ,q3_op5,q3_op6,q3_op7, q4 ,q4_op1,q4_op2,q4_op3,q4_op4,q4_op5, 
  q5 , q5_op1 ,q5_op2, q5_op3 , q5_op4, q6, q6_op1, q6_op2,  q6_op3,  q6_op4,   q6_op5,  q6_op6,  q6_op7,  q6_op8,  q6_op9,  q6_op10,  q6_op11, q7 ,
  q7_op1,  q7_op2, q7_op3, q7_op4, q7_op5, q8, q8_op1, q8_op2,  q8_op3,  q8_op4, q8_op5,  q9, q9_op1, q9_op2, q9_op3,  q9_op4 ,q9_op5, q10, q10_op1 ,
  q10_op2, q10_op3 ,q10_op4 ,q10_op5 } from '../../constants';

function Register({classes}) {
  const history = useHistory();
  const scrollBy = useScrollBy();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const [passwordErr, setPasswordErr] = useState('');
  const [shouldSendEvent, setShouldSendEvent] = useState(false);
  const [isSurveyChecked, setIsSurveyChecked] = useState(true);
  const [showDialog, setShowDialog] = React.useState(false);
  const cancelRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleNoClose = () => {
    setOpen(false);
    stValue_q11("");
  };

  
  
  const handleYesClose = () => {
    


       setIsVisibleSignUp(false);
    setIs_password_visible(true);

    var username = ""
    var proPic = ""

    if(value_q11 == "option1"){
      setUsername(usrName1)
      setProPic(profPic1)

    }else if(value_q11 == "option2"){
      setUsername(usrName2)
      setProPic(profPic2)

    }else if(value_q11 == "option3"){
      setUsername(usrName3)
      setProPic(profPic3)

    }

                  setOpen(false);    
    
  };

  const submitNext = async (e) => { 
    e.preventDefault()

    setIsVisibleSignUp(false);
    setIs_password_visible(true);

    if(value_q11 == "option1"){
      setUsername(usrName1)
      setProPic(profPic1)

    }else if(value_q11 == "option2"){
      setUsername(usrName2)
      setProPic(profPic2)

    }else if(value_q11 == "option3"){
      setUsername(usrName3)
      setProPic(profPic3)

    } 
};


  const destroyStuff = () => {    console.log("Destroyed!");    setShowDialog(false);  };

  const [username, setUsername] = useState("");
  const [proPic, setProPic] = useState("");

  const [uniqId, setUniqId] = useState('');
  const [isVisibleConsent, setIsVisibleConsent]     = useState(false);
  const [isVisibleBasic, setIsVisibleBasic]         = useState(false);
  const [isVisibleSignUp, setIsVisibleSignUp]       = useState(false);
  const [isButtonDisabled, setButtonDisabled]       = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible]     = useState(false);
  const [isVisibleBasicInfo, setIsVisibleBasicInfo]     = useState(true);
  const [isPostButtonDisplays, setIsPostButtonDisplays] = useState(true);
  const [isNextDisplays, setIsNextDisplays]     = useState(true);
  

  const [is_Q1_visible, setIs_Q1_visible] = useState(false);
  const [is_Q2_visible, setIs_Q2_visible] = useState(false);
  const [is_Q3_visible, setIs_Q3_visible] = useState(false);
  const [is_Q4_visible, setIs_Q4_visible] = useState(false);
  const [is_Q5_visible, setIs_Q5_visible] = useState(false);
  const [is_Q6_visible, setIs_Q6_visible] = useState(false);
  const [is_Q7_visible, setIs_Q7_visible] = useState(false);
  const [is_Q8_visible, setIs_Q8_visible] = useState(false);
  const [is_Q9_visible, setIs_Q9_visible] = useState(false);
  const [is_Q10_visible, setIs_Q10_visible] = useState(false);
  const [is_dank_visible, setIs_dank_visible] = useState(false);
  const [is_password_visible, setIs_password_visible] = useState(false);
  const [is_Post_visible, setIs_Post_visible] = useState(false);

  const [selectedUserName, setSelectedUserName] = useState("");
  const [password, setPassword] = useState("");

  const [profPic1, setProfPic1] = useState("");
  const [profPic2, setProfPic2] = useState("");
  const [profPic3, setProfPic3] = useState("");

  const [usrName1, setUsrName1] = useState("");
  const [usrName2, setUsrName2] = useState("");
  const [usrName3, setUsrName3] = useState("");

  const [password4, setPassword4] = useState("");
  

  const [value_q0, stValue_q0] = useState('');
  const [value_q2, stValue_q2] = useState('');
  const [value_q3, stValue_q3] = useState('');
  const [value_q4, stValue_q4] = useState('');
  const [value_q5, stValue_q5] = useState('');
  const [value_q6, stValue_q6] = useState('');
  const [value_q7, stValue_q7] = useState('');
  const [value_q8, stValue_q8] = useState('');
  const [value_q9, stValue_q9] = useState('');
  const [value_q10, stValue_q10] = useState('');
  const [value_q11, stValue_q11] = useState('');
  const [value_confirmation, stValue_confirmation] = useState('');
  

  const initialized = useRef(false);

  useEffect(() => {
    console.log("uniqId");
    const urlParts = window.location.pathname.split('/');
    const valu = urlParts[urlParts.length-1]
    console.log(valu);
    setUniqId(valu);
    console.log(uniqId);
    isUserAlreadySubmittedSurvey(valu);

	}, []);

  const labels = [q1_op1, q1_op2, q1_op3, q1_op4, q1_op5];
  
  const isUserAlreadySubmittedSurvey = async (val) => {
    try {
      const res = await axios.post(`/presurvey/isSubmitted/${val}`);
      console.log(res.data.data);
      setIsSurveyChecked(false);
      console.log(isSurveyChecked);
      setUniqId(val);

      if(res.data.login == true){
        const urlParts = window.location.pathname.split('/');
        const valu = urlParts[urlParts.length-1]
        history.push(`/login/${valu}`);

      } else if(res.data.data == true){
        const usr1 = res.data.users[0];
        const usr2 = res.data.users[1];
        const usr3 = res.data.users[2];
        
        setProfPic1(usr1.profilePicture);
        setUsrName1(usr1.username);

        setProfPic2(usr2.profilePicture);
        setUsrName2(usr2.username);

        setProfPic3(usr3.profilePicture);
        setUsrName3(usr3.username);

        setPassword4(usr1.password);

        setIsVisibleBasic(false)
        setIsVisibleConsent(false)
        setIsVisibleSignUp(true)
        setIs_Post_visible(false)
        setIsVisibleBasicInfo(false)

      }else{

        setIsVisibleBasic(true)
      }
    } catch (err) {
      console.log(err);
      setPasswordErr({A_user_with});

    }
    // if not submitted the survey
        //show third block

    // if submitted the survey, check if user registered

    };

    const handle_Confirm_Changed = async (e) => { 
      stValue_confirmation(e.target.value);
      const pass = document.getElementById('password').value;
      setPassword(pass)
      if(e.target.value == "option1"){
        setIs_password_visible(false);
        setIsWelcomeVisible(true);
        
      } else {
        setIsWelcomeVisible(false);
        setIs_password_visible(true);
      } 
  };
    
  
  const handle_Q0_Changed = async (e) => { 
    stValue_q0(e.target.value); 
    if(e.target.value == "option1"){
      //setIsVisibleConsent(true);
      setIs_Q1_visible(true);
      setIs_Q2_visible(true);
      setIs_Q3_visible(true);
      scrollBy({ top: 1000, left: 0, behavior: "smooth" })

    } else if(e.target.value == "option2"){
      setIsVisibleConsent(false);
      setIs_Q1_visible(false);
      setIs_Q2_visible(false);
      setIs_Q3_visible(false);
      setIs_Q4_visible(false);
      setIs_Q5_visible(false);
      setIs_Q6_visible(false);
      setIs_Q7_visible(false);
      setIs_Q8_visible(false);
      setIs_Q9_visible(false);
      setIs_Q10_visible(false);
    } 
};

  const handle_age_Changed = async (e) => {
    if(e.target.value != ""){
      
      //scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      //setIs_Q2_visible(false);
    }  
  };

  const handPostTextChange = async (e) => {
    if(e.target.value != ""){
      setIsPostButtonDisplays(false)
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIsPostButtonDisplays(true);

    }  
  };
  

  const handle_Q2_Changed = async (e) => { 
    stValue_q2(e.target.value); 
    //scrollBy({ top: 500, left: 0, behavior: "smooth" })
    /*if(e.target.value != ""){
      setIs_Q3_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q3_visible(false);
    } */ 
  
  };
  const handle_Q3_Changed = async (e) => { 
    stValue_q3(e.target.value); 
    if(e.target.value != ""){
      setIs_Q4_visible(true);
      setIs_Q5_visible(true);
      setIs_Q6_visible(true);
      scrollBy({ top: 700, left: 0, behavior: "smooth" })

    } else {
      //setIs_Q4_visible(false);
    }  
  };

  const handle_Q4_Changed = async (e) => { 
    stValue_q4(e.target.value); 
    //scrollBy({ top: 500, left: 0, behavior: "smooth" })
    /*if(e.target.value != ""){
      setIs_Q5_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q5_visible(false);
    } */
  };
  const handle_Q5_Changed = async (e) => { 
    stValue_q5(e.target.value); 
    //scrollBy({ top: 500, left: 0, behavior: "smooth" });
    /*if(e.target.value != ""){
      setIs_Q6_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q6_visible(false);
    }*/
  };
  const handle_Q6_Changed = async (e) => { 
    stValue_q6(e.target.value); 
    if(e.target.value != ""){
      setIs_Q7_visible(true);
      setIs_Q8_visible(true);
      setIs_Q9_visible(true);
      setIs_Q10_visible(true);
      setIs_dank_visible(true);
      scrollBy({ top: 700, left: 0, behavior: "smooth" })

    } else {
      //setIs_Q7_visible(false);
    }
  };
  const handle_Q7_Changed = async (e) => { 
    stValue_q7(e.target.value); 
    /*if(e.target.value != ""){
      setIs_Q8_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q8_visible(false);
    }*/
  };
  const handle_Q8_Changed = async (e) => { 
    stValue_q8(e.target.value); 
    /*if(e.target.value != ""){
      setIs_Q9_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q9_visible(false);
    }*/
  };
  const handle_Q9_Changed = async (e) => { 
    stValue_q9(e.target.value); 
    /*if(e.target.value != ""){
      setIs_Q10_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_Q10_visible(false);
    }*/
  };

  const handle_Q10_Changed = async (e) => { 
    stValue_q10(e.target.value); 

    /*if(e.target.value != ""){
      setIs_dank_visible(true);
      scrollBy({ top: 500, left: 0, behavior: "smooth" })

    } else {
      setIs_dank_visible(false);
    }*/
    
  };

  const handle_Q11_Changed = async (e) => { 
    
    stValue_q11(e.target.value); 
    setIsNextDisplays(false);
    if(e.target.value == "option1"){
      setSelectedUserName(usrName1);
      //handleClickOpen();

    }else if(e.target.value == "option2"){
      setSelectedUserName(usrName2);
      //handleClickOpen();

    }else if(e.target.value == "option3"){
      setSelectedUserName(usrName3);
      //handleClickOpen();

    }

  };

  const companyButtonChanged = async (e) => { 
    e.preventDefault()
    
    const age = document.getElementById('age').value;
    
    if(age == ""){
      e.preventDefault()
      toast.error("Question 1. Please enter your age!");
      return
    }else if (value_q2 == ""){
      e.preventDefault()
      toast.error("Question 2. Please select one given choice!");
      return
    }else if (value_q3 == ""){
      e.preventDefault()
      toast.error("Question 3. Please select one given choice!");
      return
    }else if (value_q4 == ""){
      e.preventDefault()
      toast.error("Question 4. Please select one given choice!");
      return
    }else if (value_q5 == ""){
      e.preventDefault()
      toast.error("Question 5. Please select one given choice!");
      return
    }else if (value_q6 == ""){
      e.preventDefault()
      toast.error("Question 6. Please select one given choice!");
      return
    }else if (value_q7 == ""){
      e.preventDefault()
      toast.error("Question 7. Please select one given choice!");
      return
    }else if (value_q8 == ""){
      e.preventDefault()
      toast.error("Question 8. Please select one given choice!");
      return
    }else if (value_q9 == ""){
      e.preventDefault()
      toast.error("Question 9. Please select one given choice!");
      return
    }else if (value_q10 == ""){
      e.preventDefault()
      toast.error("Question 10. Please select one given choice!");
      return
    }
    
    const survey = {
      q1: age,
      q2: value_q2,
      q3: value_q3,
      q4: value_q4,
      q5: value_q5,
      q6: value_q6,
      q7: value_q7,
      q8: value_q8,
      q9: value_q9,
      q10: value_q10,

    };
  
        try {
          console.log(survey)
          const res = await axios.post(`/presurvey/psurvey/${uniqId}`, survey);
          setButtonDisabled(true); 
          setIs_Q1_visible(false);
          setIs_Q2_visible(false);
          setIs_Q3_visible(false);
          setIs_Q4_visible(false);
          setIs_Q5_visible(false);
          setIs_Q6_visible(false);
          setIs_Q7_visible(false);
          setIs_Q8_visible(false);
          setIs_Q9_visible(false);
          setIs_Q10_visible(false);
          setIs_dank_visible(false);

          const urlParts = window.location.pathname.split('/');
          const valu = urlParts[urlParts.length-1]
          isUserAlreadySubmittedSurvey(valu);

        } catch (err) {
          console.log(err);
          setPasswordErr({A_user_with});
  
        }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    
    //const email = document.getElementById('email').value;
    
    //const passwordAgain = document.getElementById('passwordAgain').value;

    //if (passwordAgain !== password) {
    //  setPasswordErr("Passwords don't match!");
//
    //  setTimeout(() => { setPasswordErr(''); }, 5000) 
    
    //} else {
      const usr = {
        username: username,
        password: password,
        profilePicture: proPic
      };

      console.log(usr)
      const postText = document.getElementById('post').value;

      try {
        const userRes = await axios.post(`/auth/register/${uniqId}`, usr)
        console.log(userRes.data);
        const user = userRes.data;
        console.log(user);
        console.log(user._id);
        console.log(postText);
        if(user){
          console.log("registered!!!");
          try {
            const res2 = await axios.post(`/posts/${uniqId}/create/`, { userId: user._id, desc: postText});
            console.log(res2);
            //window.open('https://survey.maximiles.com/static-complete?p=123928_220ce61d', '_blank');
            // refresh the page after posting something
            //window.focus();
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            history.push("/");
          } catch (err) {
            console.log(err)
          }
        }
      } catch (err) {
        setPasswordErr("Error");
        console.log(err)

      }
    //}
  };

    return (
      <>
      <ToastContainer></ToastContainer>
      <div className={classes.register}>

      <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleNoClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to select "{selectedUserName}" as your username?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleYesClose}>
            Yes
          </Button>
          <Button onClick={handleNoClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

    
        <form className={classes.form} noValidate autoComplete="off">
				<h1 style={{marginBottom: '4vh'}}>Sign Up</h1>

        <CSSTransition in={isVisibleBasicInfo} timeout={50} classNames="fade" unmountOnExit >
        <div id='sixBlock'>
        <p className={classes.secon_disclaimor}>{dear_part_2}</p>
        <p className={classes.secon_disclaimor}>{wlcome_3}</p>
        <p className={classes.secon_disclaimor}>{bitte_4}</p>

        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{aimHEADING_5}</h1>
        <p className={classes.secon_disclaimor}>{aim_6}</p>

        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{procedureHEADING_7}</h1>
        <p className={classes.secon_disclaimor}>{procedure_8}</p>

        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{voluntaryHEADING_9}</h1>
        <p className={classes.secon_disclaimor}>{voluntary_10}</p>
        <p className={classes.secon_disclaimor}>{other_11}</p>

        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{dataprotHEADING_12}</h1>
        <p className={classes.secon_disclaimor}>{dataprot_13}</p>

        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{datasharingHEADING_14}</h1>
        <p className={classes.secon_disclaimor}>{datasharing_15}</p>

        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{retentionHEADING_16}</h1>
        <p className={classes.secon_disclaimor}>{retention_17}</p>

        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{furtherHEADING_18}</h1>
        <p className={classes.secon_disclaimor}>{further_19}</p>
        <p className={classes.secon_disclaimor}>{complaints_20}</p>
        <p className={classes.secon_disclaimor}>{best_21}</p>
        <p className={classes.disclaimor2}>{nme_22}</p>
        </div>
        </CSSTransition>

        <CSSTransition in={isVisibleBasic} timeout={50} classNames="fade" unmountOnExit >
         <div id='thirdBlock'>
        <h1 style={{marginBottom: '3vh', textAlign: 'Left'}}>{consentHEADING_23}</h1>
        
        <p className={classes.secon_disclaimor}>{q1}</p>
        <ul>
        {labels.map((label, index) => (
          <li className={classes.secon_disclaimor} key={index}>{label}</li>
        ))}
      </ul>
      <p className={classes.secon_disclaimor}>{consent_24}</p>
        <form className={classes.question} style={{textAlign: 'Left'}}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_q0 === 'option1'} onChange={handle_Q0_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{ja}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option2" checked={value_q0 === 'option2'} onChange={handle_Q0_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{nein}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q1_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q1'>
        <p className={classes.secon_disclaimor}>{stat_info}</p>
        <p className={classes.secon_disclaimor}>{geborn}</p>
        <input className={classes.label2} id='age' onChange={handle_age_Changed} placeholder={geborn}/>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q2_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q2'>
        <p className={classes.secon_disclaimor}>{q2}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q2 === 'option1'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q2_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q2 === 'option2'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q2_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q2 === 'option3'} onChange={handle_Q2_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q2_op3}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q3_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q3'>
        <p className={classes.secon_disclaimor}>{q3}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q3 === 'option1'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q3 === 'option2'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q3 === 'option3'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q3 === 'option4'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op4}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option5"  checked={value_q3 === 'option5'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op5}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option6"  checked={value_q3 === 'option6'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op6}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option7"  checked={value_q3 === 'option7'} onChange={handle_Q3_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q3_op7}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div>
        </CSSTransition>
          
        <CSSTransition in={is_Q4_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q4'>
        <p className={classes.secon_disclaimor}>{q4}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"   checked={value_q4 === 'option1'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q4 === 'option2'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q4 === 'option3'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q4 === 'option4'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q4 === 'option5'} onChange={handle_Q4_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q4_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q5_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q5'>
        <p className={classes.secon_disclaimor}>{q5}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q5 === 'option1'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q5 === 'option2'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q5 === 'option3'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q5 === 'option4'} onChange={handle_Q5_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q5_op4}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q6_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q6'>
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
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q7_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q7'>
        <p className={classes.secon_disclaimor}>{ukraine}</p>
        <p className={classes.secon_disclaimor}>{q7}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q7 === 'option1'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q7 === 'option2'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3" checked={value_q7 === 'option3'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q7 === 'option4'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q7 === 'option5'}  onChange={handle_Q7_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q7_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q8_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q8'>
        <p className={classes.secon_disclaimor}>{q8}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q8 === 'option1'}  onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q8 === 'option2'}  onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q8 === 'option3'}  onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q8 === 'option4'} onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q8 === 'option5'} onChange={handle_Q8_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q8_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q9_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q9'>
        <p className={classes.secon_disclaimor}>{q9}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q9 === 'option1'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q9 === 'option2'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q9 === 'option3'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q9 === 'option4'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q9 === 'option5'} onChange={handle_Q9_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q9_op5}</span></label></div>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_Q10_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q10'>
        <p className={classes.secon_disclaimor}>{q10}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1"  checked={value_q10 === 'option1'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op1}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q10 === 'option2'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q10 === 'option3'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op3}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option4"  checked={value_q10 === 'option4'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op4}</span></label></div>
        <div className={classes.label}><label><input type="radio" value="option5"  checked={value_q10 === 'option5'} onChange={handle_Q10_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{q10_op5}</span></label></div>
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={is_dank_visible} timeout={300} classNames="fade" unmountOnExit >
          <div id='dank'>
            <p className={classes.secon_disclaimor}>{dank}</p>
        
				    {/*<p className={classes.text}>already have an account? <Link  style={{textDecoration: 'none'}} to={"/login/" + userId}>log in now</Link></p><p className={classes.disclaimor}>{disclaimor_1}</p>*/}
				    {/*<Avatar alt='choose avatar' src="" className={classes.avatar}/>
            	<TextField className={classes.textField} id='username' name='username' label="Username" required/>
				      <TextField className={classes.textField} id='email' name='email' label="Email" type="email" required />
				      <TextField className={classes.textField} id="password" label="Password" type="password" minLength="6" autoComplete="current-password"/>
				      <TextField className={classes.textField} id='passwordAgain' name='passwordAgain' label="Password Again" type="password" required/>
              <p className={classes.errorMessage}>{passwordErr}</p>*/}

            <button onClick={companyButtonChanged} disabled={isButtonDisabled} className={classes.button}>Senden</button>.
          </div>
        </CSSTransition>

      <CSSTransition in={isVisibleSignUp} timeout={50} classNames="fade" unmountOnExit >
      <div id='secondBlock'>
      <p className={classes.secon_disclaimor4}>{welcome}</p>
      <p className={classes.secon_disclaimor}>{login1}</p>
      <p className={classes.secon_disclaimor}>{login2}</p>
      <p className={classes.secon_disclaimor}>{login3}</p>
        <form  className={classes.question}>
        <div className={classes.label}>
          <label>
          <input type="radio" value="option1"  checked={value_q11 === 'option1'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/>
          <span style={{"margin-left": "0.5rem", "margin-top": "0.5rem"}}>
            <img width="50" height="50"className={classes.profileCoverImg}  src={profPic1 != "" ? PF+profPic1 : PF+"person/noCover.png"} alt="" /> {" "+usrName1}
            </span>
            </label>
            </div>
        <div className={classes.label}><label ><input type="radio" value="option2"  checked={value_q11 === 'option2'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem", "margin-top": "0.5rem"}}><img width="50" height="50" className={classes.profileCoverImg}  src={profPic2 != "" ? PF+profPic2 : PF+"person/noCover.png"} alt="" />{" "+usrName2}</span></label></div>
        <div className={classes.label}><label ><input type="radio" value="option3"  checked={value_q11 === 'option3'} onChange={handle_Q11_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem", "margin-top": "0.5rem"}}><img width="50" height="50" className={classes.profileCoverImg}  src={profPic3 != "" ? PF+profPic3 : PF+"person/noCover.png"} alt="" />{" "+usrName3}</span></label></div>
        
        <button hidden={isNextDisplays} className={classes.button} onClick={submitNext}> Weiter  </button>
        </form>
        
        </div>
        </CSSTransition>

        <CSSTransition in={is_password_visible} timeout={50} classNames="fade" unmountOnExit >
        <div id='Q5'>
        <p className={classes.secon_disclaimor4}>{excell}</p>
        <p className={classes.secon_disclaimor4}>{infoPass}</p>
        <span style={{"margin-left": "0.5rem", "margin-top": "0.5rem"}}>
            <img width="50" height="50"className={classes.profileCoverImg}  src={proPic != "" ? PF+proPic : PF+"person/noCover.png"} alt="" /> {" "+username}
            </span>
        <TextField className={classes.textField3} id="password" label="Password" value={password4} autoComplete="current-password"/>
				
        <p className={classes.secon_disclaimor5}>{note}</p>
        <p className={classes.secon_disclaimor4}>{enony}</p>
        <p className={classes.secon_disclaimor4}>{screen}</p>
        <p className={classes.secon_disclaimor4}>{plzCon}</p>
        <form  className={classes.question}>
        <div className={classes.label}><label><input type="radio" value="option1" checked={value_confirmation === 'option1'}  onChange={handle_Confirm_Changed} style={{"accent-color":'red'}}/><span style={{"margin-left": "0.5rem"}}>{"Confirm"}</span></label></div>
        
        </form>
        </div>
        </CSSTransition>

        <CSSTransition in={isWelcomeVisible} timeout={50} classNames="fade" unmountOnExit >
        <div id='posts'>
        <form  className={classes.question}>
        <p className={classes.secon_disclaimor4}>{toGet}</p>
        <p className={classes.secon_disclaimor4}>{theChoice}</p>
        <p className={classes.secon_disclaimor4}>{theChoiceNew}</p>
        <p className={classes.secon_disclaimor4}>{whats}</p>
        <input className={classes.label2} id='post' onChange={handPostTextChange} placeholder={""}/>
        <button type="submit" hidden={isPostButtonDisplays} className={classes.button} onClick={submitPost}> Post </button>
        </form>
        </div>
        </CSSTransition>

        {/*<CSSTransition in={is_Post_visible} timeout={300} classNames="fade" unmountOnExit >
        <div id='Q5'>
        <form  className={classes.question}>
        <button type="submit" className={classes.button} onClick={handleClick}> Post </button>
        </form>
        </div>
            </CSSTransition>*/}
        </form>
        </div>
        </>
    );
}

export default withStyles(styles)(Register);


