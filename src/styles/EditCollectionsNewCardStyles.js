import sizes from './sizes';

export default {
  cardItemWrapperOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    color: 'var(--text-primary)',
    fontSize: '.88rem',
    animationName: '$newCardSlide',
    animationDuration: '300ms',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: '1',
    [sizes.down('md')]: {
      height: '125px',
      // flexDirection: 'column',
      // justifyContent: 'flex-start',
      // paddingTop: '15px',
    },
    [sizes.down('sm')]: {
      height: '175px',
      width: '96.5%',
    },
    [sizes.down('xs')]: {
      height: '175px',
      width: '96.5%',
    },
  },

  '@keyframes newCardSlide': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
  cardItemWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '98.53%',
    marginTop: '5px',
    backgroundColor: 'var(--background-white)',
    height: '60px',
    // borderRadius: '3px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 1px 7px 0px rgba(0, 0, 0, 0.1)',
    [sizes.down('sm')]: {
      flexDirection: 'column',
      height: '175px',
      justifyContent: 'flex-start',
      paddingTop: '10px',
    },
    [sizes.down('xs')]: {
      height: '175px',
    },

  },
  cardItemNumWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '5%',
    padding: '0px 0px 0px 22px',
    // border: '1px solid black',
  },
  cardItemQuestionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%',
    height: '100%',
    padding: '0px 0px 0px 0px',
    '& .MuiFormControl-root.MuiTextField-root.MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      borderRadius: '2px',
    },
    [sizes.down('sm')]: {
      width: '95%',
      height: '50px',
    },
    [sizes.down('xs')]: {
      width: '95%',
      height: '50px',
    },
  },
  cardItemAnswerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
    '& .MuiFormControl-root.MuiTextField-root.MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      borderRadius: '2px',
    },
    [sizes.down('sm')]: {
      width: '95%',
      height: '50px',
    },
    [sizes.down('xs')]: {
      width: '95%',
      height: '50px',
    },
  },
  cardItemNum: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItemAnswer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '20%',
    [sizes.down('sm')]: {
      width: '95%',
      justifyContent: 'center',
      paddingTop: '10px',
    },
  },
  saveButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80px',
    height: '30px',
    transition: 'all 0.4s ease 0s',
    border: 'none',
    borderRadius: '5px',
    [sizes.down('sm')]: {
      marginLeft: '5px',
    },
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  cancelButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80px',
    height: '30px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-deny-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
    [sizes.down('sm')]: {
      marginRight: '5px',
    },
  },
};
