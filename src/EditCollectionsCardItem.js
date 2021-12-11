import React from 'react';
import { withStyles } from '@material-ui/core';
import { doc, updateDoc } from 'firebase/firestore/lite';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
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
            {isMobile ? (
              question.length > 75 ? (
                <p className={classes.CardItemQuestion}>{`${question.slice(0, 75).trim()}...`}</p>
              ) : (
                <p className={classes.CardItemQuestion}>{question}</p>
              )
            ) : (
              question.length > 80 ? (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={<p style={{ fontSize: '.9rem', margin: '2px 0px 0px 0px', padding: '0px 0px 0px 0px' }}>{question}</p>}
                >
                  <p className={classes.CardItemQuestion}>{`${question.slice(0, 80).trim()}...`}</p>
                </Tooltip>
              ) : (
                <p className={classes.CardItemQuestion}>{question}</p>
              )
            )}
          </div>
          <div className={classes.CardItemAnswerWrapper}>
            <span className={classes.label}>Answer:</span>
            { isMobile ? (
              answer.length > 50 ? (
                <p className={classes.CardItemAnswer}>{`${answer.slice(0, 50)}...`}</p>
              ) : (
                <p className={classes.CardItemAnswer}>{answer}</p>
              )
            )
              : (
                answer.length > 30 ? (
                  <Tooltip
                    TransitionComponent={Zoom}
                    title={<p style={{ fontSize: '.9rem', margin: '2px 0px 0px 0px', padding: '0px 0px 0px 0px' }}>{answer}</p>}
                  >
                    <p className={classes.CardItemAnswer}>{`${answer.slice(0, 30).trim()}...`}</p>
                  </Tooltip>
                ) : (
                  <p className={classes.CardItemAnswer}>{answer}</p>
                )
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
