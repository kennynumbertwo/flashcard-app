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
import { doc } from 'firebase/firestore/lite';
import CreateEmailLogin from './CreateEmailForm';
import LoginEmailForm from './LoginEmailForm';
import db from './firebase.config';
import './styles/LoginStyles.css';

function Login(props) {
  // State
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [creatingEmailLogin, setCreatingEmailLogin] = useState(false);
  const [userToLogIn, setUserToLogIn] = useState({});
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const [firstSignIn, setFirstSignIn] = useState(false);
  const [errorState, setErrorState] = useState({
    errorMessage: '',
    errorCode: '',
    errorDisplay: '',
    isEmailError: false,
    isPasswordError: false,
  });

  // Destructured props
  const { isLoggedIn } = props;

  // Gets auth status on page load. If user is logged in with firebase, bypass login screen
  useEffect(() => {
    let auth = getAuth();
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUserIsLoaded(true);
        setUserToLogIn({
          email: userAuth.email,
          uid: userAuth.uid,
        });
      }
      if (!userAuth) {
        setUserIsLoaded(true);
        setFirstSignIn(true);
      }
    });
  }, []);

  // Toggles the modal shown when an email has been used with another provider
  const toggleModal = () => {
    setIsShowingModal(!isShowingModal);
  };

  // Handles the auth data returned from an auth request by each provider and set's userToLogIn
  // userToLogin is being watched by useEffect in the LoginEmailForm component
  const authHandler = authData => {
    const login = { email: authData.user.email, uid: authData.user.uid };
    setUserToLogIn(login);
    let docRef = doc(db, 'users', authData.user.uid);
    console.log(docRef);
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

  const setEmailErrorState = (errorCode, errorMessage, errorText) => {
    setErrorState({
      errorMessage,
      errorCode,
      errorText,
      isEmailError: true,
      isPasswordError: false,
    });
    setTimeout(() => {
      setErrorState({
        errorMessage: '',
        errorCode: '',
        errorText: '',
        isEmailError: true,
        isPasswordError: false,
      });
    }, 4000);
  };

  const setPasswordErrorState = (errorCode, errorMessage, errorText) => {
    setErrorState({
      errorMessage,
      errorCode,
      errorText,
      isEmailError: false,
      isPasswordError: true,
    });
    setTimeout(() => {
      setErrorState({
        errorMessage: '',
        errorCode: '',
        errorText: '',
        isEmailError: false,
        isPasswordError: true,
      });
    }, 4000);
  };

  const createEmailAccount = (email, password) => {
    const auth = getAuth();
    console.log(auth);
    createUserWithEmailAndPassword(auth, email, password)
      .then(authHandler)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let errorText = '';
        if (errorCode === 'auth/invalid-email') {
          errorText = 'Please enter a valid email address';
          setEmailErrorState(errorCode, errorMessage, errorText);
        }
        if (errorCode === 'auth/email-already-in-use') {
          errorText = 'Account already exists with that email';
          setEmailErrorState(errorCode, errorMessage, errorText);
        } else {
          console.log(
            `Error Code: ${errorCode}`,
            `Error Message: ${errorMessage}`,
          );
        }
      });
    const userRef = doc(db, 'users', uid);
  };

  const signInWithEmail = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(authHandler)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(
          `Error Code: ${errorCode}`,
          `Error Message: ${errorMessage}`,
        );
        let errorText = '';
        // The email of the user's accound used
        if (errorCode === 'auth/wrong-password') {
          errorText = 'Incorrect password';
          setPasswordErrorState(errorCode, errorMessage, errorText);
        // Handle linking here if your app allows it.
        }
        if (errorCode === 'auth/user-not-found') {
          errorText = 'Account not found';
          setPasswordErrorState(errorCode, errorMessage, errorText);
        // Handle linking here if your app allows it.
        }
        if (errorCode === 'auth/invalid-email') {
          errorText = 'Account not found';
          setEmailErrorState(errorCode, errorMessage, errorText);
        // Handle linking here if your app allows it.
        } else {
          console.log(
            `Error Code: ${errorCode}`,
            `Error Message: ${errorMessage}`,
          );
        }
      });
  };

  // If a user is logged in, redirect to the stock collections page
  if (isLoggedIn) {
    return <Redirect to="/my-collections" />;
  }
  // If a user clicked 'Don't Have An Account?', show CreateEmailForm
  if (creatingEmailLogin) {
    return (
      <CreateEmailLogin
        createEmailAccount={createEmailAccount}
        setCreatingEmailLogin={setCreatingEmailLogin}
        userToLogIn={userToLogIn}
        user={props.user}
        setUser={props.setUser}
        firstSignIn={firstSignIn}
        setIsLoggedIn={props.setIsLoggedIn}
        errorState={errorState}
        setErrorState={setErrorState}
        setPasswordErrorState={setPasswordErrorState}
      />
    );
  }
  // Once auth is loaded, show the Login page if a user is not logged in
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
        errorState={errorState}
        setErrorState={setErrorState}
      />
    );
  }
  // Update this to a loading page
  if (!userIsLoaded) {
    return null;
  }
}
export default Login;
