import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import styles from './styles/UserFlashcardTrayStyles';
import useToggle from './hooks/useToggle';
import Flashcard from './Flashcard';

function UserFlashcardTray(props) {
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [cardQuantity, setCardQuantity] = React.useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [starState, setStarState] = useState({
    starOne: false,
    starTwo: false,
    starThree: false,
    masteryRating: 0,
  });

  const { classes, currentCardSetName, isLoggedIn, userCardSetDatabase, roundState } = props;
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
  const drawCard = () => {
    setCardCount(cardCount + 1);
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
    console.log(e.currentTarget.id);
    if (e.currentTarget.id === 'starOne') {
      setStarState({ starOne: true, starTwo: false, starThree: false, masteryRating: 1 });
    }
    if (e.currentTarget.id === 'starTwo') {
      setStarState({ starOne: true, starTwo: true, starThree: false, masteryRating: 2 });
    }
    if (e.currentTarget.id === 'starThree') {
      setStarState({ starOne: true, starTwo: true, starThree: true, masteryRating: 3 });
    }
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
          />
        )}
      <div className={classes.buttonContainer}>
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
              onClick={drawCard}
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
