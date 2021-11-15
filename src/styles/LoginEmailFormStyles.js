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
    height: '22.5%',
    width: '100%',
  },
  LoginCardTopTextWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alightItems: 'center',
    flexDirection: 'column',
    paddingTop: '20px',
  },
  signInText: {
    paddingTop: '25px',
    color: 'var(--text-primary-dark)',
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '28.25%',
    paddingBottom: '0px',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '18.75%',
    width: '100%',
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
    background: 'var(--button-primary-dark)',
    width: '125px',
    height: '50px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '& svg': {
      fontSize: '30px',
    },
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  noAccountWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '7.5%',
    width: '100%',
  },
  noAccountText: {
    display: 'flex',
    paddingLeft: '25px',
    '&:hover': {
      cursor: 'pointer',
    },
    '& .navArrow': {
      color: 'rgba(0, 0, 0, 0)',
      paddingBottom: '4px',
      transition: 'all .25s',
      transitionTimingFunction: 'ease-in-out',
    },
    '&:hover .navArrow': {
      color: 'var(--text-primary)',
      transform: 'translateX(35%)',
    },
  },
  dividerBlock: {
    display: 'flex',
    justifyContent: 'center',
    alightItems: 'center',
    height: '8.33%',
    width: '100%',
  },
  dividerLine: {
    display: 'flex',
    alignSelf: 'center',
    height: '1px',
    width: '38%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
  },
  dividerText: {
    display: 'flex',
    alignSelf: 'center',
    padding: '0px 10px 0px 10px',
    fontSize: '14px',
  },
  iconsWrapper: {
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '14.66%',
    width: '75%',
    marginBottom: '15px',
    '& svg': {
      fontSize: '35px',
      color: '(--text-primary)',
      '&.facebook': {
        fontSize: '42px',
        transition: 'all 0.4s ease 0s',
        '&:hover': {
          color: 'var(--button-accept-primary)',
          transition: 'all 0.4s ease 0s',
          cursor: 'pointer',
        },
      },
      '&.google': {
        fontSize: '39px',
        transition: 'all 0.4s ease 0s',
        '&:hover': {
          color: 'var(--button-accept-primary)',
          transition: 'all 0.4s ease 0s',
          cursor: 'pointer',
        },
      },
      '&.github': {
        transition: 'all 0.4s ease 0s',
        '&:hover': {
          color: 'var(--button-accept-primary)',
          transition: 'all 0.4s ease 0s',
          cursor: 'pointer',
        },

      },
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
};
