import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles/ProgressBarVertStyles';

function ProgressBar(props) {
  const { classes } = props;

  return (

    <div className={classes.barMax}>
      <div className={classes.progress} />
    </div>

  );
}

export default withStyles(styles)(ProgressBar);
