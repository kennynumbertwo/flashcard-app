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
import styles from './styles/CreateEmailFormStyles';

function CreateEmailForm(props) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [email, setEmail] = useState('');
  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleSubmitCreateEmail = (e) => {
    e.preventDefault();
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setIsAnimatingOut(false);
      createEmailAccount(email, values.password);
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
            type="submit"
          ><span className={classes.buttonText}>Submit</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default withStyles(styles)(CreateEmailForm);
