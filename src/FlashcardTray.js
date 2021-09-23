import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Flashcard from './Flashcard';
import useToggle from './hooks/useToggle';
import styles from './styles/FlashcardTrayStyles';

function FlashcardTray(props) {
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckLength, setDeckLength] = useState(1);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [started, setStarted] = useState(false);

  // Sets flashcards to the selectedSetIndex
  useEffect(() => {
    getFlashcards(props.selectedSetIndex);
    setDeckLength(flashcards.length);
    setStarted(false);
  }, [props.cardSetDatabase, flashcards.length, props.selectedSetIndex]);

  // Set the specified flashcard deck, if it exists
  const getFlashcards = (index) => {
    let flashcardsToSet = [];
    if (props.cardSetDatabase[index]) {
      flashcardsToSet = props.cardSetDatabase[index].cards;
    }
    return (setFlashcards(flashcardsToSet));
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

  // Initializes the selected deck
  const start = () => {
    setCardCount(0);
    const shuffled = (shuffleDeck(flashcards));
    setShuffledDeck(shuffled);
    setStarted(true);
  };

  // Reshuffles the deck once you've drawn all cards
  const startOver = () => {
    setCardCount(0);
    setDeckLength(flashcards.length);
    const shuffled = (shuffleDeck(flashcards));
    setShuffledDeck(shuffled);
  };

  const { classes, currentCardSetName } = props;

  return (
    <div className={classes.root}>
      {started && <h2>{currentCardSetName}</h2>}
      {started && <h4>Card {cardCount + 1} of {deckLength}</h4>}
      <div className={classes.FlashcardContainer}>
        {started
          ? (
            <Flashcard
              question={shuffledDeck[cardCount].question}
              answer={shuffledDeck[cardCount].answer}
              showAnswer={showAnswer}
            />
          )
          : (
            <Button
              className={classes.startButton}
              variant="contained"
              type="button"
              onClick={start}
            >
              Start
            </Button>
          )}
      </div>
      {started
      && (
      <div className={classes.buttonContainer}>
        <Button
          className={classes.showButton}
          variant="contained"
          onClick={toggleShowAnswer}
        >{showAnswer ? 'Hide Answer' : 'Show Answer'}

        </Button>
        {(cardCount + 1) !== deckLength
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
      )}
    </div>
  );
}

export default withStyles(styles)(FlashcardTray);
