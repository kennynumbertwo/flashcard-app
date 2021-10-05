import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import './styles/LoginEmailFormStyles.css';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@material-ui/icons/Facebook';
import GithubIcon from '@material-ui/icons/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Modal from './Modal';

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
  dividerBlock: {
    display: 'flex',
    justifyContent: 'center',
    alightItems: 'center',
    height: '50px',
    width: '100%',
    // border: '1px solid black',
  },
  dividerLine: {
    display: 'flex',
    alignSelf: 'center',
    height: '1px',
    width: '38%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
  },
  dividerText: {
    display: 'flex',
    alignSelf: 'center',
    padding: '0px 10px 0px 10px',
    fontSize: '14px',
  },
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100px',
    width: '75%',
    marginBottom: '15px',
    '& svg': {
      fontSize: '35px',
      color: 'rgba(0, 0, 0, 0.7)',
      '&.facebook': {
        fontSize: '42px',
        transition: 'all 0.4s ease 0s',
        '&:hover': {
          color: 'rgba(7, 177, 77, 0.7)',
          transition: 'all 0.4s ease 0s',
          cursor: 'pointer',
        },
      },
      '&.google': {
        fontSize: '39px',
        transition: 'all 0.4s ease 0s',
        '&:hover': {
          color: 'rgba(7, 177, 77, 0.7)',
          transition: 'all 0.4s ease 0s',
          cursor: 'pointer',
        },
      },
      '&.github': {
        transition: 'all 0.4s ease 0s',
        '&:hover': {
          color: 'rgba(7, 177, 77, 0.7)',
          transition: 'all 0.4s ease 0s',
          cursor: 'pointer',
        },

      },
    },
  },
};

function LoginEmailForm(props) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [animateClass, setAnimateClass] = useState('');
  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const {
    classes,
    setCreatingEmailLogin,
    authenticateGithub,
    authenticateFacebook,
    authenticateGoogle,
    isShowingModal,
    toggleModal } = props;

  useEffect(() => {
    if (props.userToLogIn !== '' && props.user === '') {
      setAnimateClass('Login');
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsAnimatingOut(false);
        props.setUser(props.userToLogIn);
        props.setIsLoggedIn('true');
      }, 500);
    }
  }, [props.userToLogIn]);

  const handleCreateEmailLogin = () => {
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setIsAnimatingOut(false);
      setCreatingEmailLogin(true);
    }, 190);
    return () => clearTimeout(timer);
  };

  // const initializeUser = (login) => {
  //   if (props.user === '') {
  //     props.setUser(login);
  //     props.setIsLoggedIn(true);
  //   } else {
  //     console.log('User already signed in');
  //   }
  // };

  // PasswordInputFunctions

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <nav className={classes.Login}>
      <div className={isAnimatingOut ? `LoginEmailFormCard animateOut${animateClass}` : 'LoginEmailFormCard'}>
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
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              sx={{ width: '275px' }}
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              variant="standard"
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.loginButton}
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
        <div className={classes.dividerBlock}>
          <span className={classes.dividerLine} />
          <p className={classes.dividerText}>OR</p>
          <span className={classes.dividerLine} />
        </div>
        <div className={classes.iconsWrapper}>
          <GoogleIcon className="google" onClick={authenticateGoogle} />
          <FacebookIcon className="facebook" onClick={authenticateFacebook} />
          <GithubIcon className="github" onClick={authenticateGithub} />
        </div>
      </div>
      <Modal
        isShowing={isShowingModal}
        hide={toggleModal}
        messageText="You have signed up with a different provider for that email"
        buttonText="Close"
      />
    </nav>
  );
}

export default withStyles(styles)(LoginEmailForm);
