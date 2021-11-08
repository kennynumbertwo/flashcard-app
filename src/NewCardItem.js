import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import TextField from '@mui/material/TextField';
import db from './firebase.config';

const styles = {
  CardItemWrapperOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    height: '70px',
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: '.88rem',
    animationName: '$newCardSlide',
    animationDuration: '300ms',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: '1',
  },

  '@keyframes newCardSlide': {
    '0%': {
      // transform: 'translateY(-50%)',
      opacity: '0',
    },
    '100%': {
      // transform: 'translateY(0%)',
      opacity: '1',
    },
  },
  CardItemWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    backgroundColor: 'white',
    height: '60px',
    borderRadius: '3px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 1px 7px 0px rgba(0, 0, 0, 0.1)',

  },
  CardItemNumWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '5%',
    padding: '0px 0px 0px 22px',
    // border: '1px solid black',
  },
  CardItemQuestionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%',
    height: '100%',
    padding: '0px 0px 0px 0px',
    // border: '1px solid black',
    '& .MuiFormControl-root.MuiTextField-root.MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
  },
  CardItemAnswerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
    '& .MuiFormControl-root.MuiTextField-root.MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
  },
  CardItemNum: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardItemAnswer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '20%',
    // border: '1px solid black',
  },
  saveButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'rgba(0, 0, 0, 0.6)',
    width: '80px',
    height: '30px',
    border: '1.5px solid rgba(0, 0, 0, 0.0)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(7, 177, 77, 0.7)',
      borderColor: 'rgba(7, 177, 77, 0.7)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
  },
  cancelButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: '.8rem',
    fontWeight: '500',
    background: 'rgba(0, 0, 0, 0.6)',
    width: '80px',
    height: '30px',
    border: '1.5px solid rgba(0, 0, 0, 0.0)',
    transition: 'all 0.4s ease 0s',
    borderRadius: '5px',
    '&:hover': {
      background: 'rgba(7, 177, 77, 0.7)',
      borderColor: 'rgba(7, 177, 77, 0.7)',
      transition: 'all 0.4s ease 0s',
      cursor: 'pointer',
    },
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
      <div className={classes.CardItemWrapperOuter}>
        <div className={classes.CardItemWrapperInner}>
          <div className={classes.CardItemNumWrapper}>
            <p className={classes.CardItemNum}>{newCardFields.cardNumber}</p>
          </div>
          <div className={classes.CardItemQuestionWrapper}>
            <TextField
              label="Question"
              id="question"
              value={newCardFields.question}
              onChange={handleChange}
              size="small"
            />
          </div>
          <div className={classes.CardItemAnswerWrapper}>
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

export default withStyles(styles)(NewCardItem);
