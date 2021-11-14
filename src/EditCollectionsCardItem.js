import React from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc } from 'firebase/firestore/lite';
import db from './firebase.config';

const styles = {
  CardItemWrapperOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1005px',
    height: '55px',
    color: 'var(--text-primary)',
    fontSize: '.88rem',
  },
  CardItemWrapperInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1005px',
    backgroundColor: 'var(--background-white)',
    height: '50px',
    // borderRadius: '3px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    animationName: '$card-item-slide',
    animationDuration: props => (`${props.card.cardNumber * 70}ms`),
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: props => (props.isAnimatingCardItem ? 1 : 0),
    '&:hover': {
      boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.1)',
    },
  },

  '@keyframes card-item-slide': {
    '0%': {
      transform: 'translateY(35%)',
      opacity: 0,
    },
    '50%': {
      opacity: 0.05,
    },
    '100%': {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
  CardItemNumWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '5%',
    padding: '0px 0px 0px 22px',
  },
  CardItemQuestionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%',
    padding: '0px 0px 0px 10px',
  },
  CardItemAnswerWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '30%',
  },
  CardItemQuestion: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '40px',
    width: '100%',
    textAlign: 'left',
    padding: '0px 20px 0px 0px',
    // border: '1px solid black',
    whiteSpace: 'no-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--text-light)',
    textDecoration: 'none',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 'var(--button-fontSize-primary)',
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
  label: {
    fontWeight: '600',
    marginRight: '10px',
  },
};

function CardItem(props) {
  const { classes,
    card,
    card: { question, answer, cardNumber },
    getDeletedCardArray,
    fetchUserCardSets,
    uid,
    getTotalMasteryRating,
    setOpenSnackbar,
    setSnackbarMessage,
    setIsAnimatingCardItem,
  } = props;

  const handleDelete = async () => {
    setIsAnimatingCardItem(false);
    let updatedCards = getDeletedCardArray(card);
    const userRef = doc(db, 'users', uid);
    const updateCardsString = `${card.setName.toLowerCase().replace(/\s+/g, '-')}.cards`;
    await updateDoc(userRef, { [updateCardsString]: updatedCards });
    let mastery = getTotalMasteryRating(updatedCards);
    const updateMasteryString = `${card.setName.toLowerCase().replace(/\s+/g, '-')}.mastery`;
    await updateDoc(
      userRef, { [updateMasteryString]: mastery }, { merge: true },
    );
    setOpenSnackbar(true);
    setSnackbarMessage('Card Deleted');
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
            <span className={classes.label}>Question:</span><p className={classes.CardItemQuestion}>{question}</p>
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
