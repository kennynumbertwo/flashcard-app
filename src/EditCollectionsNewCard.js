import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import db from './firebase.config';

const styles = {
  cardItemWrapperOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    height: '70px',
    color: 'var(--text-primary)',
    fontSize: '.88rem',
    animationName: '$newCardSlide',
    animationDuration: '300ms',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: '1',
  },

  '@keyframes newCardSlide': {
    '0%': {
      opacity: '0',
    },
    '100%': {
      opacity: '1',
    },
  },
  cardItemWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    backgroundColor: 'var(--background-white)',
    height: '60px',
    borderRadius: '3px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 1px 7px 0px rgba(0, 0, 0, 0.1)',

  },
  cardItemNumWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '5%',
    padding: '0px 0px 0px 22px',
    // border: '1px solid black',
  },
  cardItemQuestionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%',
    height: '100%',
    padding: '0px 0px 0px 0px',
    '& .MuiFormControl-root.MuiTextField-root.MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
  },
  cardItemAnswerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
    '& .MuiFormControl-root.MuiTextField-root.MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
  },
  cardItemNum: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItemAnswer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '20%',

  },
  saveButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80px',
    height: '30px',
    transition: 'all 0.4s ease 0s',
    border: 'none',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-accept-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  cancelButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'var(--button-primary)',
    width: '80px',
    height: '30px',
    border: 'none',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'var(--button-deny-primary)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
};

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
