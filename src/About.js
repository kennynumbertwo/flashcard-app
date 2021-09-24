import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function About(props) {
  const { classes } = props;
  return (
    <h2 className={classes.root}>About Page</h2>
  );
}

export default withStyles(styles)(About);
