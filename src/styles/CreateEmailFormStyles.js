export default {
  Login: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginCardTop: {
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
    width: '100%',
    height: '40%',
    marginBottom: '0px',
    // border: '1px solid black',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '25%',
    width: '100%',
    // border: '1px solid black',
    // marginBottom: '20px',
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
    marginTop: '11px',
  },

  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(25%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  },

  noMatchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10px',
    width: '100%',
    '& p': {
      fontSize: '14px',
      color: '#f66666',
      paddingTop: '10px',
      animation: '$fadeIn .5s',
    },
  },
};
