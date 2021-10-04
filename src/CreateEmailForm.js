import React, { useState } from 'react';
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
    height: '40%',
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
  confirmInput: {
    marginTop: '13px',
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

function CreateEmailForm(props) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [email, setEmail] = useState('');
  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleSubmitCreateEmail = () => {
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setIsAnimatingOut(false);
      createEmailAccount();
    }, 195);
    return () => clearTimeout(timer);
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

  const { classes, createEmailAccount } = props;
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
          <div className={classes.confirmInput}>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                sx={{ width: '275px' }}
                id="standard-adornment-confirm-password"
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                variant="standard"
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
          </div>
        </div>
        <div className={classes.buttonWrapper}>
          <button
            className={classes.loginButton}
            onClick={handleSubmitCreateEmail}
            type="button"
          ><span className={classes.buttonText}>Create</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default withStyles(styles)(CreateEmailForm);
