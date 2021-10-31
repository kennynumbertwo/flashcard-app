import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/FlashcardSyles';

function Flashcard(props) {
  const { classes, question, answer } = props;

  const questionBlock = (
    <div>
      <p>{question}</p>

    </div>
  );

  const answerBlock = (
    <div>
      <p>{answer}</p>
    </div>
  );

  return (
    <div className={classes.Flashcard}>
      <div className={classes.question}>
        {questionBlock}
      </div>
      <div className={classes.answer}>
        {props.showAnswer && answerBlock}
      </div>
    </div>
  );
}

export default withStyles(styles)(Flashcard);
