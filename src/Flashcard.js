import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/FlashcardSyles';

function Flashcard(props) {
  const { classes, question, answer } = props;

  return (
    <div className={classes.Flashcard}>
      <div className={classes.questionWrapper}>
        <p className={classes.questionText}>{question}</p>
      </div>
      <div className={classes.answerWrapper}>
        {props.showAnswer && (
          <p className={classes.answerText}>{answer}</p>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(Flashcard);
