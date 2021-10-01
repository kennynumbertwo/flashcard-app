import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import GithubIcon from '@material-ui/icons/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword }
  from 'firebase/auth';

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

function Login(props) {
  const { classes } = props;

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [creatingEmailLogin, setCreatingEmailLogin] = useState(false);

  const authHandler = authData => {
    const login = authData.user.email;
    return props.initializeUser(login);
  };

  const authenticateGithub = () => {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider).then(authHandler).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's accound used
      const { email } = error;
      const credential = GithubAuthProvider.credentialFromError(error);
      console.log(
        `Error Code: ${errorCode}`,
        `Error Message: ${errorMessage}`,
        `Email: ${email}`,
        `Credential: ${credential}`,
      );
    });
  };

  const authenticateFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider).then(authHandler).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's accound used
      const { email } = error;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(
        `Error Code: ${errorCode}`,
        `Error Message: ${errorMessage}`,
        `Email: ${email}`,
        `Credential: ${credential}`,
      );
    });
  };

  const authenticateGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider).then(authHandler).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's accound used
      const { email } = error;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(
        `Error Code: ${errorCode}`,
        `Error Message: ${errorMessage}`,
        `Email: ${email}`,
        `Credential: ${credential}`,
      );
    });
  };

  const authenticateEmail = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's accound used
        console.log(
          `Error Code: ${errorCode}`,
          `Error Message: ${errorMessage}`,
        );
      });
  };

  if (!loginWithEmail) {
    return (
      <nav className={classes.Login}>
        <div className={classes.LoginCard}>
          <h2>Sign In</h2>
          <p>Please sign in or create an account</p>
          <div className={classes.buttonWrapper}>
            <button
              className={classes.loginButton}
              onClick={() => authenticateGithub()}
              type="button"
            ><span className={classes.buttonText}>Github</span><GithubIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => authenticateFacebook()}
              type="button"
            ><span className={classes.buttonText}>Facebook</span><FacebookIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => authenticateGoogle()}
              type="button"
            ><span className={classes.buttonText}>Google</span><GoogleIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => setLoginWithEmail(true)}
              type="button"
            ><span className={classes.buttonText}>Email</span><AlternateEmailIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => props.logoutUser()}
              type="button"
            ><span className={classes.buttonText}>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }
  if (!creatingEmailLogin && loginWithEmail) {
    return (
      <nav className={classes.Login}>
        <div className={classes.LoginCard}>
          <h2>Login with Email</h2>
          <p>Please sign in or create an account</p>
          <div className={classes.buttonWrapper}>
            <button
              className={classes.loginButton}
              onClick={() => authenticateGithub()}
              type="button"
            ><span className={classes.buttonText}>Github</span><GithubIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => authenticateFacebook()}
              type="button"
            ><span className={classes.buttonText}>Facebook</span><FacebookIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => authenticateGoogle()}
              type="button"
            ><span className={classes.buttonText}>Google</span><GoogleIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => setCreatingEmailLogin(true)}
              type="button"
            ><span className={classes.buttonText}>Email</span><AlternateEmailIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => props.logoutUser()}
              type="button"
            ><span className={classes.buttonText}>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }
  if (creatingEmailLogin) {
    return (
      <nav className={classes.Login}>
        <div className={classes.LoginCard}>
          <h2>Create New Account</h2>
          <p>Please sign in or create an account</p>
          <div className={classes.buttonWrapper}>
            <button
              className={classes.loginButton}
              onClick={() => authenticateGithub()}
              type="button"
            ><span className={classes.buttonText}>Github</span><GithubIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => authenticateFacebook()}
              type="button"
            ><span className={classes.buttonText}>Facebook</span><FacebookIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => authenticateGoogle()}
              type="button"
            ><span className={classes.buttonText}>Google</span><GoogleIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => authenticateEmail()}
              type="button"
            ><span className={classes.buttonText}>Email</span><AlternateEmailIcon />
            </button>
            <button
              className={classes.loginButton}
              onClick={() => props.logoutUser()}
              type="button"
            ><span className={classes.buttonText}>Logout</span>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
export default withStyles(styles)(Login);
