import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Redirect } from 'react-router-dom';
import styles from './styles/FlashcardTrayStyles';
import useToggle from './hooks/useToggle';
import Flashcard from './Flashcard';

function UserFlashcardTray(props) {
  const [flashcards, setFlashcards] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [deckLength, setDeckLength] = useState(1);
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, toggleShowAnswer] = useToggle(false);
  const [started, setStarted] = useState(false);
  const [cardQuantity, setCardQuantity] = React.useState('');

  const { classes, currentCardSetName, isLoggedIn, userCardSetDatabase } = props;

  // Sets flashcards to the selectedSetIndex
  useEffect(() => {
    getFlashcards();
    setDeckLength(flashcards.length);
    setCardQuantity('');
    setStarted(false);
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

  // Handles Card Quantity Input Change
  const handleChange = (event) => {
    setCardQuantity(event.target.value);
  };

  const getCardQuantity = (num) => {
    let cardQuantityArray = [];
    if (num < 30) {
      for (let i = 0; i < num; i++) {
        if ((i + 1) % 5 === 0) {
          cardQuantityArray.push(i + 1);
        }
      }
    } else {
      for (let i = 0; i < num; i++) {
        if ((i + 1) % 10 === 0) {
          cardQuantityArray.push(i + 1);
        }
      }
    }
    return cardQuantityArray;
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={classes.root}>
      {started && <h2>{currentCardSetName}</h2>}
      {started && <h4>Card {cardCount + 1} of {cardQuantity}</h4>}
      {started
        ? (
          <Flashcard
            question={shuffledDeck[cardCount].question}
            answer={shuffledDeck[cardCount].answer}
            showAnswer={showAnswer}
          />
        )
        : (
          <div className={classes.preStart}>
            <h2>{currentCardSetName}</h2>
            <div className={classes.cardQuantitySelect}>
              <h4>How many cards would you like to use?</h4>
              <FormControl variant="standard" sx={{ m: 2, minWidth: 75 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={cardQuantity}
                  onChange={handleChange}
                  displayEmpty
                >
                  {getCardQuantity(deckLength).map(num => <MenuItem key={`cardQuantity${num}`} value={num}>{num}</MenuItem>)}
                  <MenuItem value={deckLength}>All Cards</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Button
              className={classes.startButton}
              variant="contained"
              type="button"
              onClick={start}
              disabled={!cardQuantity}
            >
              Start
            </Button>
          </div>
        )}
      {started
      && (
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
      )}
    </div>
  );
}

export default withStyles(styles)(UserFlashcardTray);
