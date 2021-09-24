import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function CollectionsPage(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>Collections Page</div>
  );
}

export default withStyles(styles)(CollectionsPage);
