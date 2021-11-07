import React from 'react';
import { withStyles } from '@material-ui/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
  masteryWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
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
  },
  starOneWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '30px',
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1000ms',
  },
  '@keyframes starSlideUp': {
    '0%': {
      transform: 'translateY(200%)',
      opacity: '0',
    },
    '50%': {
      transform: 'translateY(200%)',
      opacity: '0',
    },
  },
  starTwoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '30px',
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1100ms',
  },
  starThreeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '30px',
    animationName: '$starSlideUp',
    animationIterationCount: '1',
    animationTimingFunction: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    animationDuration: '1200ms',
    transition: 'color 300ms ease-in-out',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.8)',
    },
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
  } = props;

  const { starOne, starTwo, starThree } = starState;
  return (
    <div className={classes.FlashcardActionsWrapper}>
      <div className={classes.FlashcardActionsWrapperInner}>
        <button className={classes.prevCardButton} type="button">
          <ChevronLeftIcon fontSize="large" onClick={handlePreviousCard} />
        </button>
        <div className={classes.masteryWrapper}>
          <div className={classes.starsWrapper}>
            <div className={classes.starOneWrapper} id="starOne">
              {starOne
                ? <StarIcon onClick={handleStarClick} id="starOne" />
                : <StarBorderIcon onClick={handleStarClick} id="starOne" />}
            </div>
            <div className={classes.starTwoWrapper} id="starTwo">
              {starTwo
                ? <StarIcon onClick={handleStarClick} id="starTwo" />
                : <StarBorderIcon onClick={handleStarClick} id="starTwo" />}
            </div>
            <div className={classes.starThreeWrapper} id="starThree">
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
    </div>
  );
}

export default withStyles(styles)(FlashcardActions);
