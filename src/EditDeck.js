import React from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const styles = {
  EditDeck: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
};

function EditDeck(props) {
  const { classes, isLoggedIn } = props;

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.EditDeck}>Edit Deck Page</div>
  );
}

export default withStyles(styles)(EditDeck);
