import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
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
import styles from './styles/LoginEmailFormStyles';

function LoginEmailForm(props) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  // Class applied allowing different between CreateEmailForm and log in animation
  const [animateClass, setAnimateClass] = useState('');
  const [email, setEmail] = useState('');
  // Material UI State for Password Input
  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errorAnimation, setErrorAnimation] = useState('');
  const {
    classes,
    setCreatingEmailLogin,
    authenticateGithub,
    authenticateFacebook,
    authenticateGoogle,
    isShowingModal,
    toggleModal,
    signInWithEmail,
    setErrorState,
    errorState,
  } = props;

  // Checks if there is a user to login AND if there is an authenticated user already signed in
  useEffect(() => {
    if (Object.keys(props.userToLogIn).length !== 0 && Object.keys(props.user).length === 0) {
      if (props.firstSignIn) {
        setAnimateClass('Login');
        setIsAnimatingOut(true);
        setTimeout(() => {
          setIsAnimatingOut(false);
          props.setUser(props.userToLogIn);
          props.setIsLoggedIn(true);
        }, 450);
      } else {
        props.setUser(props.userToLogIn);
        props.setIsLoggedIn(true);
      }
    }
  }, [props.userToLogIn]);

  useEffect(() => {
    if (errorState.errorMessage) {
      setErrorAnimation('errorIn');
      setTimeout(() => {
        setErrorAnimation('errorOut');
      }, 3500);
    }
    if (errorState.errorMessage === '') {
      setErrorAnimation('');
    }
  }, [errorState.errorMessage]);

  const handleCreateEmailLogin = () => {
    setErrorState({
      errorMessage: '',
      errorCode: '',
      errorText: '',
      isEmailError: false,
      isPasswordError: false,
    });
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setIsAnimatingOut(false);
      setCreatingEmailLogin(true);
    }, 190);
    return () => clearTimeout(timer);
  };

  // PasswordInputFunctions

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmail(email, values.password);
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
      <div className={isAnimatingOut ? `${classes.LoginEmailFormCard} animateOut${animateClass}` : `${classes.LoginEmailFormCard}`}>
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
            value={email}
            onChange={handleEmailChange}
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
        <div className={classes.errorTextWrapper}>
          {errorState.errorText && <p className={`${classes.errorText} ${errorAnimation}`}>{errorState.errorText}</p>}
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.loginButton}
            type="button"
            onClick={handleSignIn}
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
