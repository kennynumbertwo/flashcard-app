import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import useInputState from './hooks/useInputState';
import './styles/CreateEmailFormStyles.css';

const styles = {
  Login: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginCard: {
    height: '500px',
    width: '375px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
    '& h2': {
      fontSize: '2rem',
      margin: '0px 0px 0px 0px',
    },
    '& p': {
      fontSize: '1.2rem',
    },
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

function CreateEmailForm(props) {
  const [email, updateEmail, resetEmail] = useInputState('');
  const [password, updatePassword, resetPassword] = useInputState('');
  const [confirmPassword, updateConfirmPassword, resetConfirmPassword] = useInputState('');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleSubmitCreateEmail = () => {
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setIsAnimatingOut(false);
    }, 195);
    return () => clearTimeout(timer);
  };

  const { classes, setCreatingEmailLogin } = props;
  return (
    <nav className={classes.Login}>
      <div className={isAnimatingOut ? 'CreateEmailFormCard animateOut' : 'CreateEmailFormCard'}>
        <h2>Create An Account</h2>
        <p>Please sign</p>
        <input type="text" value={email} onChange={updateEmail} />
        <input type="text" value={password} onChange={updatePassword} />
        <input type="text" value={confirmPassword} onChange={updateConfirmPassword} />
        <div className={classes.buttonWrapper}>
          <button
            className={classes.loginButton}
            onClick={handleSubmitCreateEmail}
            type="button"
          ><span className={classes.buttonText}>Create Account</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default withStyles(styles)(CreateEmailForm);