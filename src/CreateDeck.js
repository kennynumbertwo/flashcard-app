import React from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function CreateDeck(props) {
  const { classes, isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <h2 className={classes.root}>Create Deck Page</h2>
  );
}

export default withStyles(styles)(CreateDeck);