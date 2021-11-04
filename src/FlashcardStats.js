import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBar from './ProgressBar';

const styles = {
  FlashcardStatsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '250px',
    // border: '1px solid black',
  },
  mainCard: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '1000px',
    height: '175px',
    borderRadius: '3px',
    boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .1)',
  },
  setNameWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
  },
  cardCountWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25px',
    // border: '1px solid black',
  },
};

function FlashcardStats(props) {
  const {
    classes,
    currentCardSetName,
    cardCount,
    cardQuantity,
    currentMasteryPercentage,
  } = props;
  return (
    <div className={classes.FlashcardStatsWrapper}>
      <div className={classes.mainCard}>
        <div className={classes.setNameWrapper}>
          <h4>{currentCardSetName}</h4>
        </div>
        <p>Mastery {currentMasteryPercentage}%</p>
        <ProgressBar progressPercent={(cardCount / cardQuantity) * 100} />
        <div className={classes.cardCountWrapper}>
          <p>Card {cardCount} of {cardQuantity}</p>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(FlashcardStats);
