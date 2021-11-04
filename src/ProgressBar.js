import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  ProgressBarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '500px',
    height: '30px',
    // border: '1px solid black',
  },
  barMax: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '50px',
    // border: '1px solid rgba(0, 0, 0, 0.2)',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: props => (`${props.progressPercent}%`),
    height: '100%',
    backgroundColor: 'rgba(7, 177, 77, 0.7)',
    borderRadius: '50px',
    transition: 'width .5s cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
};

function ProgressBar(props) {
  const { classes } = props;

  return (
    <div className={classes.ProgressBarWrapper}>
      <div className={classes.barMax}>
        <div className={classes.progress} />
      </div>
    </div>

  );
}

export default withStyles(styles)(ProgressBar);
