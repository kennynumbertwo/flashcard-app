export default {
  Flashcard: {
    height: '350px',
    width: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '20px',
    backgroundColor: 'var(--background-white)',
    boxShadow: '5px 5px 10px 5px rgba(0, 0, 0, .1)',
    color: 'var(--text-primary-dark)',
  },
  questionWrapper: {
    height: '50%',
    width: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  questionText: {
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerWrapper: {
    height: '50%',
    width: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5px',
  },
  answerText: {
    color: 'var(--text-primary-dark)',
    '&.answerIn': {
      animationName: '$answerIn',
      animationDuration: '300ms',
      animationTimingFunction: 'ease-in-out',
      animationCount: '1',
    },
    '&.answerOut': {
      animationName: '$answerOut',
      animationDuration: '250ms',
      animationTimingFunction: 'ease-in-out',
      animationCount: '1',
    },
  },

  '@keyframes answerIn': {
    '0%': {
      opacity: 0,

    },
    '100%': {
      opacity: 1,

    },
  },
  '@keyframes answerOut': {
    '0%': {
      opacity: 1,

    },
    '100%': {
      opacity: 0,

    },
  },
};
