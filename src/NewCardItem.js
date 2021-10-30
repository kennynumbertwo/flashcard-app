import React, { useState, useEffect } from 'react';
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
  const { classes, userCardSetDatabase, fetchUserCardSets, cardSet, uid, setIsViewingCardsState, isViewingCardsState, setIsAddingCard } = props;
  // Default state for New Cards
  const [newCardFields, setNewCardFields] = useState({
    question: '',
    answer: '',
    setName: cardSet.setName,
    category: cardSet.category,
    iconClass: cardSet.iconClass,
    masteryRating: 0,
  });
  const [currentDeckLength, setCurrentDeckLength] = useState(
    cardSet.cards.length,
  );

  useEffect(() => {
    if (userCardSetDatabase) {
      getDeckLength();
    }
  }, [userCardSetDatabase]);

  const getDeckLength = () => {
    userCardSetDatabase.forEach(userCardSet => {
      if (userCardSet.setName === cardSet.setName) {
        setCurrentDeckLength(cardSet.cards.length);
      }
    });
  };

  const handleChange = (e) => {
    setNewCardFields({ ...newCardFields, [e.target.id]: e.target.value });
  };

  const handleSaveCard = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${cardSet.setName.toLowerCase().replace(/\s+/g, '-')}.cards`;
    await updateDoc(userRef, { [updateString]: arrayUnion({
      ...newCardFields, cardNumber: currentDeckLength + 1 }) });
    fetchUserCardSets();
    setNewCardFields({
      question: '',
      answer: '',
      setName: cardSet.setName,
      category: cardSet.category,
      iconClass: cardSet.iconClass,
      masteryRating: 0,
    });
    setIsAddingCard(false);
    // setIsViewingCardsState({ ...isViewingCardsState, isViewing: false });
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
      </div>
    </div>
  );
}

export default withStyles(styles)(NewCardItem);
