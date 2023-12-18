import { useContext } from 'react';
import { useState, useEffect } from 'react';
import {loginCall} from '../../apiCalls';
import { useHistory } from "react-router";
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {styles} from './loginPageStyle'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

function Login({ classes }) {
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const history = useHistory();
  const [passwordErr, setPasswordErr] = useState('');
  
  const handleClick = (e) => {
	e.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	if (email == password) {
		setPasswordErr("Check you password and email again!");
	}
    loginCall({ email: email, password: password }, dispatch);
	if(error == true){
		setPasswordErr("Check you password and email again!");
	}
	console.log(error);
	if(error == false){history.push("/");}
	
  };

    return (
		  <div className={classes.login} >
				<form className={classes.form} noValidate autoComplete="off" onSubmit={handleClick}>
					<h1 className={classes.header}>Log In</h1>
					<p className={classes.text}>new to this app? <Link to='/register'>sign up for free</Link></p>
					<p className={classes.disclaimor}>DISCLAIMER: This application was developed as part of a research project and is designed to gather data on user behavior and interactions, including post reactions and patterns. It is recommended that you refrain from using this application unless you willingly wish to contribute data to the project. In the event that you initially use the application but later decide to have your data removed, kindly contact us at krisztian.antal.buza@ijs.si. Please note that this application is not intended for public use and does not serve as a general service.</p> 
					<TextField 
						className={classes.textField}						
						id='email' 
						name='email' 
						label="Email" 
						required 	
						type="email"
					/>
					{ /*<p className={classes.errorMessage}>err email</p>*/ }
					<TextField
						className={classes.textField}
						id="password"
						label="Password"
						type="password"
						//autoComplete="current-password"
						required
						minLength="6"
					/>
					{ <p className={classes.errorMessage}>{passwordErr}</p>}
					<button type="submit" className={classes.button}>Log In</button>
				</form>
		</div>

    )
}

export default withStyles(styles)(Login);