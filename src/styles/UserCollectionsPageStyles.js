const ITEM_WIDTH = 1050;

export default {
  UserCardSetsPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxHeight: '100vh',
    height: '100vh',
    border: '1px solid black',
    margin: '0px 0px 0px 0px',
  },

  mainCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '1125px',
    height: '85vh',
    padding: '15px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
    borderRadius: '2px',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'var(--background-collection-main)',
    fontSize: '1rem',
    fontWeight: '400',
  },
  menuBar: {
    height: '50px',
    width: ITEM_WIDTH,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  headerWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  headerText: {
    animationName: '$run-decks-slide-in',
    animationDuration: '500ms',
    animationIterationCount: 1,
    animationTimingFunction: 'ease-in-out',
  },
  '@keyframes run-decks-slide-in': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
    '50%': {
      opacity: 0.4,
    },
  },
  navWrapperOuter: {
    height: '50px',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navWrapperInner: {
    height: '50px',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiTab-root.MuiTab-textColorPrimary.Mui-selected': {
      color: 'var(--tab-primary)',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'var(--tab-primary)',
    },
  },
  filterWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '5px',
    marginLeft: 'auto',
  },
  divider: {
    height: '1px',
    width: ITEM_WIDTH,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '0px 0px 5px 0px',
    padding: '0px 0px 2px 0px',
    // boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  dividerEnd: {
    // height: '1px',
    width: '1020px',
    borderTop: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '0px 0px 0px 0px',
    padding: '0px 0px 0px 0px',
    // boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  itemsWrapperOuter: {
    backgroundColor: 'var(--background-collection-container)',
    height: '100%',
    overflow: 'scroll',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsWrapper: {
    backgroundColor: 'var(--background-collection-container)',
    height: '99%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    border: '2px solid rgba(0, 0, 0, 0.04)',
    width: '1020px',
    // borderRadius: '6px',
  },
  headerCardWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: ITEM_WIDTH,
    height: '60px',
    backgroundColor: 'white',
  },
  headerCard: {
    // border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '1000px',
    height: '55px',
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
    // borderRadius: '5px',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--background-white)',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  setNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 15px',
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
    padding: '0px 0px 0px 15px',
  },
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
  },
  totalCardsWrapper: {
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
  sortIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '100%',
    paddingBottom: '2px',
  },
  sortClickWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  actionsWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navButtonWrapper: {
    backgroundColor: 'var(--button-primary)',
    fontFamily: 'inherit',
    fontWeight: '500',
    height: '40px',
    width: '120px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: '1.8rem',
    borderRadius: '4px',
    border: 'none',
    color: 'var(--text-button-light)',
    transition: 'all 0.4s ease 0s',
    '& p': {
      fontSize: '.9rem',
      margin: '0px 0px 0px 0px',
    },
    '&:hover': {
      backgroundColor: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  viewingButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '300px',
    height: '85px',
    marginBottom: '5px',
    // border: '1px solid black',
  },
  loadingSpinnerWrapper: {
    height: '610px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabWrapper: {
    '& button': {
      animationName: '$tabs-fade-in',
      animationDuration: '500ms',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in-out',

    },
  },
  '@keyframes tabs-fade-in': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
    '50%': {
      opacity: 0.4,
    },
  },
};
