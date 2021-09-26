import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '25%',
    borderRadius: '10px',
    boxShadow: '0px 5px 10px 3px rgba(0, 0, 0, 0.3)',
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: '1.5rem',
    transition: 'all .2s',
    '& i': {
      transition: 'all .12s',
    },
    '&:hover': {
      cursor: 'pointer',
      color: 'rgba(7, 177, 77, 1)',
    },
  },
  CollectionCardIcon: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '7rem',
  },
  CollectionCardName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px 0 25px',
    padding: 0,
  },
};

function CollectionCard(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.CollectionCardIcon}>
        <i className="fas fa-microscope" />
      </div>
      <div>
        <h4 className={classes.CollectionCardName}>Biology</h4>
      </div>
    </div>
  );
}

export default withStyles(styles)(CollectionCard);
