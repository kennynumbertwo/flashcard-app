export default {
  root: {
    border: '1px solid black',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    backgroundColor: '#f0f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  FlashcardContainer: {

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
