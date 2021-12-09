import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import StarIcon from '@mui/icons-material/Star';
import styles from './styles/FlashcardMasteryStyles';

function Mastery(props) {
  const [starTwoClass, setStarTwoClass] = useState('starNotFilled');
  const [starOneAnimation, setStarOneAnimation] = useState('');
  const [starTwoAnimation, setStarTwoAnimation] = useState('');
  const [starThreeAnimation, setStarThreeAnimation] = useState('');
  const { classes, starState, handleStarClick, disabled } = props;
  const { starOne, starTwo, starThree } = starState;

  // Handler for mouse hover on a star
  const handleStarHover = (e) => {
    if (!disabled) {
      if (e._reactName === 'onMouseEnter') {
        if (e.currentTarget.id === 'starThree') {
          setStarTwoClass('starFilled');
        }
      }
      if (e._reactName === 'onMouseLeave') { setStarTwoClass('starNotFilled'); }
    }
  };

  // Click handler for star rating click
  const handleStarClickAnimation = (e) => {
    if (!disabled) {
      handleStarClick(e);
      if (e.currentTarget.id === 'starOne') { setStarOneAnimation('starClickedMain'); }
      if (e.currentTarget.id === 'starTwo') {
        setStarTwoAnimation('starClickedMain');
      }
      if (e.currentTarget.id === 'starThree') {
        setStarThreeAnimation('starClickedMain');
      }
      setTimeout(() => {
        setStarOneAnimation('');
        setStarTwoAnimation('');
        setStarThreeAnimation('');
      }, 200);
    }
  };

  return (
    <div className={classes.masteryWrapper}>
      <div className={classes.starsWrapper}>
        <div className={classes.starOneWrapper} id="starOne">
          {starOne
            ? (
              <StarIcon
                onClick={handleStarClickAnimation}
                id="starOne"
                className={`${classes.starFilled} ${starOneAnimation}`}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )
            : (
              <StarIcon
                onClick={handleStarClickAnimation}
                id="starOne"
                className={`${classes.starNotFilled} ${starOneAnimation}`}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )}
        </div>
        <div className={classes.starTwoWrapper} id="starTwo">
          {starTwo
            ? (
              <StarIcon
                onClick={handleStarClickAnimation}
                id="starTwo"
                className={`${classes.starFilled} ${starTwoAnimation}`}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )
            : (
              <StarIcon
                onClick={handleStarClickAnimation}
                id="starTwo"
                className={`${classes[starTwoClass]} ${starTwoAnimation}`}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )}
        </div>
        <div className={classes.starThreeWrapper} id="starThree">
          {starThree
            ? (
              <StarIcon
                onClick={handleStarClickAnimation}
                id="starThree"
                className={`${classes.starFilled} ${starThreeAnimation}`}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )
            : (
              <StarIcon
                onClick={handleStarClickAnimation}
                className={`${classes.starNotFilled} ${starThreeAnimation}`}
                id="starThree"
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )}
        </div>
      </div>
      <p>Mastery Rating</p>
    </div>
  );
}

export default withStyles(styles)(Mastery);
