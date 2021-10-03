import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import useInputState from './hooks/useInputState';
import './styles/LoginEmailFormStyles.css';

const styles = {
  Login: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '15px',
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
    width: '200px',
    height: '50px',
    margin: '10px',
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
  buttonText: {
    padding: '2px 10px 0px 0px',
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
        <h2>Sign In</h2>
        <p>Please sign</p>
        <input type="text" value={email} onChange={updateEmail} />
        <input type="text" value={password} onChange={updatePassword} />
        <div className={classes.buttonWrapper}>
          <button
            className={classes.loginButton}
            onClick={handleCreateEmailLogin}
            type="button"
          ><span className={classes.buttonText}>Sign In</span>
          </button>
          <p>Don&apos;t Have An Account?</p>
        </div>
      </div>
    </nav>
  );
}

export default withStyles(styles)(LoginEmailForm);
