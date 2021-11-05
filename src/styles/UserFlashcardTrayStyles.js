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
  flashcardStatsWrapper: {
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '200px',
    width: '100%',
  },
  flashcardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    // height: '350px',
    width: '100%',
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
  progressBarWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75px',
  },
  showButton: {
    width: '160px',
  },
  startOverButton: {
    width: '160px',
  },
  rate: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // border: '1px solid black',
    width: '100%',
    height: '50px',
    '& h4': {
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
    },
  },
  actionsWrapper: {
    width: '100%',
  },
};
