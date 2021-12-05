import sizes from './sizes';

export default {
  Login: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [sizes.down('xs')]: {
      alignItems: 'flex-start',
      marginTop: '75px',
    },
  },
  CreateEmailFormCard: {
    height: '600px',
    width: '375px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'var(--background-white)',
    borderRadius: '5px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
    animationName: '$CreateEmailFormCardAnimateIn',
    animationIterationCount: '1',
    animationTimingFunction: 'ease-in',
    animationDuration: '0.2s',
    '& h2': {
      fontSize: '2rem',
      margin: '0px 0px 0px 0px',
    },
    [sizes.down('xs')]: {
      maxWidth: '80vw',
      maxHeight: '70vh',
    },
    '&.animateOut': {
      animationName: '$CreateEmailFormCardAnimateOut',
      animationIterationCount: '1',
      animationTimingFunction: 'ease-in',
      animationDuration: '0.2s',
    },
  },

  '@keyframes CreateEmailFormCardAnimateIn': {
    '0%': {
      opacity: 0,
      transform: 'translateX(50%)',
    },
    '60%': {
      opacity: 0.2,
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0%)',
    },
  },
  '@keyframes CreateEmailFormCardAnimateOut': {
    '0%': {
      opacity: 1,
    },
    '30%': {
      opacity: 0.7,
    },
    '100%': {
      opacity: 0,
    },
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
    '& .MuiFormControl-root': {
      width: '75%',
    },
    '& .MuiFormControl-root.MuiTextField-root': {
      width: '75%',
    },
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: '15%',
    width: '100%',
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
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    [sizes.down('xs')]: {
      width: '110px',
      height: '40px',
      fontSize: '14px',
    },
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
    width: '100%',
    marginTop: '11px',
    '& .MuiFormControl-root': {
      width: '75%',
    },
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
  '@media (max-height: 650px)': {
    CreateEmailFormCard: {
      height: '500px',
      width: '300px',
    },
    loginButton: {
      height: '45px',
      width: '110px',
    },
  },
  '@media (max-height: 510px)': {
    CreateEmailFormCard: {
      height: '400px',
    },
    loginButton: {
      height: '40px',
      width: '100px',
    },
  },
};
