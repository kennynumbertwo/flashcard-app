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
    height: '25%',
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
    color: 'var(--text-primary)',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '50%',
    marginBottom: '0px',
    paddingBottom: '25px',
    // border: '1px solid black',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: '15%',
    width: '100%',
    // border: '1px solid black',
    // marginBottom: '20px',
  },
  loginButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '16px',
    fontWeight: '400',
    background: 'var(--button-primary-dark)',
    width: '125px',
    height: '50px',
    border: '1.5px solid var(--button-primary-dark)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '& svg': {
      fontSize: '30px',
    },
    '&:hover': {
      background: 'var(--button-accept-primary)',
      borderColor: 'var(--button-accept-primary)',
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
  '@keyframes fadeOut': {
    '0%': {
      opacity: 1,
      transform: 'translateY(0%)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateY(25%)',
    },
  },

  errorTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '1px',
    width: '100%',
    transform: 'translateY(20px)',
  },
  errorText: {
    fontSize: '0.85rem',
    color: 'var(--text-warning)',
    paddingTop: '10px',
    '&.errorIn': {
      animation: '$fadeIn .5s',
    },
    '&.errorOut': {
      animation: '$fadeOut .5s',
    },
  },
  backToLoginWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '10%',
    width: '100%',
  },
  arrowWrapper: {
    transform: 'rotate(180deg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToLoginText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '25px',
    color: 'var(--text-primary)',
    '&:hover': {
      cursor: 'pointer',
    },
    '& .navArrow': {
      color: 'var(--text-primary-invis)',
      transition: 'transform .25s',
      transitionTimingFunction: 'ease-in-out',
    },
    '&:hover .navArrow': {
      color: 'var(--text-primary)',
      transform: 'translateX(35%)',
    },
  },
};
