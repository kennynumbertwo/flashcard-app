import React from 'react';
import { withStyles } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const styles = {
  EditDeckList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
};

function EditDeckList(props) {
  const { classes, isLoggedIn, uid } = props;

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.EditDeckList}>Edit Deck List Page</div>
  );
}

export default withStyles(styles)(EditDeckList);
