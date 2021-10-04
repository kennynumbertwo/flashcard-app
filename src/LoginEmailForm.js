import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import useInputState from './hooks/useInputState';
import './styles/LoginEmailFormStyles.css';
import PasswordInput from './PasswordInput';

const styles = {
  Login: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginCardTop: {
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alightItems: 'center',
    height: '30%',
    width: '100%',
  },
  LoginCardTopTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alightItems: 'center',
    flexDirection: 'column',
  },
  signInText: {
    paddingTop: '25px',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '100%',
    height: '35%',
    paddingBottom: '0px',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    height: '25%',
    width: '100%',
  },
  loginButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '16px',
    fontWeight: '400',
    background: 'rgba(0, 0, 0, 0.7)',
    width: '125px',
    height: '50px',
    // margin: '25px',
    border: '1.5px solid rgba(0, 0, 0, 0.7)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '& svg': {
      fontSize: '30px',
    },
    '&:hover': {
      background: 'rgba(7, 177, 77, 0.7)',
      borderColor: 'rgba(7, 177, 77, 0.7)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  noAccountWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // border: '1px solid black',
    height: '10%',
    width: '100%',
  },
  noAccountText: {
    display: 'flex',
    paddingLeft: '25px',
    '&:hover': {
      cursor: 'pointer',
    },
    '& .navArrow': {
      color: 'rgba(0, 0, 0, 0)',
      paddingBottom: '4px',
      transition: 'all .25s',
      transitionTimingFunction: 'ease-in-out',
    },
    '&:hover .navArrow': {
      color: 'rgba(0, 0, 0, .8)',
      transform: 'translateX(35%)',
    },
  },
};

function LoginEmailForm(props) {
  const [email, updateEmail, resetEmail] = useInputState('');
  const [password, updatePassword, resetPassword] = useInputState('');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const { classes, setCreatingEmailLogin } = props;

  const handleCreateEmailLogin = () => {
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setCreatingEmailLogin(true);
      setIsAnimatingOut(false);
    }, 190);
    return () => clearTimeout(timer);
  };

  return (
    <nav className={classes.Login}>
      <div className={isAnimatingOut ? 'LoginEmailFormCard animateOut' : 'LoginEmailFormCard'}>
        <div className={classes.LoginCardTop}>
          <div className={classes.LoginCardTopTextWrapper}>
            <h2 className={classes.signInText}>Sign In</h2>
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <TextField
            id="standard-email-input"
            label="Email"
            type="email"
            autoComplete="current-email"
            variant="standard"
          />
          <PasswordInput />
        </div>
        {/* <input type="text" value={email} onChange={updateEmail} /> */}
        {/* <input type="text" value={password} onChange={updatePassword} /> */}
        <div className={classes.buttonWrapper}>
          <button
            className={classes.loginButton}
            onClick={handleCreateEmailLogin}
            type="button"
          ><span className={classes.buttonText}>Sign In</span>
          </button>
        </div>
        <div className={classes.noAccountWrapper}>
          <a
            className={classes.noAccountText}
            onClick={handleCreateEmailLogin}
          >Don&apos;t Have An Account? <ArrowRightAltIcon className="navArrow" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default withStyles(styles)(LoginEmailForm);
