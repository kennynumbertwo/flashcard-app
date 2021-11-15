export default {
  barMax: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: props => (`${props.width}px`),
    height: props => (`${props.height}px`),
    borderRadius: props => (`${props.borderRadius}px`),
    // border: '1px solid rgba(0, 0, 0, 0.2)',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: props => (`${props.borderRadius}px`),
    height: props => (`${props.progressPercent}%`),
    backgroundColor: props => (props.progressPercent === 100 ? 'var(--progress-bar-100)'
      : props.progressPercent > 75 ? 'var(--progress-bar-75)'
        : props.progressPercent > 50 ? 'var(--progress-bar-50)'
          : props.progressPercent > 25 ? 'var(--progress-bar-25)'
            : props.progressPercent > 0 ? 'var(--progress-bar-0)' : 'var(--progress-bar-0)'
    ),
    transition: 'height .5s cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
};
