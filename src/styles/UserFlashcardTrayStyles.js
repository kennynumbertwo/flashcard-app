export default {
  root: {
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'flext-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    margin: '40px 0px 0px 0px',
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  flashcardStatsWrapper: {
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '125px',
    width: '100%',
  },
  flashcardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    // height: '350px',
    width: '100%',
    '& .animateInFirst': {
      animationName: '$flashcardSlideInFirst',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '1000ms',
    },
    '& .animateIn': {
      animationName: '$flashcardSlideIn',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '350ms',
    },
    '& .animateOut': {
      animationName: '$flashcardSlideOut',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '350ms',
    },
    '& .animatePrevIn': {
      animationName: '$flashcardSlidePrevIn',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '350ms',
    },
    '& .animatePrevOut': {
      animationName: '$flashcardSlidePrevOut',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '350ms',
    },
  },

  '@keyframes flashcardSlideInFirst': {
    '0%': {
      transform: 'translateX(200%)',
    },
    '50%': {
      transform: 'translateX(200%)',
    },
  },

  '@keyframes flashcardSlideIn': {
    '0%': {
      transform: 'translateX(200%)',
    },
    '1000%': {
      transform: 'translateX(0%)',
    },
  },

  '@keyframes flashcardSlideOut': {
    '0%': {
      transform: 'translateX(0%)',
    },
    '100%': {
      transform: 'translateX(-200%)',
    },
  },
  '@keyframes flashcardSlidePrevIn': {
    '0%': {
      transform: 'translateX(-200%)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  },
  '@keyframes flashcardSlidePrevOut': {
    '0%': {
      transform: 'translateX(0%)',
    },
    '100%': {
      transform: 'translateX(200%)',
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
    alignItems: 'flex-end',
    // border: '1px solid black',
    width: '100%',
    height: '60px',
    '& h4': {
      fontSize: '1.2rem',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
    },
  },
  actionsWrapper: {
    width: '100%',
  },
};
