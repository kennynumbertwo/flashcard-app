import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import { CallReceived } from '@material-ui/icons';

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
  question: {
    // border: '1px solid black',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answer: {
    height: '10%',
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
      <div className={classes.question}>
        {props.empty ? 'No more cards. Start over?' : question}
      </div>
      <div className={classes.answer}>
        {props.showAnswer && answer}
      </div>
    </div>
  );
}

export default withStyles(styles)(Flashcard);
