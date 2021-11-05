import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';

const styles = {
  FlashcardStatsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    height: '100%',
    // border: '1px solid black',
    color: 'rgba(0, 0, 0, .8)',
  },
  mainCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    height: '200px',
    borderRadius: '3px',
    boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, .1)',
  },
  statsLeftWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '200px',
    width: '200px',
    // border: '1px solid black',
  },
  statsMiddleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: '200px',
    width: '200px',
    // border: '1px solid black',
  },
  statsRightWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '200px',
    width: '200px',
    // border: '1px solid black',
  },
  setNameWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    // border: '1px solid black',
    '& h4': {
      margin: '20px 0px 010px 0px',
      padding: '0px 0px 0px 0px',
    },
  },
  iconWrapper: {
    fontSize: '4.5rem',
  },
  cardCountWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25px',
    // border: '1px solid black',
  },
  progressPercentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75px',
    width: '100%',
    // border: '1px solid black',
  },
  masteryText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    height: '100%',
    width: '75px',
    '& p': {
      fontSize: '1.05rem',
      margin: '0px',
      padding: '0px',
      letterSpacing: '1px',
      color: 'rgba(0, 0, 0, .8)',
    },
  },
};

function FlashcardStats(props) {
  const {
    classes,
    currentCardSetName,
    cardCount,
    cardQuantity,
    currentMasteryPercentage,
    iconClass,
  } = props;
  return (
    <div className={classes.FlashcardStatsWrapper}>
      <div className={classes.mainCard}>
        <div className={classes.statsLeftWrapper} />
        <div className={classes.statsMiddleWrapper}>
          <div className={classes.setNameWrapper}>
            <h4>{currentCardSetName}</h4>
          </div>
          <div className={classes.iconWrapper}>
            <i className={iconClass} />
          </div>
          <div className={classes.cardCountWrapper}>
            <p>Card {cardCount} of {cardQuantity}</p>
          </div>
        </div>
        <div className={classes.statsRightWrapper}>
          <div className={classes.progressPercentWrapper}>
            <ProgressBarVert progressPercent={currentMasteryPercentage} />
            <div className={classes.masteryText}>
              <p>Mastery</p>
              <p>{currentMasteryPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(FlashcardStats);
