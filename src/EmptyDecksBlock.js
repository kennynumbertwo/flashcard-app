import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  noDecksWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  noDecksTop: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'var(--text-primary-light)',
    fontStyle: 'italic',
    letterSpacing: '.5px',
    // border: '1px solid black',
    height: '50%',
    '& h4': {
      animation: '500ms ease-in-out 1 $topTextIn',
    },
  },
  '@keyframes topTextIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  },
  noDecksBottom: {
    color: 'var(--text-primary-light)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    height: '50%',
    paddingBottom: '20px',
    '& h4': {
      fontStyle: 'italic',
      letterSpacing: '.5px',
      margin: '0px 0px 10px 0px',
      padding: '0px 0px 0px 0px',
      animation: '700ms ease-in-out 1 $bottomTextIn',
    },
  },
  '@keyframes bottomTextIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
    '50%': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  },
  arrowDownWrapper: {
    animation: '1200ms ease-in-out 1 $arrowIn',
    '& i': {
      animationIterationCount: 'infinite',
      animationName: '$arrowBounce',
      animationDuration: '2000ms',
      animationTimingFunction: 'ease-in-out',
    },
  },

  '@keyframes arrowIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
    '50%': {
      opacity: 0,
      transform: 'translateY(20%)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  },

  '@keyframes arrowBounce': {
    '0%': {
      transform: 'translateY(0%)',
    },
    '50%': {
      transform: 'translateY(30%)',
    },
    '100%': {
      transform: 'translateY(0%)',
    },
  },
};

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
