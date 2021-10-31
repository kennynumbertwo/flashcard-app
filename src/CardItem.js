import React from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import db from './firebase.config';

const styles = {
  CardItemWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
};

function CardItem(props) {
  const { classes, card, card: { question, answer }, getDeletedCardArray, fetchUserCardSets, uid, getTotalMasteryRating } = props;

  const handleDelete = async () => {
    let updatedCards = getDeletedCardArray(card);
    const userRef = doc(db, 'users', uid);
    const updateCardsString = `${card.setName.toLowerCase().replace(/\s+/g, '-')}.cards`;
    await updateDoc(userRef, { [updateCardsString]: updatedCards });
    let mastery = getTotalMasteryRating(updatedCards);
    const updateMasteryString = `${card.setName.toLowerCase().replace(/\s+/g, '-')}.mastery`;
    await updateDoc(
      userRef, { [updateMasteryString]: mastery }, { merge: true },
    );
    fetchUserCardSets();
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
