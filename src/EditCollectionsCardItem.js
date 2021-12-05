import React from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc } from 'firebase/firestore/lite';
import styles from './styles/EditCollectionsCardItemStyles';
import db from './firebase.config';

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
    isMobile,
  } = props;

  // Click handler for deleting a card from a deck
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
    <>
      <div className={classes.CardItemWrapperOuter}>
        <div className={classes.CardItemWrapperInner}>
          {!isMobile && (
          <div className={classes.CardItemNumWrapper}>
            <p className={classes.CardItemNum}>{cardNumber}</p>
          </div>
          )}
          <div className={classes.CardItemQuestionWrapper}>
            <span className={classes.label}>Question:</span>
            <p className={classes.CardItemQuestion}>
              {isMobile ? (
                question.length > 75 ? `${question.slice(0, 75)}...` : question
              ) : (
                question.length > 80 ? `${question.slice(0, 80)}...` : question
              )}
            </p>
          </div>
          <div className={classes.CardItemAnswerWrapper}>
            <span className={classes.label}>Answer:</span>
            { isMobile ? (
              <p className={classes.CardItemAnswer}>{answer.length > 50 ? `${answer.slice(0, 50)}...` : answer}</p>
            ) : (
              <p className={classes.CardItemAnswer}>{answer.length > 30 ? `${answer.slice(0, 30)}...` : answer}</p>
            )}
          </div>
          <div className={classes.deleteButtonWrapper}>
            <button className={classes.deleteButton} onClick={handleDelete} type="button">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(CardItem);
