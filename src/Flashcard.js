import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/FlashcardSyles';

function Flashcard(props) {
  const { classes } = props;

  const question = (
    <div>
      <p>{props.question}</p>
    </div>
  );

  const answer = (
    <div>
      <p>{props.answer}</p>
    </div>
  );

  return (
    <div className={classes.Flashcard}>
      <div className={classes.question}>
        {question}
      </div>
      <div className={classes.answer}>
        {props.showAnswer && answer}
      </div>
    </div>
  );
}

export default withStyles(styles)(Flashcard);
