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
import axios from "axios";
import TimeMe from "timeme.js";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import {q11, q1, q1_op1, q1_op2, q1_op3, q1_op4, q1_op5,  nein, ja, disclaimor_1, dear_part_2, wlcome_3, bitte_4,aimHEADING_5 ,aim_6 ,procedureHEADING_7 ,procedure_8 ,voluntaryHEADING_9 ,voluntary_10 ,other_11 ,dataprotHEADING_12 ,dataprot_13 ,datasharingHEADING_14 ,datasharing_15 ,retentionHEADING_16 ,retention_17 ,furtherHEADING_18 ,further_19 ,complaints_20 ,best_21 ,nme_22 ,consentHEADING_23 ,consent_24,
  stat_info, geborn, ukraine, dank, login, noteusername, q2, q2_op1 , q2_op2,q2_op3 ,q3 ,q3_op1,q3_op2 ,q3_op3,q3_op4 ,q3_op5,q3_op6,q3_op7, q4 ,q4_op1,q4_op2,q4_op3,q4_op4,q4_op5, 
  q5 , q5_op1 ,q5_op2, q5_op3 , q5_op4, q6, q6_op1, q6_op2,  q6_op3,  q6_op4,   q6_op5,  q6_op6,  q6_op7,  q6_op8,  q6_op9,  q6_op10,  q6_op11, q7 ,
  q7_op1,  q7_op2, q7_op3, q7_op4, q7_op5, q8, q8_op1, q8_op2,  q8_op3,  q8_op4, q8_op5,  q9, q9_op1, q9_op2, q9_op3,  q9_op4 ,q9_op5, q10, q10_op1 ,
  q10_op2, q10_op3 ,q10_op4 ,q10_op5 } from '../../constants';

function Register({classes}) {
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const [passwordErr, setPasswordErr] = useState('');
  const [shouldSendEvent, setShouldSendEvent] = useState(false);
  const [isSurveyChecked, setIsSurveyChecked] = useState(true);
  const [uniqId, setUniqId] = useState('');
  const [isVisibleConsent, setIsVisibleConsent] = useState(false);
  const [isVisibleBasic, setIsVisibleBasic] = useState(false);
  const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [profPic1, setProfPic1] = useState("");
  const [profPic2, setProfPic2] = useState("");
  const [profPic3, setProfPic3] = useState("");

  const [usrName1, setUsrName1] = useState("");
  const [usrName2, setUsrName2] = useState("");
  const [usrName3, setUsrName3] = useState("");

  const [password4, setPassword4] = useState("");
  

  const [value_q0, stValue_q0] = useState('option2');
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

      }else if(res.data.data == true){
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
        setIsVisibleSignUp(true)

      }else{

        setIsVisibleBasic(true)
      }
    } catch (err) {
      console.log(err);
      setPasswordErr("A user with this name/email already exists. Use a different name/email. OR the used url for registrationis wrong.");

    }
    // if not submitted the survey
        //show third block

    // if submitted the survey, check if user registered

    };

  const handle_Q0_Changed = async (e) => { stValue_q0(e.target.value); if(e.target.value == "option1"){setIsVisibleConsent(true);}else{setIsVisibleConsent(false);} };
  const handle_Q2_Changed = async (e) => { stValue_q2(e.target.value); };
  const handle_Q3_Changed = async (e) => { stValue_q3(e.target.value); };
  const handle_Q4_Changed = async (e) => { stValue_q4(e.target.value); };
  const handle_Q5_Changed = async (e) => { stValue_q5(e.target.value); };
  const handle_Q6_Changed = async (e) => { stValue_q6(e.target.value); };
  const handle_Q7_Changed = async (e) => { stValue_q7(e.target.value); };
  const handle_Q8_Changed = async (e) => { stValue_q8(e.target.value); };
  const handle_Q9_Changed = async (e) => { stValue_q9(e.target.value); };
  const handle_Q10_Changed = async (e) => { stValue_q10(e.target.value); };
  const handle_Q11_Changed = async (e) => { stValue_q11(e.target.value); };

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

          const urlParts = window.location.pathname.split('/');
          const valu = urlParts[urlParts.length-1]
          isUserAlreadySubmittedSurvey(valu);
          
          window.open('https://www.google.com', '_blank');

        } catch (err) {
          console.log(err);
          setPasswordErr("A user with this name/email already exists. Use a different name/email. OR the used url for registrationis wrong.");
  
        }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    var username = ""
    var proPic = ""

    if(value_q11 == "option1"){
      username = usrName1
      proPic = profPic1

    }else if(value_q11 == "option2"){
      username = usrName2
      proPic = profPic2

    }else if(value_q11 == "option3"){
      username = usrName3
      proPic = profPic3

    }
    
    //const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordAgain = document.getElementById('passwordAgain').value;

    if (passwordAgain !== password) {
      setPasswordErr("Passwords don't match!");

      setTimeout(() => { setPasswordErr(''); }, 5000) 
    
    } else {
      const user = {
        username: username,
        password: password,
        profilePicture: proPic
      };

      try {
        const res = await axios.post(`/auth/register/${uniqId}`, user);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        history.push("/");
      } catch (err) {
        setPasswordErr("A user with this name/email already exists. Use a different name/email. OR the used url for registrationis wrong.");

      }
    }
  };

    return (
      <>
      <ToastContainer></ToastContainer>
      <div className={classes.register}>
        <form className={classes.form} noValidate autoComplete="off">
				<h1 style={{marginBottom: '4vh'}}>Sign Up</h1>

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
        

        <CSSTransition in={isVisibleBasic} timeout={300} classNames="fade" unmountOnExit >
         <div id='thirdBlock'>
        <h1 style={{marginBottom: '1vh', textAlign: 'Left'}}>{consentHEADING_23}</h1>
        
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

        <CSSTransition in={isVisibleConsent} timeout={300} classNames="fade" unmountOnExit >
        <div id='firstBlock'>

        <p className={classes.secon_disclaimor}>{stat_info}</p>
        <p className={classes.secon_disclaimor}>{geborn}</p>
        <input className={classes.label2} id='age' placeholder={geborn}/>

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
        <hr style={{ borderTop: '1px solid #000' }}/>
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
        <hr style={{ borderTop: '1px solid #000' }}/>
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
        <hr style={{ borderTop: '1px solid #000' }}/>
        </form>

        <p className={classes.secon_disclaimor}>{dank}</p>
        
				{/*<p className={classes.text}>already have an account? <Link  style={{textDecoration: 'none'}} to={"/login/" + userId}>log in now</Link></p><p className={classes.disclaimor}>{disclaimor_1}</p>*/}
				{/*<Avatar alt='choose avatar' src="" className={classes.avatar}/>
            	<TextField className={classes.textField} id='username' name='username' label="Username" required/>
				<TextField className={classes.textField} id='email' name='email' label="Email" type="email" required />
				<TextField className={classes.textField} id="password" label="Password" type="password" minLength="6" autoComplete="current-password"/>
				<TextField className={classes.textField} id='passwordAgain' name='passwordAgain' label="Password Again" type="password" required/>
    <p className={classes.errorMessage}>{passwordErr}</p>*/}

        <button onClick={companyButtonChanged} disabled={isButtonDisabled} className={classes.button}> Submit Survey</button>.
        </div>
        </CSSTransition>

          <CSSTransition in={isVisibleSignUp} timeout={300} classNames="fade" unmountOnExit >
      <div id='secondBlock'>
      <p className={classes.secon_disclaimor}>{login}</p>
        <p className={classes.secon_disclaimor}>{noteusername}</p>
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
        
        <TextField className={classes.textField3} id="password" label="Password" value={password4} autoComplete="current-password"/>
				<TextField className={classes.textField} id='passwordAgain' name='passwordAgain' label="Password Again" type="password" required/>
        <p className={classes.errorMessage}>{passwordErr}</p>
        <button type="submit" className={classes.button} onClick={handleClick}> Signup </button>
        </form>
				
        </div>
        </CSSTransition>
        </form>
        </div>
        </>
    )
}

export default withStyles(styles)(Register);


