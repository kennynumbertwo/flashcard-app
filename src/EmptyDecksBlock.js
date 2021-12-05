import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles/EmptyDecksBlock';

function EmptyDecksBlock(props) {
  const { classes } = props;

  return (
    <div className={classes.noDecksWrapper}>
      <div className={classes.noDecksTop}>
        <h4>There are no decks in your collection.</h4>
      </div>
      <div className={classes.noDecksBottom}>
        <h4>Add your first deck!</h4>
        <div className={classes.arrowDownWrapper}>
          <i className="fas fa-long-arrow-alt-down" />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(EmptyDecksBlock);
