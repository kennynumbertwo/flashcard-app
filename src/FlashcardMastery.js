import React from 'react';
import { withStyles } from '@material-ui/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import styles from './styles/FlashcardMasterStyles';

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
