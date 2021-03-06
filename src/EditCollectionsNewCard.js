import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import db from './firebase.config';
import styles from './styles/EditCollectionsNewCardStyles';

function EditCollectionsNewCard(props) {
  const {
    classes,
    cardSet,
    uid,
    setIsAddingCard,
    fetchUserCardSets,
    getTotalMasteryRating,
    setOpenSnackbar,
    setSnackbarMessage,
    setIsAnimatingCardItem,
  } = props;
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
    setIsAnimatingCardItem(false);
    setSnackbarMessage('Card Added');
    setOpenSnackbar(true);
    const userRef = doc(db, 'users', uid);
    const updateCardsString = `${cardSet.setName.toLowerCase().replace(/\s+/g, '-')}.cards`;
    await updateDoc(userRef, { [updateCardsString]: arrayUnion({
      ...newCardFields }) });
    let mastery = getTotalMasteryRating([...cardSet.cards, newCardFields]);
    const updateMasteryString = `${cardSet.setName.toLowerCase().replace(/\s+/g, '-')}.mastery`;
    setIsAddingCard(false);
    await updateDoc(
      userRef, { [updateMasteryString]: mastery }, { merge: true },
    );
    fetchUserCardSets();
  };

  const handleCancel = () => {
    setIsAddingCard(false);
  };

  return (
    <div>
      <div className={classes.cardItemWrapperOuter}>
        <div className={classes.cardItemWrapperInner}>
          <div className={classes.cardItemNumWrapper}>
            <p className={classes.cardItemNum}>{newCardFields.cardNumber}</p>
          </div>
          <div className={classes.cardItemQuestionWrapper}>
            <TextField
              label="Question"
              id="question"
              value={newCardFields.question}
              onChange={handleChange}
              size="small"
            />
          </div>
          <div className={classes.cardItemAnswerWrapper}>
            <TextField
              label="Answer"
              id="answer"
              value={newCardFields.answer}
              onChange={handleChange}
              size="small"
            />
          </div>
          <div className={classes.deleteButtonWrapper}>
            <button className={classes.cancelButton} onClick={handleCancel} type="button">Cancel</button>
            <button className={classes.saveButton} onClick={handleSaveCard} type="button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(EditCollectionsNewCard);
