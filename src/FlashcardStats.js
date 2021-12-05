import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';
import styles from './styles/FlashcardStatsStyles';

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
        <div className={classes.statsBodyWrapper}>
          <div className={classes.statsLeftWrapper}>
            <div className={classes.cardCountWrapper}>
              <div className={classes.cardCountText}>
                <p><span>Card</span></p>
                {cardCount === cardQuantity ? 'COMPLETE' : (
                  <p>{cardCount} of {cardQuantity}</p>
                )}
              </div>
              <div className={classes.progressBarWrapper}>
                <ProgressBarVert
                  progressPercent={((cardCount) / cardQuantity) * 100}
                  width={12}
                  height={65}
                  borderRadius={3}
                />
              </div>
            </div>
          </div>
          <div className={`${classes.statsMiddleWrapper} animateIn`}>
            <div className={classes.setNameWrapper}>
              <h4>{currentCardSetName}</h4>
            </div>
            <div className={classes.iconWrapper}>
              <i className={iconClass} />
            </div>
          </div>
          <div className={classes.statsRightWrapper}>
            <div className={classes.progressPercentWrapper}>
              <div className={classes.progressBarWrapper}>
                <ProgressBarVert
                  progressPercent={currentMasteryPercentage}
                  width={12}
                  height={65}
                  borderRadius={3}
                />
              </div>
              <div className={classes.masteryText}>
                <p><span>Mastery</span></p>
                <p>{currentMasteryPercentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(FlashcardStats);
