export default {
  FlashcardActionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: props => (`${props.height}px`),
  },
  FlashcardActionsWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  prevCardButton: {
    border: 'none',
    backgroundColor: 'var(--background-white)',
    borderRadius: '50px',
    boxShadow: props => (props.cardCount > 0 ? '1px 1px 2px 0px rgba(0, 0, 0, 0.6)' : null),
    '& svg': {
      transition: 'all .5s ease-in-out',
      color: props => (props.cardCount > 0 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'),
    },
    '&:hover': {
      cursor: props => (props.cardCount > 0 ? 'pointer' : null),
      boxShadow: props => (props.cardCount > 0 ? '1px 2px 3px 0px rgba(0, 0, 0, 0.6)' : null),
      '& svg': {
        color: props => (props.cardCount > 0 ? 'var(--button-accept-primary)' : null),
      },
    },
    animationName: '$buttonFadeIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1500ms',
  },
  '@keyframes buttonFadeIn': {
    '0%': {
      opacity: '0',
    },
    '50%': {
      opacity: '0',
    },
  },
  nextCardButton: {
    border: 'none',
    backgroundColor: 'var(--background-white)',
    borderRadius: '50px',
    boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 1px 2px 0px rgba(0, 0, 0, 0.6)' : null),
    '& svg': {
      transition: 'all .5s ease-in-out',
      color: props => ((props.cardCount + 1) !== props.cardQuantity ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'),
    },
    '&:hover': {
      cursor: props => ((props.cardCount + 1) !== props.cardQuantity ? 'pointer' : null),
      boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 2px 3px 0px rgba(0, 0, 0, 0.6)' : null),
      '& svg': {
        color: props => ((props.cardCount + 1) !== props.cardQuantity ? 'var(--button-accept-primary)' : null),
      },
    },
    animationName: '$buttonFadeIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1550ms',
  },
};
