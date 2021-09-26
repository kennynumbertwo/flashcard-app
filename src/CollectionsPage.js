import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import CollectionCard from './CollectionCard';

const styles = {
  root: {
    marginTop: '64px',
    padding: '0px 50px 10px 50px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100vw',
    height: '100vh',
    border: '2px solid black',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5%',
  },
};

function CollectionsPage(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />

    </div>
  );
}

export default withStyles(styles)(CollectionsPage);
