import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import db from './firebase.config';

const styles = {
  CardItemWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
  },
};

function NewCardItem(props) {
  const { classes, cardSet, uid, setIsAddingCard, fetchUserCardSets, getTotalMasteryRating } = props;
  // Default state for New Cards
  const [newCardFields, setNewCardFields] = useState({
    question: '',
    answer: '',
    setName: cardSet.setName,
    category: cardSet.category,
    cardNumber: cardSet.cards.length + 1,
    iconClass: cardSet.iconClass,
    masteryRating: 0,
  });

  const handleChange = (e) => {
    setNewCardFields({ ...newCardFields, [e.target.id]: e.target.value });
  };

  const handleSaveCard = async () => {
    const userRef = doc(db, 'users', uid);
    const updateCardsString = `${cardSet.setName.toLowerCase().replace(/\s+/g, '-')}.cards`;
    await updateDoc(userRef, { [updateCardsString]: arrayUnion({
      ...newCardFields }) });
    let mastery = getTotalMasteryRating([...cardSet.cards, newCardFields]);
    const updateMasteryString = `${cardSet.setName.toLowerCase().replace(/\s+/g, '-')}.mastery`;
    await updateDoc(
      userRef, { [updateMasteryString]: mastery }, { merge: true },
    );
    fetchUserCardSets();
    setIsAddingCard(false);
  };

  const handleCancel = () => {
    setIsAddingCard(false);
  };

  return (
    <div>
      <div className={classes.CardItemWrapper}>
        <TextField
          label="Category"
          id="question"
          value={newCardFields.question}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label="Answer"
          id="answer"
          value={newCardFields.answer}
          onChange={handleChange}
          size="small"
        />
        <button onClick={handleSaveCard} type="button">Save</button>
        <button onClick={handleCancel} type="button">Cancel</button>
      </div>
    </div>
  );
}

export default withStyles(styles)(NewCardItem);