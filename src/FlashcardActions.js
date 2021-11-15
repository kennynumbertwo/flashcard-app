import React from 'react';
import { withStyles } from '@material-ui/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FlashcardMastery from './FlashcardMastery';
import styles from './styles/FlashcardActionsStyles';

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
        <button className={classes.prevCardButton} type="button" onClick={handlePreviousCard}>
          <ChevronLeftIcon fontSize="large" />
        </button>
        {isShowingMastery
          ? (<FlashcardMastery starState={starState} handleStarClick={handleStarClick} />)
          : (<FlashcardMastery starState={starState} disabled />)}
        <button className={classes.nextCardButton} type="button" onClick={handleNextCard}>
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default withStyles(styles)(FlashcardActions);
