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
import { Redirect } from 'react-router-dom';
import CreateEmailLogin from './CreateEmailForm';
import LoginEmailForm from './LoginEmailForm';
import Modal from './Modal';
import styles from './styles/LoginStyles';
import './styles/LoginStyles.css';

function Login(props) {
  const { classes, isLoggedIn } = props;

  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [creatingEmailLogin, setCreatingEmailLogin] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const toggleModal = () => {
    setIsShowingModal(!isShowingModal);
  };

  const authHandler = authData => {
    const login = authData.user.email;
    props.initializeUser(login);
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
      if (errorCode === 'auth/account-exists-with-different-credential') {
        setIsShowingModal(true);
        // Handle linking here if your app allows it.
      } else {
        console.log(
          `Error Code: ${errorCode}`,
          `Error Message: ${errorMessage}`,
          `Email: ${email}`,
          `Credential: ${credential}`,
        );
      }
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

  const handleLoginWithEmail = () => {
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setLoginWithEmail(true);
      setIsAnimatingOut(false);
    }, 195);
    return () => clearTimeout(timer);
  };

  if (isLoggedIn) {
    return <Redirect to="/collections" />;
  }
  if (!loginWithEmail) {
    return (
      <nav className={classes.Login}>
        <div className={isAnimatingOut ? 'LoginCard animateOut' : 'LoginCard'}>
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
              onClick={handleLoginWithEmail}
              type="button"
            ><span className={classes.buttonText}>Email</span><AlternateEmailIcon />
            </button>
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
  if (!creatingEmailLogin && loginWithEmail) {
    return (
      <LoginEmailForm setCreatingEmailLogin={setCreatingEmailLogin} />
    );
  }
  if (creatingEmailLogin) {
    return (
      <CreateEmailLogin />
    );
  }
}
export default withStyles(styles)(Login);
