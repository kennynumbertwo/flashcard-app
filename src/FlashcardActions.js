import React from 'react';
import { withStyles } from '@material-ui/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const styles = {
  FlashcardActionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
    width: '100%',
    height: '60px',
  },
  masteryWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // border: '1px solid black',
    height: '100%',
    width: '180px',
    '& h4': {
      fontSize: '1.2rem',
    },
  },
  starsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // cursor: 'pointer',
  },
  starOneWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '30px',
  },
  starTwoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '30px',
  },
  starThreeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '30px',
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
  },
};

function FlashcardActions(props) {
  const {
    classes,
    starState,
    handleStarClick,
    handleStartOver,
    handlePreviousCard,
    handleNextCard,
  } = props;

  const { starOne, starTwo, starThree } = starState;
  return (
    <div className={classes.FlashcardActionsWrapper}>
      <button className={classes.prevCardButton} type="button">
        <ChevronLeftIcon fontSize="large" onClick={handlePreviousCard} />
      </button>
      <div className={classes.masteryWrapper}>
        <div className={classes.starsWrapper}>
          <div className={classes.starOneWrapper}>
            {starOne
              ? <StarIcon onClick={handleStarClick} id="starOne" />
              : <StarBorderIcon onClick={handleStarClick} id="starOne" />}
          </div>
          <div className={classes.starTwoWrapper}>
            {starTwo
              ? <StarIcon onClick={handleStarClick} id="starTwo" />
              : <StarBorderIcon onClick={handleStarClick} id="starTwo" />}
          </div>
          <div className={classes.starThreeWrapper}>
            {starThree
              ? <StarIcon onClick={handleStarClick} id="starThree" />
              : <StarBorderIcon onClick={handleStarClick} id="starThree" />}
          </div>
        </div>
      </div>
      <button className={classes.nextCardButton} type="button">
        <ChevronRightIcon fontSize="large" onClick={handleNextCard} />
      </button>
    </div>
  );
}

export default withStyles(styles)(FlashcardActions);
