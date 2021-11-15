import React from 'react';
import { withStyles } from '@material-ui/core';
import ProgressBarVert from './ProgressBarVert';

const styles = {
  FlashcardStatsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '650px',
    height: '100%',
    color: 'var(--text-primary)',
  },
  mainCard: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '125px',
    borderRadius: '0px 0px 25px 25px',
  },
  statsHeaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '65px',
    borderRadius: '0px 0px 5px 5px',
    backgroundColor: 'var(--background-white)',
    borderBottom: '1.5px solid rgba(0, 0, 0, 0.1)',
    borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
    borderRight: '1px solid rgba(0, 0, 0, 0.05)',
    zIndex: '1',

  },
  statsBodyWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '125px',
  },
  statsLeftWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
    width: '150px',
    backgroundColor: 'var(--background-white)',
    borderRadius: '0px 0px 0px 10px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
    animationName: '$statsMidSlideIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1000ms',
  },
  statsMiddleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '125px',
    width: '250px',
    backgroundColor: 'var(--background-white)',
    borderRadius: '0px 0px 15px 15px',
    zIndex: '0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    borderLeft: '1px solid rgba(0, 0, 0, 0.05)',
    borderRight: '1px solid rgba(0, 0, 0, 0.05)',
    animationName: '$statsMidSlideIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '750ms',
  },

  '@keyframes statsMidSlideIn': {
    '0%': {
      transform: 'translateY(-100%)',
    },
    '30%': {
      transform: 'translateY(-100%)',
    },
  },

  '@keyframes statsSideSlideIn': {
    '0%': {
      transform: 'translateY(-100%)',
    },
    '50%': {
      transform: 'translateY(-100%)',
    },
  },

  statsRightWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
    width: '150px',
    backgroundColor: 'var(--background-white)',
    borderRadius: '0px 0px 10px 0px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    borderdRight: '1px solid rgba(0, 0, 0, 0.05)',
    animationName: '$statsMidSlideIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1050ms',
  },
  setNameWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    fontSize: '1.1rem',
    '& h4': {
      color: 'var(--text-primary)',
      margin: '0px 0px 0px 0px',
      padding: '0px 0px 0px 0px',
    },
  },
  iconWrapper: {
    fontSize: '3rem',
    '& i': {
      color: 'var(--text-primary)',
    },
  },
  cardCountWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
    width: '100%',
  },
  progressPercentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
    width: '100%',
  },
  progressBarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
    width: '45px',
  },
  cardCountText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '105px',
    paddingLeft: '35px',
    '& p': {
      fontSize: '1rem',
      margin: '0px',
      padding: '0px',
      letterSpacing: '.05px',
      color: 'var(--text-primary)',
      '& span': {
        fontWeight: '600',
      },
    },
  },
  masteryText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '105px',
    paddingRight: '35px',
    '& p': {
      fontSize: '1rem',
      margin: '0px',
      padding: '0px',
      letterSpacing: '.05px',
      color: 'var(--text-primary)',
      '& span': {
        fontWeight: '600',
      },
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
        {/* <div className={classes.statsHeaderWrapper}>
          <div className={classes.setNameWrapper}>
            <h4>{currentCardSetName}</h4>
          </div>
        </div> */}
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