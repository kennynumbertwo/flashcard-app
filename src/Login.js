import React, { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from 'firebase/auth';
import { Redirect } from 'react-router-dom';
import CreateEmailLogin from './CreateEmailForm';
import LoginEmailForm from './LoginEmailForm';
import './styles/LoginStyles.css';

function Login(props) {
  const { isLoggedIn } = props;
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [creatingEmailLogin, setCreatingEmailLogin] = useState(false);
  const [userToLogIn, setUserToLogIn] = useState('');
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const [firstSignIn, setFirstSignIn] = useState(false);

  useEffect(() => {
    let auth = getAuth();
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUserIsLoaded(true);
        setUserToLogIn(userAuth.email);
      }
      if (!userAuth) {
        setUserIsLoaded(true);
        setFirstSignIn(true);
      }
    });
  }, []);

  const toggleModal = () => {
    setIsShowingModal(!isShowingModal);
  };

  const authHandler = authData => {
    const login = authData.user.email;
    setUserToLogIn(login);
  };

  const authenticateGithub = () => {
    const provider = new GithubAuthProvider();
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

  const signInWithEmail = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
  if (userIsLoaded) {
    return (
      <LoginEmailForm
        setCreatingEmailLogin={setCreatingEmailLogin}
        signInWithEmail={signInWithEmail}
        authenticateGithub={authenticateGithub}
        authenticateFacebook={authenticateFacebook}
        authenticateGoogle={authenticateGoogle}
        toggleModal={toggleModal}
        isShowingModal={isShowingModal}
        initializeUser={props.initializeUser}
        isLoggedIn={props.isLoggedIn}
        user={props.user}
        setUser={props.setUser}
        setIsLoggedIn={props.setIsLoggedIn}
        userToLogIn={userToLogIn}
        firstSignIn={firstSignIn}
      />
    );
  }
  if (!userIsLoaded) {
    return null;
  }
}
export default Login;
