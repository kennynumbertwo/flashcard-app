import sizes from './sizes';

export default {
  masteryWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '180px',
    '& h4': {
      fontSize: '1.2rem',
    },
    '& p': {
      margin: '15px 0px 0px 0px',
      color: 'var(--text-primary)',
      letterSpacing: '1.01px',
      animationName: '$starSlideUp',
      animationIterationCount: '1',
      animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      animationDuration: '1250ms',
    },
  },
  starsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      fontSize: '2rem',
      color: props => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : null),
    },
  },
  starOneWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      cursor: props => (props.disabled ? null : 'pointer'),
      transition: 'all 200ms ease-in-out',
      '&.starClickedMain': {
        color: 'var(--icon-star-filled-clicked)',
        transform: 'translateY(-4px)',
      },
      [sizes.up('md')]: {
        '&:hover': {
          color: props => (props.disabled ? null : 'var(--icon-star-filled-hover)'),
          transform: 'translateY(-2px)',
          '&.starClickedMain': {
            color: 'var(--icon-star-filled-clicked)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    width: '40px',
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
  starFilled: {
    color: 'var(--icon-star-filled)',
  },
  starNotFilled: {
    color: 'var(--icon-star-notFilled)',
  },
  starTwoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    '& svg': {
      cursor: props => (props.disabled ? null : 'pointer'),
      transition: 'all 200ms ease-in-out',
      '&.starClickedMain': {
        color: 'var(--icon-star-filled-clicked)',
        transform: 'translateY(-4px)',
      },
      [sizes.up('md')]: {
        '&:hover': {
          color: props => (props.disabled ? null : 'var(--icon-star-filled-hover)'),
          transform: 'translateY(-2px)',
          '&.starClickedMain': {
            color: 'var(--icon-star-filled-clicked)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1100ms',
  },
  starThreeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      cursor: props => (props.disabled ? null : 'pointer'),
      transition: 'all 200ms ease-in-out',
      '&.starClickedMain': {
        color: 'var(--icon-star-filled-clicked)',
        transform: 'translateY(-4px)',
      },
      [sizes.up('md')]: {
        '&:hover': {
          color: props => (props.disabled ? null : 'var(--icon-star-filled-hover)'),
          transform: 'translateY(-2px)',
          '&.starClickedMain': {
            color: 'var(--icon-star-filled-clicked)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    width: '40px',
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1200ms',
  },
};
