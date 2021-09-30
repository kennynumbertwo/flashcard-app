import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

function About(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <h2>About Page</h2>
      <p>This application was built by Kenny Tye (me).
        I started building this as a way to learn how to build more elaborate React applications.
        I hope you enjoy.
      </p>
    </div>

  );
}

export default withStyles(styles)(About);
