import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
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
    backgroundColor: props => (props.progressPercent === 100 ? 'rgba(7, 177, 77, 0.7)'
      : props.progressPercent > 75 ? 'rgba(173, 230, 126, 1)'
        : props.progressPercent > 50 ? 'rgba(250, 255, 92, 1)'
          : props.progressPercent > 25 ? 'rgba(255, 196, 0, 1)'
            : props.progressPercent > 0 ? 'rgba(252, 76, 76, 1)' : 'rgba(252, 76, 76, 0.7)'
    ),
    transition: 'height .5s cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
};

function ProgressBar(props) {
  const { classes } = props;

  return (

    <div className={classes.barMax}>
      <div className={classes.progress} />
    </div>

  );
}

export default withStyles(styles)(ProgressBar);
