export default {
  UserCollectionCardDetailsCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '98.53%',
    height: '50px',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 0px 0px',
    // borderRadius: '3px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background-white)',
    fontSize: '1rem',
    transition: 'all .2s',
    textDecoration: 'none',
    animationName: '$card-details-slide',
    animationDuration: props => (`${props.cardNumber * 100}ms`),
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => (props.isAnimatingCardDetails ? 1 : 0),
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },
  '@keyframes card-details-slide': {
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
  setNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '3px 0px 0px 22px',
    '& p': {
      whiteSpace: 'no-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '3px 0px 0px 22px',
    '& p': {
      whiteSpace: 'no-wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  label: {
    margin: '0px 10px 0px 0px',
  },
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  masteryWrapperInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50px',
    height: '50px',
  },
  masteryInfo: {
    padding: '3px 0px 0px 8px',
  },
  totalCardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
    padding: '3px 0px 0px 0px',
  },
  cardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  iconImage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '50px',
    width: '20%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
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
    '&.disabled': {
      backgroundColor: 'var(--button-primary-disabled)',
      '&:hover': {
        cursor: 'default',
        backgroundColor: 'var(--button-primary-disabled)',
      },
    },
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  buttonLink: {
    textDecoration: 'none',
  },

  // MOBILE STYLES

  UserCollectionCardDetailsMobile: {
    // height: '1000px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    width: '92.5%',
    padding: '0px 0px 0px 0px',
    margin: '15px 0px 0px 0px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background-white)',
    fontSize: '.9rem',
    transition: 'all .2s',
    textDecoration: 'none',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    animationName: '$card-details-slide',
    animationDuration: props => (`${props.cardNumber * 100}ms`),
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => (props.isAnimatingCardDetails ? 1 : 0),
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },
  mobileTopWrapper: {
    width: '100%',
    height: '210px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '5px',
    // border: '1px solid red',
  },
  mobileBottomWrapper: {
    width: '100%',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid red',
  },
  mobileSetNameWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid black',
  },
  mobileSetNameLabel: {
    fontWeight: '500',
    padding: '0px 10px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  mobileSetName: {
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  mobileCategoryWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid black',
  },
  categoryLabel: {
    padding: '0px 10px 0px 0px',
    margin: '0px 0px 0px 0px',
    fontWeight: '500',
  },
  mobileCategory: {
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  iconLabel: {
    padding: '0px 20px 0px 0px',
    margin: '0px 0px 0px 0px',
    fontWeight: '500',
  },
  mobileIconWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',
    // border: '1px solid black',
    '& i': {
      fontSize: '1.4rem',
    },
  },
  mobileMasteryDisplayWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  mobileMasteryBar: {
    paddingBottom: '10px',
    border: '1px solid black',
  },
  mobileMasteryWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',
    // border: '1px solid black',
  },
  mobileMasteryLabel: {
    fontWeight: '500',
    padding: '0px 20px 0px 0px',
    margin: '0px 0px 0px 0px',
  },
  mobileMasteryInfo: {
    padding: '0px 0px 0px 10px',
    margin: '0px 0px 0px 0px',
  },
  mobileCardsWrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // flexDirection: 'column',
    // border: '1px solid black',
  },
  mobileCardsLabel: {
    fontWeight: '500',
  },
  mobileButtonWrapper: {
    width: '100%',
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: '1px solid black',
  },
  mobileButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '125px',
    height: '35px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&.disabled': {
      backgroundColor: 'var(--button-primary-disabled)',
      '&:hover': {
        cursor: 'default',
        backgroundColor: 'var(--button-primary-disabled)',
      },
    },
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  mobileButtonLink: {
    textDecoration: 'none',
  },
};
