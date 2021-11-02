import React from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc } from 'firebase/firestore/lite';
import db from './firebase.config';

const styles = {
  CardItemWrapperOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    height: '50px',
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: '.88rem',
    // border: '1px solid black',
  },
  CardItemWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1000px',
    backgroundColor: 'white',
    height: '45px',
    borderRadius: '3px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
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
    padding: '0px 0px 0px 10px',
    // border: '1px solid black',

  },
  CardItemAnswerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
    // border: '1px solid black',

  },
  CardItemQuestion: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    // border: '1px solid black',
  },
  deleteButton: {
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
  label: {
    fontWeight: '600',
    marginRight: '10px',
  },
};

function CardItem(props) {
  const { classes, card, card: { question, answer, cardNumber }, getDeletedCardArray, fetchUserCardSets, uid, getTotalMasteryRating } = props;

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
      <div className={classes.CardItemWrapperOuter}>
        <div className={classes.CardItemWrapperInner}>
          <div className={classes.CardItemNumWrapper}>
            <p className={classes.CardItemNum}>{cardNumber}</p>
          </div>
          <div className={classes.CardItemQuestionWrapper}>
            <p className={classes.CardItemQuestion}><span className={classes.label}>Question:</span>{question}</p>
          </div>
          <div className={classes.CardItemAnswerWrapper}>
            <p className={classes.CardItemAnswer}><span className={classes.label}>Answer:</span> {answer}</p>
          </div>
          <div className={classes.deleteButtonWrapper}>
            <button className={classes.deleteButton} onClick={handleDelete} type="button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(CardItem);
