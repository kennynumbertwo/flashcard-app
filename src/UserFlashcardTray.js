import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { doc, updateDoc } from 'firebase/firestore/lite';
import styles from './styles/UserFlashcardTrayStyles';
import useToggle from './hooks/useToggle';
import Flashcard from './Flashcard';
import db from './firebase.config';

function UserFlashcardTray(props) {
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [cardQuantity, setCardQuantity] = React.useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [currentMasteryRating, setCurrentMasteryRating] = useState(0);
  const [starState, setstarState] = useState({
    starOne: true,
    starTwo: false,
    starThree: false,
  });

  const { classes, currentCardSetName, isLoggedIn, userCardSetDatabase, roundState, uid } = props;
  const { starOne, starTwo, starThree } = starState;

  // Sets flashcards to the currentCardSetName
  useEffect(() => {
    getFlashcards();
    if (flashcards) {
      const shuffled = (shuffleDeck(flashcards));
      setShuffledDeck(shuffled);
      setCardQuantity(roundState.cardQuantity);
    }
  }, [userCardSetDatabase, flashcards.length, currentCardSetName]);

  useEffect(() => {
    if (shuffledDeck.length > 0) {
      setCurrentMasteryRating(shuffledDeck[cardCount].masteryRating);
    }
  }, [userCardSetDatabase, shuffledDeck, cardCount]);

  // Set the masteryRating to the current card's masteryRating
  useEffect(() => {
    if (currentMasteryRating === 2) {
      setstarState({ starOne: true, starTwo: true, starThree: true });
    }
    if (currentMasteryRating === 1) {
      setstarState({ starOne: true, starTwo: true, starThree: false });
    }
    if (currentMasteryRating === 0) {
      setstarState({ starOne: true, starTwo: false, starThree: false });
    }
  }, [currentMasteryRating]);

  // Set the specified flashcard deck, if it exists
  const getFlashcards = () => {
    let flashcardsToSet = [];
    if (userCardSetDatabase) {
      userCardSetDatabase.forEach(cardSet => {
        if (cardSet.id === currentCardSetName.toLowerCase().replace(/\s+/g, '-')) {
          flashcardsToSet = cardSet.cards;
        }
        return (setFlashcards(flashcardsToSet));
      });
    }
  };

  // Function to shuffle the deck
  const shuffleDeck = (array) => {
    let m = array.length;
    let t;
    let i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  // Function to see the next card in shuffledDeck
  const nextCard = () => {
    setCardCount(cardCount + 1);
    if (showAnswer) {
      toggleShowAnswer();
    }
  };

  // Function to see the next card in shuffledDeck
  const previousCard = () => {
    setCardCount(cardCount - 1);
    if (showAnswer) {
      toggleShowAnswer();
    }
  };

  // Reshuffles the deck once you've drawn all cards
  const startOver = () => {
    setCardCount(0);
    const shuffled = (shuffleDeck(flashcards));
    setShuffledDeck(shuffled);
  };

  const handleStarClick = (e) => {
    if (e.currentTarget.id === 'starOne') {
      setstarState({ starOne: true, starTwo: false, starThree: false });
      setCurrentMasteryRating(0);
      shuffledDeck[cardCount].masteryRating = 0;
    }
    if (e.currentTarget.id === 'starTwo') {
      setstarState({ starOne: true, starTwo: true, starThree: false });
      setCurrentMasteryRating(1);
      shuffledDeck[cardCount].masteryRating = 1;
    }
    if (e.currentTarget.id === 'starThree') {
      setstarState({ starOne: true, starTwo: true, starThree: true });
      setCurrentMasteryRating(2);
      shuffledDeck[cardCount].masteryRating = 2;
    }
    // updateMasteryRating();
  };

  const updateMasteryRating = async () => {
    const userRef = doc(db, 'users', uid);
    const updateString = `${currentCardSetName.toLowerCase().replace(/\s+/g, '-')}.masteryRating`;
    console.log(updateString);
    console.log(currentMasteryRating);
    await updateDoc(
      userRef, { [updateString]: currentMasteryRating }, { merge: true },
    );
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.root}>
      <h2>{currentCardSetName}</h2>
      <h4>Card {cardCount + 1} of {cardQuantity}</h4>
      {shuffledDeck.length > 0
        && (
          <Flashcard
            question={shuffledDeck[cardCount].question}
            answer={shuffledDeck[cardCount].answer}
            cardNumber={shuffledDeck[cardCount].cardNumber}
            showAnswer={showAnswer}
            masteryRating={shuffledDeck[cardCount].masteryRating}
            setstarState={setstarState}
          />
        )}
      <div className={classes.buttonContainer}>
        <Button
          className={classes.previousButton}
          variant="contained"
          type="button"
          onClick={previousCard}
        >
          Previous Question
        </Button>
        <Button
          className={classes.showButton}
          variant="contained"
          onClick={toggleShowAnswer}
        >{showAnswer ? 'Hide Answer' : 'Show Answer'}

        </Button>
        {(cardCount + 1) !== cardQuantity
          ? (
            <Button
              className={classes.nextButton}
              variant="contained"
              type="button"
              onClick={nextCard}
            >
              Next Question
            </Button>
          )
          : (
            <Button
              className={classes.startOverButton}
              variant="contained"
              color="secondary"
              type="button"
              onClick={startOver}
            >
              Start Over
            </Button>
          )}
      </div>
      <div className={classes.masteryWrapper}>
        <h4>Mastery Rating:</h4>
        <div className={classes.starsWrapper}>
          <div className={classes.starOneWrapper}>
            {starOne
              ? <StarIcon onClick={handleStarClick} id="starOne" />
              : <StarBorderIcon onClick={handleStarClick} id="starOne" />}
          </div>
          <div className={classes.starTwoWrapper}>
            {starTwo
              ? <StarIcon onClick={handleStarClick} id="starTwo" />
              : <StarBorderIcon onClick={handleStarClick} id="starTwo" />}
          </div>
          <div className={classes.starThreeWrapper}>
            {starThree
              ? <StarIcon onClick={handleStarClick} id="starThree" />
              : <StarBorderIcon onClick={handleStarClick} id="starThree" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(UserFlashcardTray);
