const ITEM_WIDTH = 1050;

export default {
  EditDeckList: {
    display: 'flex',
    justifyContent: 'flext-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    margin: '64px 0px 0px 0px',
  },
  menuBar: {
    height: '50px',
    width: ITEM_WIDTH,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: 'bold',
    // border: '1px solid black',
  },
  headerWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10px',
    // border: '1px solid black',
  },
  navWrapperOuter: {
    height: '50px',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // border: '1px solid black',
  },
  navWrapperInner: {
    height: '50px',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiTab-root.MuiTab-textColorPrimary.Mui-selected': {
      color: 'rgba(74, 145, 103, 1)',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'rgba(74, 145, 103, 1)',
    },
    // border: '1px solid black',
  },
  sortWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px',
    // border: '1px solid black',
    marginLeft: 'auto',
  },
  divider: {
    height: '1px',
    width: ITEM_WIDTH,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '0px 0px 15px 0px',
    padding: '0px 0px 2px 0px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  dividerEnd: {
    height: '1px',
    width: '1000px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    margin: '10px 0px 15px 0px',
    padding: '1px 0px 2px 0px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  mainCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '1050px',
    height: '85%',
    padding: '0px 0px 0px 0px',
    margin: '5px 0px 5px 0px',
    borderRadius: '2px',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'rgba(250, 250, 250, 0.4)',
    fontSize: '1rem',
    fontWeight: 'bold',
    // border: '1px solid black',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '1000px',
    height: '55px',
    padding: '0px 0px 0px 0px',
    margin: '0px 0px 0px 0px',
    borderRadius: '5px',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: 'white',
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
    // border: '1px solid black',
  },
  categoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '25%',
    height: '50px',
    padding: '0px 0px 0px 15px',

    // border: '1px solid black',
  },
  masteryWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
    // border: '1px solid black',
  },
  totalCardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
    // border: '1px solid black',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '50px',
    // border: '1px solid black',
  },
  actionsWrapper: {
    height: '50px',
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingRight: '10px',
    // border: '1px solid black',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'rgba(0, 0, 0, 0.0)',
    width: '80px',
    height: '30px',
    border: '1.5px solid rgba(0, 0, 0, 0.0)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  addIconWrapper: {
    // border: '1px solid black',
    // width: '100%',
    paddingTop: '15px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '1.8rem',
    color: 'rgba(0, 0, 0, 0.6)',
    transition: 'all 0.4s ease 0s',
    '& p': {
      fontSize: '.8rem',
    },
    '&:hover': {
      color: 'rgba(7, 177, 77, 0.7)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
};
