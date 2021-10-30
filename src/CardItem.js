import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  CardItemWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
};

function CardItem(props) {
  const { classes, card: { question, answer } } = props;

  const handleDelete = () => {
    console.log('deleting');
  };

  return (
    <div>
      <div className={classes.CardItemWrapper}>
        <div className={classes.CardItemQuestion}>Question: {question}</div>
        <div className={classes.CardItemAnswer}>Answer: {answer}</div>
        <button onClick={handleDelete} type="button">Delete</button>
      </div>
    </div>
  );
}

export default withStyles(styles)(CardItem);
