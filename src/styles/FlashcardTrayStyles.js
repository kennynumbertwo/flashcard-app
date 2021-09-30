export default {
  root: {
    // border: '1px solid black',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
};
