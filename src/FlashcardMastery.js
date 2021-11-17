import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import StarIcon from '@mui/icons-material/Star';
import styles from './styles/FlashcardMasterStyles';

function Mastery(props) {
  const [starTwoClass, setStarTwoClass] = useState('starNotFilled');
  const { classes, starState, handleStarClick, setHighlightText } = props;
  const { starOne, starTwo, starThree } = starState;

  const handleStarHover = (e) => {
    if (e._reactName === 'onMouseEnter') {
      if (e.currentTarget.id === 'starThree') {
        setStarTwoClass('starFilled');
        setHighlightText('Got it!');
      }
      if (e.currentTarget.id === 'starTwo') {
        setHighlightText('Hmmmm... I think I have it?');
      }
      if (e.currentTarget.id === 'starOne') {
        setHighlightText('I have no clue!');
      }
    }
    if (e._reactName === 'onMouseLeave') { setStarTwoClass('starNotFilled'); setHighlightText(''); }
  };

  return (
    <div className={classes.masteryWrapper}>
      <div className={classes.starsWrapper}>
        <div className={classes.starOneWrapper} id="starOne">
          {starOne
            ? (
              <StarIcon
                onClick={handleStarClick}
                id="starOne"
                className={classes.starFilled}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )
            : (
              <StarIcon
                onClick={handleStarClick}
                id="starOne"
                className={classes.starNotFilled}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )}
        </div>
        <div className={classes.starTwoWrapper} id="starTwo">
          {starTwo
            ? (
              <StarIcon
                onClick={handleStarClick}
                id="starTwo"
                className={classes.starFilled}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )
            : (
              <StarIcon
                onClick={handleStarClick}
                id="starTwo"
                className={classes[starTwoClass]}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )}
        </div>
        <div className={classes.starThreeWrapper} id="starThree">
          {starThree
            ? (
              <StarIcon
                onClick={handleStarClick}
                id="starThree"
                className={classes.starFilled}
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )
            : (
              <StarIcon
                onClick={handleStarClick}
                className={classes.starNotFilled}
                id="starThree"
                onMouseEnter={handleStarHover}
                onMouseLeave={handleStarHover}
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Mastery);
