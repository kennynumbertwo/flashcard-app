export default {
  root: {
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'flext-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    margin: '64px 0px 0px 0px',
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  preStart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  cardQuantitySelect: {
    display: 'flex',
    width: '100%',
    height: '100px',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: '3rem',
  },
  buttonContainer: {
    height: '100px',
    width: '25vw',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  nextButton: {
    width: '160px',
    backgroundColor: 'rgba(7, 177, 77, 0.9)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(7, 177, 77, 0.7)',
    },
  },
  startButton: {
    width: '200px',
    height: '50px',
    backgroundColor: 'rgba(7, 177, 77, 0.9)',
    fontSize: '1.1rem',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(7, 177, 77, 0.7)',
    },
  },
  showButton: {
    width: '160px',
  },
  startOverButton: {
    width: '160px',
  },
  masteryWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& h4': {
      fontSize: '1.2rem',
    },
  },
  starsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
};
