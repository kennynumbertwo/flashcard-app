import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import './styles/CreateEmailFormStyles.css';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import styles from './styles/CreateEmailFormStyles';

function CreateEmailForm(props) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [email, setEmail] = useState('');
  const [errorAnimation, setErrorAnimation] = useState('');
  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  // Destructured props
  const {
    classes,
    createEmailAccount,
    userToLogIn,
    user,
    firstSignIn,
    setUser,
    setIsLoggedIn,
    setCreatingEmailLogin,
    setErrorState,
    errorState,
    setPasswordErrorState,
  } = props;

  useEffect(() => {
    if (Object.keys(userToLogIn).length !== 0 && Object.keys(user).length === 0) {
      if (firstSignIn) {
        // setAnimateClass('Login');
        setIsAnimatingOut(true);
        setTimeout(() => {
          setIsAnimatingOut(false);
          setUser(userToLogIn);
          setIsLoggedIn(true);
        }, 200);
      } else {
        setUser(props.userToLogIn);
        setIsLoggedIn(true);
      }
    }
  }, [userToLogIn]);

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

  const handleSubmitCreateEmail = (e) => {
    e.preventDefault();
    if (values.password === values.confirmPassword && values.password.length > 5) {
      createEmailAccount(email, values.password);
    } else {
      if (values.password !== values.confirmPassword) {
        const errorCode = 'invalid password';
        const errorMessage = 'passwords do not match';
        const errorText = 'The passwords you provided do not match';
        setPasswordErrorState(errorCode, errorMessage, errorText);
      }
      if (values.password.length <= 5) {
        const errorCode = 'invalid password';
        const errorMessage = 'password not long enough';
        const errorText = 'Password not long enough';
        setPasswordErrorState(errorCode, errorMessage, errorText);
      }
    }
  };

  const handleBackToLogin = () => {
    setErrorState({
      errorMessage: '',
      errorCode: '',
      errorText: '',
      isEmailError: false,
      isPasswordError: false,
    });
    setCreatingEmailLogin(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

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

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  return (
    <nav className={classes.Login}>
      <div className={isAnimatingOut ? 'CreateEmailFormCard animateOut' : 'CreateEmailFormCard'}>
        <div className={classes.LoginCardTop}>
          <div className={classes.LoginCardTopTextWrapper}>
            <h2 className={classes.signInText}>Create Account</h2>
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <TextField
            id="standard-email-input"
            label="Email"
            value={email}
            type="email"
            autoComplete="current-email"
            variant="standard"
            error={errorState.isEmailError}
            onChange={handleEmailChange}
          />
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password" error={errorState.isPasswordError}>Password</InputLabel>
            <Input
              sx={{ width: '275px' }}
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              variant="standard"
              error={errorState.isPasswordError}
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
          <div className={classes.confirmInput}>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password" error={errorState.isPasswordError}>Confirm Password</InputLabel>
              <Input
                sx={{ width: '275px' }}
                id="standard-adornment-confirm-password"
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                variant="standard"
                error={errorState.isPasswordError}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
              )}
              />
            </FormControl>
            <div className={classes.errorTextWrapper}>
              {errorState.errorText && <p className={`${classes.errorText} ${errorAnimation}`}>{errorState.errorText}</p>}
            </div>
          </div>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.loginButton}
            onClick={handleSubmitCreateEmail}
            type="submit"
          ><span className={classes.buttonText}>Submit</span>
          </button>
        </div>
        <div className={classes.backToLoginWrapper}>
          <a
            className={classes.backToLoginText}
            onClick={handleBackToLogin}
          ><span className={classes.arrowWrapper}><ArrowRightAltIcon className="navArrow" /></span>Back To Login
          </a>
        </div>
      </div>
    </nav>
  );
}

export default withStyles(styles)(CreateEmailForm);
