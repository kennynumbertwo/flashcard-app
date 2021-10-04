import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
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
import styles from './styles/LoginStyles';
import './styles/LoginStyles.css';

function Login(props) {
  const { classes, isLoggedIn } = props;

  const [isShowingModal, setIsShowingModal] = useState(false);
  const [creatingEmailLogin, setCreatingEmailLogin] = useState(false);

  const toggleModal = () => {
    setIsShowingModal(!isShowingModal);
  };

  const authHandler = authData => {
    const login = authData.user.email;
    setIsAnimatingOut(true);
    let timer = setTimeout(() => {
      setIsAnimatingOut(false);
      props.initializeUser(login);
    }, 190);
    return () => clearTimeout(timer);
  };

  const authenticateGithub = () => {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const auth = getAuth();
    signInWithPopup(auth, provider).then(authHandler)
      .catch((error) => {
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
    signInWithPopup(auth, provider)
      .then(authHandler)
      .catch((error) => {
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
    signInWithPopup(auth, provider)
      .then(authHandler)
      .catch((error) => {
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

  const createEmailAccount = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(authHandler)
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

  if (isLoggedIn) {
    return <Redirect to="/collections" />;
  }
  if (creatingEmailLogin) {
    return (
      <CreateEmailLogin createEmailAccount={createEmailAccount} />
    );
  }
  return (
    <LoginEmailForm
      setCreatingEmailLogin={setCreatingEmailLogin}
      authenticateGithub={authenticateGithub}
      authenticateFacebook={authenticateFacebook}
      authenticateGoogle={authenticateGoogle}
      isShowingModal={isShowingModal}
      toggleModal={toggleModal}
    />
  );
}
export default withStyles(styles)(Login);
