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
    setHighlightText,
  } = props;

  // const handleHover = (e) => {
  //   if (e._reactName === 'onMouseEnter') {
  //     if (e.currentTarget.id === 'previous' && cardCount > 0) {
  //       setHighlightText('Previous Card');
  //     }
  //     if (e.currentTarget.id === 'next' && (cardCount + 1) !== cardQuantity) {
  //       setHighlightText('Next Card');
  //     }
  //   }
  //   if (e._reactName === 'onMouseLeave') { setHighlightText(''); }
  // };

  return (
    <div className={classes.FlashcardActionsWrapper}>
      <div className={classes.FlashcardActionsWrapperInner}>
        <button
          className={classes.prevCardButton}
          type="button"
          onClick={handlePreviousCard}
          id="previous"
        >
          <ChevronLeftIcon fontSize="large" />
        </button>
        {isShowingMastery
          ? (<FlashcardMastery starState={starState} handleStarClick={handleStarClick} setHighlightText={setHighlightText} />)
          : (<FlashcardMastery starState={starState} disabled setHighlightText={setHighlightText} />)}
        <button
          className={classes.nextCardButton}
          type="button"
          onClick={handleNextCard}
          id="next"
        >
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default withStyles(styles)(FlashcardActions);
