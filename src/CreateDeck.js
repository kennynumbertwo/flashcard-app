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

function CreateDeck(props) {
  const { classes } = props;
  return (
    <h2 className={classes.root}>Create Deck Page</h2>
  );
}

export default withStyles(styles)(CreateDeck);
