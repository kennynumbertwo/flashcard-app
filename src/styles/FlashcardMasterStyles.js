export default {
  masteryWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '180px',
    '& h4': {
      fontSize: '1.2rem',
    },
  },
  starsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      color: props => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)'),
    },
  },
  starOneWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: props => (props.disabled ? null : 'pointer'),
    width: '30px',
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1000ms',
  },
  '@keyframes starSlideUp': {
    '0%': {
      transform: 'translateY(200%)',
      opacity: '0',
    },
    '50%': {
      transform: 'translateY(200%)',
      opacity: '0',
    },
  },
  starTwoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: props => (props.disabled ? null : 'pointer'),
    width: '30px',
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1100ms',
  },
  starThreeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: props => (props.disabled ? null : 'pointer'),
    width: '30px',
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1200ms',
  },
};
