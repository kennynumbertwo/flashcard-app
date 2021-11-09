export default {
  Flashcard: {
    height: '350px',
    width: '600px',
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '20px',
    backgroundColor: 'white',
    boxShadow: '5px 5px 10px 5px rgba(0, 0, 0, .1)',
    color: 'rgb(30, 30, 30)',
  },
  questionWrapper: {
    height: '50%',
    width: '85%',
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  questionText: {
    // border: '1px solid black',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerWrapper: {
    height: '50%',
    width: '85%',
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5px',
  },
  answerText: {
    color: 'rgba(0, 0, 0, 0.6)',
    animationName: '$answerIn',
    animationDuration: '400ms',
    animationTimingFunction: 'ease-in-out',
    animationCount: '1',
  },

  '@keyframes answerIn': {
    '0%': {
      opacity: 0,

    },
    '100%': {
      opacity: 1,

    },
  },
};
