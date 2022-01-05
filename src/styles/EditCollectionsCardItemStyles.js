import sizes from './sizes';

export default {
  CardItemWrapperOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '55px',
    color: 'var(--text-primary)',
    fontSize: '.88rem',
    [sizes.down('md')]: {
      height: '125px',
    },
    [sizes.down('sm')]: {
      height: '175px',
    },
    [sizes.down('xs')]: {
      height: '175px',
    },
  },
  CardItemWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
    width: '98.53%',
    backgroundColor: 'var(--background-white)',
    height: '50px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    animationName: '$card-item-slide',
    animationDuration: props => (`${props.card.cardNumber * 70}ms`),
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => (props.isAnimatingCardItem ? 1 : 0),
    [sizes.down('md')]: {
      height: '120px',
      alignItems: 'flex-start',
      paddingTop: '15px',
    },
    [sizes.down('sm')]: {
      width: '95%',
      height: '170px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: '15px',
    },
    [sizes.down('xs')]: {
      width: '95%',
      height: '170px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },

  '@keyframes card-item-slide': {
    '0%': {
      transform: 'translateY(35%)',
      opacity: 0,
    },
    '50%': {
      opacity: 0.05,
    },
    '100%': {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
  CardItemNumWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '5%',
    padding: '0px 0px 0px 22px',
  },
  CardItemQuestionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%',
    padding: '0px 0px 0px 10px',
    [sizes.down('md')]: {
      alignItems: 'flex-start',
    },
    [sizes.down('sm')]: {
      width: '95%',
      height: '60px',
      alignItems: 'flex-start',
    },
    [sizes.down('xs')]: {
      width: '95%',
      height: '60px',
      alignItems: 'flex-start',
    },
  },
  CardItemAnswerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
    [sizes.down('md')]: {
      alignItems: 'flex-start',
    },
    [sizes.down('sm')]: {
      width: '95%',
      padding: '5px 0px 0px 10px',
      height: '50px',
      alignItems: 'flex-start',
    },
    [sizes.down('xs')]: {
      width: '95%',
      padding: '5px 0px 0px 10px',
      height: '50px',
      alignItems: 'flex-start',
    },
  },
  CardItemQuestion: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '40px',
    width: '100%',
    textAlign: 'left',
    padding: '0px 20px 0px 0px',
    [sizes.down('md')]: {
      alignItems: 'flex-start',
      marginTop: '0px',
    },
    [sizes.down('sm')]: {
      width: '95%',
      maxHeight: '80px',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
    },
    [sizes.down('xs')]: {
      width: '95%',
      maxHeight: '80px',
      margin: '0px 0px 0px 0px',
    },
  },
  CardItemNum: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardItemAnswer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '40px',
    width: '100%',
    textAlign: 'left',
    padding: '0px 20px 0px 0px',
    [sizes.down('md')]: {
      padding: '0px 5px 0px 0px',

      marginTop: '0px',
      alignItems: 'flex-start',
    },
    [sizes.down('sm')]: {
      width: '95%',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
      alignItems: 'flex-start',
    },
    [sizes.down('xs')]: {
      width: '95%',
      margin: '0px 0px 0px 0px',
      padding: '0px 0px 0px 10px',
      alignItems: 'flex-start',
    },
  },
  deleteButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
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
  },
  label: {
    height: '100%',
    fontWeight: '600',
    marginRight: '10px',
  },
};
