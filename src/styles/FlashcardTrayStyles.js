export default {
  root: {
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
    marginTop: '75px',
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
    '& .animateStartOver': {
      animationName: '$flashcardStartOver',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '1000ms',
    },
  },

  '@keyframes flashcardSlideInFirst': {
    '0%': {
      transform: 'translateX(250%)',
    },
    '50%': {
      transform: 'translateX(250%)',
    },
  },

  '@keyframes flashcardSlideIn': {
    '0%': {
      transform: 'translateX(200%)',
    },
    '100%': {
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
  '@keyframes flashcardStartOver': {
    '0%': {

      opacity: '1',
    },
    '50%': {

      opacity: '0',
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
    width: '100%',
    height: '60px',
    '& h4': {
      fontSize: '1.2rem',
      padding: '0px 0px 0px 0px',
      margin: '0px 0px 0px 0px',
      width: '120px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      animationName: '$wipe',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '1500ms',
    },
  },
  '@keyframes wipe': {
    '0%': {
      width: '0px',
    },
    '60%': {
      width: '0px',
    },
  },
  actionsWrapper: {
    width: '100%',
  },
  showAnswerButton: {
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '50px',
    marginTop: '30px',
    boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 1px 2px 0px rgba(0, 0, 0, 0.6)' : null),
    '& svg': {
      transition: 'all .5s ease-in-out',
      color: props => ((props.cardCount + 1) !== props.cardQuantity ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'),
    },
    '&:hover': {
      cursor: props => ((props.cardCount + 1) !== props.cardQuantity ? 'pointer' : null),
      boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 2px 3px 0px rgba(0, 0, 0, 0.6)' : null),
    },
    animationName: '$answerButtonFadeIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1900ms',
  },
  '@keyframes answerButtonFadeIn': {
    '0%': {
      opacity: '0',
    },
    '50%': {
      opacity: '0',
    },
  },
  restartButton: {
    border: 'none',
    backgroundColor: 'var(--background-white)',
    borderRadius: '50px',
    marginTop: '30px',
    boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 1px 2px 0px rgba(0, 0, 0, 0.6)' : null),
    '& svg': {
      transition: 'all .5s ease-in-out',
      color: props => ((props.cardCount + 1) !== props.cardQuantity ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'),
    },
    '&:hover': {
      cursor: props => ((props.cardCount + 1) !== props.cardQuantity ? 'pointer' : null),
      boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 2px 3px 0px rgba(0, 0, 0, 0.6)' : null),
    },
    animationName: '$answerButtonFadeIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '2000ms',
  },
  '@keyframes restartButtonFadeIn': {
    '0%': {
      opacity: '0',
    },
    '50%': {
      opacity: '0',
    },
  },
};
