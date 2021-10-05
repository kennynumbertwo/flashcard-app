import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword }
  from 'firebase/auth';

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

// const authenticateGithub = () => {
//   const provider = new GithubAuthProvider();
//   provider.setCustomParameters({
//     display: 'popup',
//   });
//   const auth = getAuth();
//   signInWithPopup(auth, provider).then((result) => {
//     // The signed-in user
//     const { user } = result;
//     console.log(user);
//     // This gives you a Github Access Token used to access the Github API
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     const { accessToken } = credential;
//   }).catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's accound used
//     const { email } = error;
//     const credential = GithubAuthProvider.credentialFromError(error);
//     console.log(
//       `Error Code: ${errorCode},
//       Error Message: ${errorMessage},
//       Email: ${email},
//       Credential: ${Object.entries(credential)}`,
//     );
//   });
// };

export {
  authenticateEmail,
  authenticateFacebook,
  authenticateGithub,
  authenticateGoogle,
};
