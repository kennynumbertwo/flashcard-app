import React from 'react';
import { withStyles } from '@material-ui/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const styles = {
  masteryWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    '& svg': {
      color: props => (props.disabled ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)'),
    },
  },
  starOneWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: props => (props.disabled ? null : 'pointer'),
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
    cursor: props => (props.disabled ? null : 'pointer'),
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
    cursor: props => (props.disabled ? null : 'pointer'),
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
};
function Mastery(props) {
  const { classes, starState, handleStarClick } = props;
  const { starOne, starTwo, starThree } = starState;
  return (
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
  );
}

export default withStyles(styles)(Mastery);
