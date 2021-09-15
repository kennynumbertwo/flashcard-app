import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  Flashcard: {
    height: '50vh',
    width: '40vw',
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '20px',
    backgroundColor: 'white',
    boxShadow: '5px 5px 10px 5px rgba(0, 0, 0, .1)',
    color: 'rgb(30, 30, 30)',

  },
};

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
      {props.empty ? 'No more cards. Start over?' : question}
      {props.showAnswer && answer}
    </div>
  );
}

export default withStyles(styles)(Flashcard);
