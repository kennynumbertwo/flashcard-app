import React from 'react';
import { withStyles } from '@material-ui/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Mastery from './Mastery';

const styles = {
  FlashcardActionsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    width: '100%',
    height: props => (`${props.height}px`),
  },
  FlashcardActionsWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  prevCardButton: {
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '50px',
    boxShadow: props => (props.cardCount > 0 ? '1px 1px 2px 0px rgba(0, 0, 0, 0.6)' : null),
    '& svg': {
      transition: 'all .5s ease-in-out',
      color: props => (props.cardCount > 0 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'),
    },
    '&:hover': {
      cursor: props => (props.cardCount > 0 ? 'pointer' : null),
      boxShadow: props => (props.cardCount > 0 ? '1px 2px 3px 0px rgba(0, 0, 0, 0.6)' : null),
    },
    animationName: '$buttonFadeIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1500ms',
  },
  '@keyframes buttonFadeIn': {
    '0%': {
      opacity: '0',
    },
    '50%': {
      opacity: '0',
    },
  },
  nextCardButton: {
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '50px',
    boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 1px 2px 0px rgba(0, 0, 0, 0.6)' : null),
    '& svg': {
      transition: 'all .5s ease-in-out',
      color: props => ((props.cardCount + 1) !== props.cardQuantity ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'),
    },
    '&:hover': {
      cursor: props => ((props.cardCount + 1) !== props.cardQuantity ? 'pointer' : null),
      boxShadow: props => ((props.cardCount + 1) !== props.cardQuantity ? '1px 2px 3px 0px rgba(0, 0, 0, 0.6)' : null),
    },
    animationName: '$buttonFadeIn',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1550ms',
  },
};

function FlashcardActions(props) {
  const {
    classes,
    starState,
    handleStarClick,
    handlePreviousCard,
    handleNextCard,
    isShowingMastery,
  } = props;

  return (
    <div className={classes.FlashcardActionsWrapper}>
      <div className={classes.FlashcardActionsWrapperInner}>
        <button className={classes.prevCardButton} type="button">
          <ChevronLeftIcon fontSize="large" onClick={handlePreviousCard} />
        </button>
        {isShowingMastery
          ? (<Mastery starState={starState} handleStarClick={handleStarClick} />)
          : (<Mastery starState={starState} disabled />)}
        <button className={classes.nextCardButton} type="button">
          <ChevronRightIcon fontSize="large" onClick={handleNextCard} />
        </button>
      </div>
    </div>
  );
}

export default withStyles(styles)(FlashcardActions);
